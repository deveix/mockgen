import fs from "fs/promises";
import path from "path";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GOOGLE_FONTS_API_KEY;
if (!API_KEY) throw new Error("Missing GOOGLE_FONTS_API_KEY in .env");
const FONTS_DIR = path.join(process.cwd(), "public", "fonts");
const FONTS_JSON = path.join(process.cwd(), "fonts.json");

// --- Parse CLI params --max et --subset
const args = process.argv.slice(2);
let maxFonts = 100;
let subset = "latin";

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--max") {
    if (!args[i + 1] || isNaN(Number(args[i + 1]))) throw new Error("--max must be followed by a number");
    maxFonts = Number(args[i + 1]);
    i++;
  } else if (args[i].startsWith("--max=")) {
    const val = args[i].split("=")[1];
    if (!val || isNaN(Number(val))) throw new Error("--max= must be followed by a number");
    maxFonts = Number(val);
  }
  if (args[i] === "--subset") {
    if (!args[i + 1]) throw new Error("--subset must be followed by a subset name");
    subset = args[i + 1];
    i++;
  } else if (args[i].startsWith("--subset=")) {
    subset = args[i].split("=")[1];
  }
}

async function fetchFontMetadata() {
  const url = `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&capability=WOFF2&key=${API_KEY}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Google Fonts API error: ${resp.statusText}`);
  const data = await resp.json();
  return data.items;
}

async function downloadFont(url, outPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download error: ${url}`);
  const buffer = await res.arrayBuffer();
  await fs.writeFile(outPath, Buffer.from(buffer));
}

async function main() {
  const raw = await fs.readFile(FONTS_JSON, "utf-8");
  let toDownload = JSON.parse(raw);
  const allFonts = await fetchFontMetadata();

  // Filtre par subset (ex: arabic)
  const fontsWithSubset = allFonts.filter(f => f.subsets.includes(subset));
  toDownload = toDownload.filter(e => fontsWithSubset.find(f => f.family === e.family));

  if (toDownload.length > maxFonts) {
    toDownload = toDownload.slice(0, maxFonts);
    console.log(`Limiting to ${maxFonts} fonts`);
  }
  console.log(`Subset: ${subset} (${toDownload.length} fonts)`);

  for (const entry of toDownload) {
    const font = fontsWithSubset.find(f => f.family === entry.family);
    if (!font) {
      console.warn(`Font not found in Google Fonts with subset "${subset}": ${entry.family}`);
      continue;
    }
    let variants = entry.variants || font.variants;
    for (const variant of variants) {
      let url = font.files[variant];
      if (!url || !url.endsWith(".woff2")) {
        url = Object.values(font.files).find(u => u.endsWith(".woff2"));
        if (!url) {
          console.warn(`No woff2 for ${entry.family} [${variant}]`);
          continue;
        }
      }
      const outFolder = path.join(FONTS_DIR, entry.family.replace(/ /g, "_"));
      await fs.mkdir(outFolder, { recursive: true });
      const outPath = path.join(outFolder, `${variant}.woff2`);
      if (await fs.stat(outPath).catch(() => false)) {
        console.log(`Already exists: ${outPath}`);
        continue;
      }
      console.log(`Downloading: ${entry.family} [${variant}]`);
      await downloadFont(url, outPath);
    }
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
