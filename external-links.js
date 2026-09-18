'use strict';
const cheerio=require('cheerio');
const ICON='<svg class="external-link-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 17 17 7M7 7h10v10"/></svg>';
function externalWebLink(href,previewOrigin){
 if(typeof href!=='string'||! /^(?:https?:)?\/\//i.test(href.trim()))return false;
 let url;try{url=new URL(href,'https://docs.relay.md');}catch{return false;}
 if(!['http:','https:'].includes(url.protocol))return false;
 const host=url.hostname.toLowerCase();
 if(host==='relay.md'||host.endsWith('.relay.md'))return false;
 if(previewOrigin&&url.origin===new URL(previewOrigin).origin)return false;
 return true;
}
function decorateExternalLinks(html,{previewOrigin}={}){
 if(previewOrigin){const u=new URL(previewOrigin);if(!['http:','https:'].includes(u.protocol))throw new Error('Preview origin must be HTTP(S)');}
 const $=cheerio.load(html,{sourceCodeLocationInfo:true});const insertions=[];
 $('.doc-content a[href]').each((_,node)=>{
  const a=$(node);
  if(a.closest('.toc-nav,.toc-disclosure').length||!externalWebLink(a.attr('href'),previewOrigin))return;
  if(a.find('svg,img,.icon,.external-icon,[data-external-icon],[aria-hidden="true"]').length||a.attr('data-external-link')==='true'||/[↗]$/.test(a.text().trim()))return;
  const end=node.sourceCodeLocation&&node.sourceCodeLocation.endTag;
  if(end)insertions.push(end.startOffset);
 });
 for(const offset of insertions.sort((a,b)=>b-a))html=html.slice(0,offset)+ICON+html.slice(offset);
 return html;
}
module.exports={externalWebLink,decorateExternalLinks};
