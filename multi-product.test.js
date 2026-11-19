const test = require('node:test');
const assert = require('node:assert/strict');
const { getProducts, versionForUrl, versionPageUrl, productForUrl, getNavigation } = require('./products');
const { stripHtml } = require('./generate-llms-full');
const { execFileSync } = require('node:child_process');
test('normal builds omit draft and hidden products; preview flags are independent', () => {
 const catalog=require('./docs-products.json');
 const publicProducts=getProducts(catalog,{previewSoon:false,previewDrafts:false});
 assert.deepEqual(publicProducts.map(p=>p.slug),['relay','relay-comments']);
 const fixture=catalog.map(p=>p.slug==='relay-comments'?{...p,draft:true}:p);
 assert.deepEqual(getProducts(fixture,{previewSoon:false,previewDrafts:false}).map(p=>p.slug),['relay']);
 assert.deepEqual(getProducts(fixture,{previewSoon:true,previewDrafts:false}).map(p=>p.slug),['relay','relay-cli','relay-mcp']);
 assert.deepEqual(getProducts(fixture,{previewSoon:false,previewDrafts:true}).map(p=>p.slug),['relay','relay-comments']);
});
test('Obsidian navigation preserves the live structure byte for byte as data',()=>{
 assert.deepEqual(getNavigation().groups.filter(g=>g.productId==='relay').map(({productId,...g})=>g),require('./docs-nav.json').groups);
 assert.equal(productForUrl('/'),null); assert.equal(productForUrl(false),null);
 assert.equal(productForUrl('/guides/collaborate-with-an-agent/').slug,'relay');
});
test('preview ownership uses whole path prefixes',()=>{
 const output=execFileSync(process.execPath,['-e',"console.log(require('./products').productForUrl('/comments/cli-commands/').slug);console.log(require('./products').productForUrl('/comments-extra/').slug)"],{env:{...process.env,DOCS_PREVIEW_DRAFTS:'1'}}).toString().trim();
 assert.equal(output,'relay-comments\nrelay');
});
test('version selection recognizes deep archived paths, falling back to the current version',()=>{
 const product={versions:[{label:'current',url:'/introduction/'},{label:'archived',url:'/v1/',urlPrefix:'/v1/'}]};
 assert.equal(versionForUrl(product,'/guides/example/').label,'current');
 assert.equal(versionForUrl(product,'/v1/guides/example/').label,'archived');
});
test('LLM excerpts exclude JSON-LD, navigation, dialogs and TOCs but retain article and code',()=>{
 const text=stripHtml('<nav>Product menu</nav><dialog>Company menu</dialog><main><nav>Breadcrumb</nav><script type="application/ld+json">{"@type":"BreadcrumbList"}</script><h1>Title</h1><details class="toc-disclosure">On this page</details><p>Actual article.</p><pre>&lt;script&gt;example&lt;/script&gt;</pre></main>');
 assert.equal(text,'Title Actual article. <script>example</script>');
});

test('real version template renders static text once and a real destination dropdown for multiple versions',()=>{
 const nunjucks=require('nunjucks');
 const environment=new nunjucks.Environment(new nunjucks.FileSystemLoader('src/_includes'));
 environment.addFilter('versionForUrl',versionForUrl);
 environment.addFilter('versionPageUrl',versionPageUrl);
 const product={name:'Fixture product',version:'current',versions:[{label:'current',url:'/introduction/'},{label:'archived',url:'/v1/',urlPrefix:'/v1/'}]};
 const html=environment.render('product-version.njk',{product,page:{url:'/v1/deep/'}});
 const $=require('cheerio').load(html);
 assert.equal($('select').attr('aria-label'),'Fixture product version');
 assert.equal($('option[selected]').attr('value'),'/v1/');
 assert.equal($('option').length,2);
 product.versions.pop();
 const single=environment.render('product-version.njk',{product,page:{url:'/introduction/'}});
 assert(!single.includes('<select'));assert(single.includes('current'));
});

test('product-specific OG slugs avoid troubleshooting collisions without renaming live assets',()=>{
 const result=execFileSync(process.execPath,['-e',"const {productOgSlug}=require('./products');console.log(productOgSlug('troubleshooting','/troubleshooting/'));console.log(productOgSlug('cli-commands','/comments/cli-commands/'));"],{env:{...process.env,DOCS_PREVIEW_DRAFTS:'1'}}).toString().trim();
 assert.equal(result,'troubleshooting\nrelay-comments-cli-commands');
});
