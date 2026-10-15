import { chromium } from 'file:///C:/Users/ethan/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('.archify/workflow-maxis-ecosystem-20261015-221059');
const browser = await chromium.launch({channel:'chrome', headless:true});
const page = await browser.newPage({viewport:{width:1440,height:1000}});
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await page.goto(pathToFileURL(path.resolve('MAXIS-ecosystem-and-prototype.html')).href);
await page.waitForFunction(() => [...document.querySelectorAll('iframe')].every(f => f.contentDocument?.querySelector('svg')));
await page.waitForTimeout(1200);
const measurements = [];
for (const width of [1440,1920,768]) {
  await page.setViewportSize({width,height:1000});
  await page.waitForTimeout(450);
  measurements.push(await page.evaluate(() => ({width:innerWidth,pageWidth:document.documentElement.scrollWidth,frames:[...document.querySelectorAll('iframe')].map(f=>({title:f.title,height:f.clientHeight,contentHeight:f.contentDocument.documentElement.scrollHeight,contentWidth:f.contentDocument.documentElement.scrollWidth,viewportWidth:f.contentWindow.innerWidth,diagrams:f.contentDocument.querySelectorAll('svg[role="img"]').length}))})));
}
await page.setViewportSize({width:1440,height:1100});
await page.waitForTimeout(450);
await page.screenshot({path:path.join(dir,'combined-overview.png')});
await page.locator('nav a[href="#prototype"]').click();
await page.waitForTimeout(500);
await page.screenshot({path:path.join(dir,'combined-prototype.png')});
const navigation = await page.evaluate(()=>({hash:location.hash,prototypeTop:document.getElementById('prototype').getBoundingClientRect().top}));
await browser.close();
const ok = errors.length===0 && measurements.every(m=>m.pageWidth<=m.width && m.frames.every(f=>f.diagrams===1 && f.contentHeight<=f.height+2 && f.contentWidth<=f.viewportWidth+2));
const result={ok,errors,measurements,navigation};
fs.writeFileSync(path.join(dir,'combined-browser-check.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify(result));
if(!ok) process.exitCode=1;
