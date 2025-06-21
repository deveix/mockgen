const fs = require("fs");
const path = require("path");

// Pour Node 18+ : fetch global
const fetch = global.fetch || require("node-fetch");

// Paramètres
const DEVICES_FILE = "./devices.json";
const OUTPUT_DIR = "./output";
const BASE_URL = "https://mockuphone.com/images/mockup_templates";

async function downloadImage(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buffer));
  console.log(`✅ Saved ${dest}`);
}

async function main() {
  const devicesData = JSON.parse(fs.readFileSync(DEVICES_FILE, "utf-8"));
  const devices = devicesData.devices.filter(
    (device) =>
      device.device_type === "Android" ||
      (device.device_type === "iOS" && device.meta_title.includes("iPhone"))
  );
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

  for (const device of devices) {
    const deviceDir = path.join(OUTPUT_DIR, device.device_id);
    if (!fs.existsSync(deviceDir)) fs.mkdirSync(deviceDir);

    // Téléchargement des perspectives
    for (const orientation of device.available_perspectives) {
      const perspective = orientation.toLowerCase(); // 'Portrait' => 'portrait'
      const url = `${BASE_URL}/${device.device_id}-${perspective}.png`;
      const imgPath = path.join(deviceDir, `${perspective}.png`);
      try {
        await downloadImage(url, imgPath);
      } catch (e) {
        console.warn(`⚠️  Could not download ${url}: ${e.message}`);
      }
    }

    // Écriture du JSON de config
    const configPath = path.join(deviceDir, "config.json");
    fs.writeFileSync(configPath, JSON.stringify(device, null, 2), "utf-8");
    console.log(`📝 Wrote config for ${device.device_id}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
