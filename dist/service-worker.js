if(!self.define){let e,i={};const s=(s,t)=>(s=new URL(s+".js",t).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(t,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const l=e=>s(e,r),p={module:{uri:r},exports:o,require:l};i[r]=Promise.all(t.map((e=>p[e]||l(e)))).then((e=>(n(...e),o)))}}define(["./workbox-79ffe3e0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"ithkapp"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/ithkapp/apple-touch-icon.png",revision:"94d5475d6e0fc5ed045d28203dff6179"},{url:"/ithkapp/css/app.382ac8e8.css",revision:null},{url:"/ithkapp/index.html",revision:"2a214915153e75ef662e679648a29d46"},{url:"/ithkapp/js/app.20d73af9.js",revision:null},{url:"/ithkapp/js/chunk-vendors.9286022d.js",revision:null},{url:"/ithkapp/manifest.json",revision:"d286426445ef09fb73f50fd547d64795"},{url:"/ithkapp/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map