if(!self.define){let e,i={};const s=(s,t)=>(s=new URL(s+".js",t).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(t,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const c=e=>s(e,r),l={module:{uri:r},exports:o,require:c};i[r]=Promise.all(t.map((e=>l[e]||c(e)))).then((e=>(n(...e),o)))}}define(["./workbox-79ffe3e0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"ithkapp"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/ithkapp/apple-touch-icon.png",revision:"94d5475d6e0fc5ed045d28203dff6179"},{url:"/ithkapp/css/app.3110144d.css",revision:null},{url:"/ithkapp/index.html",revision:"d6c6e3ee178c97ee2bc8f94662e21c3a"},{url:"/ithkapp/js/app.77bd15df.js",revision:null},{url:"/ithkapp/js/chunk-vendors.9286022d.js",revision:null},{url:"/ithkapp/manifest.json",revision:"d286426445ef09fb73f50fd547d64795"},{url:"/ithkapp/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
