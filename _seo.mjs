import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage();
const errs=[]; p.on('pageerror',e=>errs.push(e.message));
for (const [path,label] of [['/','home'],['/become-a-provider','provider'],['/service/painting','service'],['/privacy-policy','privacy']]) {
  await p.goto('http://localhost:4244'+path, { waitUntil:'networkidle' }).catch(()=>{});
  await p.waitForTimeout(1000);
  const info = await p.evaluate(() => ({
    title: document.title.slice(0,42),
    descCount: document.querySelectorAll('meta[name=description]').length,
    desc: document.querySelector('meta[name=description]')?.content?.slice(0,45),
    canonCount: document.querySelectorAll('link[rel=canonical]').length,
    canon: document.querySelector('link[rel=canonical]')?.href,
  }));
  console.log(label, JSON.stringify(info));
}
console.log('errors:', errs.length?errs.join('|'):'none');
await b.close();
