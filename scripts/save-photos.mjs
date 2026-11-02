// Downloads every product photo that is still a web link (e.g. from Facebook)
// into public/photos/ and rewrites src/store.js to use the saved copies.
// Facebook photo links expire after a couple of weeks, so run this once
// before you deploy:   npm run save-photos

import { readFile, writeFile, mkdir } from "node:fs/promises";

const STORE = new URL("../src/store.js", import.meta.url);
const OUT = new URL("../public/photos/", import.meta.url);

const { store } = await import(STORE.href + "?t=" + Date.now());
let source = await readFile(STORE, "utf8");
await mkdir(OUT, { recursive: true });

let saved = 0;
for (const p of store.products) {
  if (!p.image || !/^https?:\/\//.test(p.image)) continue;
  const file = `${p.id}.jpg`;
  try {
    // Facebook sometimes refuses a download for a moment, so try up to 4 times.
    let body;
    for (let attempt = 1; ; attempt++) {
      try {
        const res = await fetch(p.image);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        body = Buffer.from(await res.arrayBuffer());
        break;
      } catch (e) {
        if (attempt === 4) throw e;
        await new Promise((r) => setTimeout(r, 2000 * attempt));
      }
    }
    await writeFile(new URL(file, OUT), body);
    source = source.split(JSON.stringify(p.image)).join(JSON.stringify(`photos/${file}`));
    saved++;
    console.log(`saved ${p.name} -> public/photos/${file}`);
  } catch (e) {
    console.log(`could not save ${p.name}: ${e.message}. The link may have expired; save the photo by hand.`);
  }
}

await writeFile(STORE, source);
console.log(`\nDone. ${saved} photo(s) saved and store.js updated.`);
