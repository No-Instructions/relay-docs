const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { load } = require('cheerio');
const base = process.env.DOCS_TEST_URL || 'http://127.0.0.1:8780';
const output = process.env.DOCS_SCREENSHOTS;
assert(output, 'Set DOCS_SCREENSHOTS to the project evidence directory');
fs.mkdirSync(output, { recursive: true });
(async () => {
 const browser = await chromium.launch({headless:true});
 const results = [], errors = [];
 const pages = [['home','/'],['introduction','/introduction/'],['guides-agents','/guides/collaborate-with-an-agent/'],['comments','/comments/'],['comments-agents','/comments/use-relay-comments-with-agents/']];
 const localLinks = new Set();
 for (const width of [1440,390]) for (const theme of ['light','dark']) {
  const context = await browser.newContext({viewport:{width,height:width===1440?900:844},colorScheme:theme});
  await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
  const page = await context.newPage(); page.on('pageerror', e=>errors.push(e.message));
  for (const [name,url] of pages) {
   assert.equal((await page.goto(base+url)).status(),200);
   await page.evaluate(()=>document.fonts.ready); await page.waitForSelector('.sidebar[data-ready]');
   assert.equal(await page.locator('.product-tab[aria-current]').count(),url==='/'?0:1);
   assert.equal(await page.locator('.product-section--current').count(),url==='/'?0:1);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth), name+' horizontal overflow');
   assert.equal(await page.getByRole('combobox', { name: 'Relay Comments version', includeHidden: true }).count(),1);
   assert.equal(await page.locator('.product-section').count(),4);
   await page.screenshot({path:path.join(output,`${name}-${width}-${theme}.png`)});
   if(width===390) {
    const toggle=page.locator('.combined-nav-toggle'); await toggle.focus(); await page.keyboard.press('Enter');
    assert.equal(await toggle.getAttribute('aria-expanded'),'true');
    await page.screenshot({path:path.join(output,`${name}-${width}-${theme}-navigation.png`)});
   }
   if(url!=='/') {
    const state=await page.locator('.sidebar [aria-current="page"]').evaluate(a=>{
     const s=a.closest('.sidebar-scroll').getBoundingClientRect(), r=a.getBoundingClientRect();
     return {visible:r.top>=s.top && r.bottom<=s.bottom,highlighted:getComputedStyle(a).backgroundColor!=='rgba(0, 0, 0, 0)'};
    }); assert(state.visible, name+' active page clipped'); assert(state.highlighted);
   }
   if(width===390) {
    await page.keyboard.press('Escape'); assert.equal(await page.locator('.combined-nav-toggle').getAttribute('aria-expanded'),'false');
    assert.equal(await page.locator('.combined-nav-toggle').evaluate(el=>el===document.activeElement),true);
   }
   for(const href of await page.locator('.sidebar a[href]').evaluateAll(as=>as.map(a=>a.href))) if(new URL(href).origin===base) localLinks.add(href);
   results.push({name,width,theme,passed:true});
  }
  // Product landing positions, native disclosure, theme persistence, phone dialog.
  await page.goto(base+'/introduction/'); await page.waitForSelector('.sidebar[data-ready]');
  await page.locator('.product-tab[data-product="relay-comments"]').click(); await page.waitForSelector('.sidebar[data-ready]');
  if(width===390) await page.locator('.combined-nav-toggle').click();
  const delta=await page.locator('.product-section--current .product-section-heading').evaluate(el=>el.getBoundingClientRect().top-el.closest('.sidebar-scroll').getBoundingClientRect().top);
  assert(Math.abs(delta-24)<3,'product not aligned: '+delta);
  await page.locator('.product-tab[data-product="relay"]').click(); await page.waitForSelector('.sidebar[data-ready]');
  if(width===390) await page.locator('.combined-nav-toggle').click();
  const toggle=page.locator('.nav-subgroup-toggle').first(); await toggle.focus(); await page.keyboard.press('Space');
  assert.equal(await toggle.getAttribute('aria-expanded'),'true');
  const target=await toggle.getAttribute('aria-controls'); assert.equal(await page.locator('#'+target).getAttribute('data-closed'),null);
  await page.keyboard.press('Enter'); assert.equal(await toggle.getAttribute('aria-expanded'),'false');
  await page.locator('#theme-toggle').click(); await page.reload();
  assert.equal(await page.evaluate(()=>document.documentElement.dataset.theme||'light'),theme==='light'?'dark':'light');
  if(width===390) {
   await page.locator('#mobile-nav-trigger').click(); assert.equal(await page.locator('#mobile-nav-dialog').evaluate(d=>d.open),true);
   await page.keyboard.press('Escape'); await page.waitForFunction(()=>!document.querySelector('#mobile-nav-dialog').open && document.querySelector('#mobile-nav-trigger').getAttribute('aria-expanded') === 'false');
   assert.equal(await page.locator('#mobile-nav-trigger').getAttribute('aria-expanded'),'false');
  }
  await context.close();
 }
 // Switching editions keeps the same guide open in both directions.
 {
  const context = await browser.newContext();
  await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
  const page = await context.newPage();
  const guide = '/comments/comment-on-a-note/';
  const archivedGuide = '/comments/0.5.2/comment-on-a-note/';
  await page.goto(base + guide);
  const select = page.getByRole('combobox', { name: 'Relay Comments version' });
  for (const destination of [archivedGuide, guide]) {
   await select.selectOption(destination);
   await page.waitForURL(base + destination);
  }
  // TOC navigation still targets visible headings below the enlarged header.
  await page.goto(base+'/introduction/');
  const toc=page.locator('.toc-rail a').nth(1); const href=await toc.getAttribute('href');
  await toc.click(); await page.waitForFunction(hash=>location.hash===hash,href);
  await page.waitForFunction(hash=>{const top=document.querySelector(hash).getBoundingClientRect().top;return top>=106 && top<400},href);
  await context.close();
 }
 // Fetch every configured legacy redirect destination, while preserving its rules.
 for(const redirect of require('./vercel.json').redirects) {
  if(redirect.destination.startsWith('/')) assert.equal((await fetch(base+redirect.destination)).status,200,redirect.destination);
 }
 // Fetch every internal sidebar destination; external release notes are never clicked.
 for(const url of localLinks) assert.equal((await fetch(url)).status,200,url);
 // Every built page's active item must be in view on desktop and phone.
 const allRoutes = [...require('./products').getNavigation().groups].flatMap(g=>['/'+g.path+'/',...g.pages.flatMap(p=>['/'+p.path+'/',...(p.children||[]).map(c=>'/'+c.path+'/')])]);
 for(const width of [1440,390]) {
  const context=await browser.newContext({viewport:{width,height:width===1440?900:844}});
  await context.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.abort());
  const page=await context.newPage();
  for(const route of allRoutes) {
   await page.goto(base+route); await page.waitForSelector('.sidebar[data-ready]');
   if(width===390) await page.locator('.combined-nav-toggle').click();
   assert.equal(await page.locator('.sidebar [aria-current="page"]').count(),1,route);
   assert(await page.locator('.sidebar [aria-current="page"]').evaluate(a=>{let r=a.getBoundingClientRect(),s=a.closest('.sidebar-scroll').getBoundingClientRect();return r.top>=s.top&&r.bottom<=s.bottom}),route+' clipped');
  } await context.close();
 }
 assert.deepEqual(errors,[]);
 await browser.close();
 fs.writeFileSync(path.join(output,'browser-check-results.json'),JSON.stringify({screenshots:results.length+10,scenarios:results,sidebarHttp200:localLinks.size,allPageViewportChecks:allRoutes.length*2,pageErrors:errors},null,2));
 console.log(JSON.stringify({screenshots:results.length+10,sidebarHttp200:localLinks.size,allPageViewportChecks:allRoutes.length*2,pageErrors:errors}));
})().catch(e=>{console.error(e);process.exit(1)});
