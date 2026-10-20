// Quick 10-minute health check of the LIVE site (not the big suite): pages and files load, search, a recipe,
// Cook mode, Trending, Chef Pip box, the redirect address, no JS errors. GoatCounter is blocked so checks don't count as visits.
let pw; try { pw = require('playwright'); } catch { pw = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright'); }
const { chromium } = pw;
const B = 'https://ewantait813-svg.github.io/recipie-generator/';
const res = []; const ok = (name, pass, info = '') => res.push({ name, pass: !!pass, info });
(async () => {
  const t0 = Date.now();
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.route('**/ewannnnnn.goatcounter.com/**', r => r.fulfill({ status: 200, body: '' }));
  try {
    const s = Date.now(); await p.goto(B + '?qc=' + Date.now()); ok('page loads', (await p.title()).includes('Test Kitchen'), (Date.now() - s) + 'ms');
    for (const f of ['trending.json', 'sw.js', 'manifest.webmanifest', 'sitemap.xml', 'og.png']) {
      const st = await p.evaluate(u => fetch(u, { cache: 'no-store' }).then(r => r.status).catch(() => 0), B + f);
      ok('file ' + f, st === 200, String(st || 'no response'));
    }
    await p.fill('#dish', 'chicken'); await p.click('#make'); await p.waitForSelector('.result', { timeout: 20000 });
    ok('search "chicken"', true, (await p.$$eval('.result', x => x.length)) + ' results');
    await p.click('.result >> nth=0'); await p.waitForSelector('.steps li', { timeout: 20000 });
    ok('recipe opens', (await p.$$eval('.ing', x => x.length)) > 2, (await p.textContent('.card-top h2')).trim());
    ok('Chef Pip box', !!(await p.$('.ask')));
    await p.click('#cook-open'); await p.waitForSelector('#cook[open]'); await p.click('#cook-next'); await p.click('#cook-close');
    ok('Cook mode', !(await p.$('#cook[open]')));
    await p.click('#mode-trending'); await p.waitForSelector('.trend', { timeout: 20000 });
    ok('Trending', (await p.$$eval('.trend', x => x.length)) >= 20 && !(await p.$("text=Couldn't load")), '#1 ' + (await p.textContent('.trend h3')).trim());
    ok('no sideways scroll', !(await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)));
    const q = await ctx.newPage(); await q.route('**/ewannnnnn.goatcounter.com/**', r => r.fulfill({ status: 200, body: '' }));
    await q.goto('https://ewantait813-svg.github.io/recipe-generator/'); await q.waitForURL(/recipie-generator/, { timeout: 15000 }).catch(() => {});
    ok('recipe-generator redirect', q.url().includes('/recipie-generator/'));
  } catch (e) { ok('run', false, e.message.split('\n')[0]); }
  ok('no JS errors', errs.length === 0, errs.slice(0, 2).join(' | '));
  await b.close();
  const failed = res.filter(r => !r.pass);
  console.log((failed.length ? 'FAIL ' : 'PASS ') + (res.length - failed.length) + '/' + res.length + ' in ' + Math.round((Date.now() - t0) / 1000) + 's');
  res.forEach(r => console.log((r.pass ? '  ok   ' : '  FAIL ') + r.name + (r.info ? ' — ' + r.info : '')));
  process.exit(failed.length ? 1 : 0);
})();
