// Build script - run with: bun minify.js
// Minifies CSS and JS for deployment. Edit the .pretty.css source, not styles.css.
import { readFileSync, writeFileSync } from "fs";

// --- CSS ---
const css = readFileSync("styles.css", "utf-8");
const minifiedCss = css
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/url\([^)]*\)/gi, (m) => m.replace(/\s+/g, ""))
  .replace(/\s+/g, " ")
  .replace(/\s*\{\s*/g, "{")
  .replace(/\s*\}\s*/g, "}")
  .replace(/\s*;\s*/g, ";")
  .replace(/\s*:\s*/g, ":")
  .replace(/\s*,\s*/g, ",")
  .replace(/;\}/g, "}")
  .trim();

writeFileSync("styles.css", minifiedCss);
console.log(`CSS: ${css.length} -> ${minifiedCss.length} bytes (${(((css.length - minifiedCss.length) / css.length) * 100).toFixed(1)}% saved)`);

// --- JS ---
const js = readFileSync("main.js", "utf-8");
const minifiedJs = js
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\/\/.*$/gm, "")
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.length > 0)
  .join("\n");

writeFileSync("main.js", minifiedJs);
console.log(`JS:  ${js.length} -> ${minifiedJs.length} bytes (${(((js.length - minifiedJs.length) / js.length) * 100).toFixed(1)}% saved)`);
