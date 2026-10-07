import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join, relative, sep } from "node:path";

await mkdir("dist/server", { recursive: true });
await mkdir("dist/.openai", { recursive: true });

await cp(".openai/hosting.json", "dist/.openai/hosting.json");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
};

async function collectAssets(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const assets = {};

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "server" || entry.name === ".openai") {
        continue;
      }
      Object.assign(assets, await collectAssets(fullPath));
      continue;
    }

    const routePath = `/${relative("dist", fullPath).split(sep).join("/")}`;
    const buffer = await readFile(fullPath);
    const extension = extname(entry.name).toLowerCase();
    const isText = [".html", ".js", ".css", ".svg", ".json"].includes(extension);

    assets[routePath] = {
      contentType: contentTypes[extension] ?? "application/octet-stream",
      encoding: isText ? "text" : "base64",
      body: isText ? buffer.toString("utf8") : buffer.toString("base64"),
    };
  }

  return assets;
}

const workerSource = await readFile("scripts/sites-worker.js", "utf8");
const embeddedAssets = JSON.stringify(await collectAssets("dist"));
await writeFile(
  "dist/server/index.js",
  workerSource.replace("const EMBEDDED_ASSETS = {};", `const EMBEDDED_ASSETS = ${embeddedAssets};`),
);
