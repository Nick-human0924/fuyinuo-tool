#!/usr/bin/env node
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "dist", "client");
const basePath = "/fuyinuo-tool/";
const textExtensions = new Set([".css", ".html", ".js"]);

function collectFiles(directory) {
  return readdirSync(directory).flatMap((name) => {
    const file = path.join(directory, name);
    return statSync(file).isDirectory() ? collectFiles(file) : [file];
  });
}

let rewrittenFiles = 0;

for (const file of collectFiles(outputDir)) {
  if (!textExtensions.has(path.extname(file))) continue;

  const source = readFileSync(file, "utf8");
  const rewritten = source
    .replaceAll('"/assets/', `"${basePath}assets/`)
    .replaceAll("'/assets/", `'${basePath}assets/`)
    .replaceAll("`/assets/", `\`${basePath}assets/`)
    .replaceAll("(/assets/", `(${basePath}assets/`);

  if (rewritten !== source) {
    writeFileSync(file, rewritten);
    rewrittenFiles += 1;
  }

  if (/(["'(`])\/assets\//.test(rewritten)) {
    throw new Error(`Unrewritten root asset path in ${file}`);
  }
}

console.log(`Prepared GitHub Pages build (${rewrittenFiles} files rewritten).`);
