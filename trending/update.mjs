// Ranks the dishes in trending/dishes.json by English Wikipedia page views over the last 7 days
// and writes trending.json for the site's Trending tab. Run daily by .github/workflows/trending.yml.
import { readFile, writeFile } from "node:fs/promises";

const UA = "TestKitchenTrending/1.0 (https://ewantait813-svg.github.io/recipie-generator/)";
const DELAY = Number(process.env.DELAY_MS || 250);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const ymd = d => d.toISOString().slice(0, 10).replace(/-/g, "");

const dishes = JSON.parse(await readFile("trending/dishes.json", "utf8"));
let previous = {};
try { for (const d of JSON.parse(await readFile("trending.json", "utf8")).dishes) previous[d.wiki] = d; } catch {}

const end = new Date(); end.setUTCHours(0, 0, 0, 0); end.setUTCDate(end.getUTCDate() - 1); // yesterday, the last full day
const start = new Date(end); start.setUTCDate(start.getUTCDate() - 13);

async function views(article) {
  const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/${encodeURIComponent(article.replace(/ /g, "_"))}/daily/${ymd(start)}/${ymd(end)}`;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (res.ok) return (await res.json()).items.map(i => i.views);
      if (res.status === 404) return null;
    } catch (e) { if (attempt === 4) console.warn("network error for", article, e.cause?.code || e.message); }
    await sleep(1000 * 2 ** attempt);
  }
  return undefined;
}

const out = [];
let fresh = 0;
for (const d of dishes) {
  const v = await views(d.wiki);
  if (Array.isArray(v) && v.length >= 7) {
    const views7 = v.slice(-7).reduce((a, b) => a + b, 0), prev7 = v.slice(0, -7).reduce((a, b) => a + b, 0);
    out.push({ ...d, views7, prev7, change: prev7 ? Math.round((views7 - prev7) / prev7 * 100) : null });
    fresh++;
  } else if (previous[d.wiki]) out.push({ ...d, ...pick(previous[d.wiki]) });
  else console.warn("no data for", d.wiki);
  await sleep(DELAY);
}
function pick(p) { return { views7: p.views7, prev7: p.prev7, change: p.change }; }

if (fresh < dishes.length / 2) { console.error(`Only ${fresh}/${dishes.length} dishes updated; keeping the old file.`); process.exit(1); }
out.sort((a, b) => b.views7 - a.views7);
const data = { updated: new Date().toISOString(), from: start.toISOString().slice(0, 10), to: end.toISOString().slice(0, 10), source: "English Wikipedia page views", dishes: out };
await writeFile("trending.json", JSON.stringify(data, null, 1) + "\n");
console.log(`Ranked ${out.length} dishes (${fresh} fresh). Top 5:`, out.slice(0, 5).map(d => `${d.dish} ${d.views7}`).join(", "));
