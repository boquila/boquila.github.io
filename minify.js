// Simple CSS minifier - run with: bun minify.js
import { readFileSync, writeFileSync } from "fs";

const css = readFileSync("styles.css", "utf-8");

const minified = css
  // Remove comments
  .replace(/\/\*[\s\S]*?\*\//g, "")
  // Remove newlines and extra whitespace
  .replace(/\s+/g, " ")
  // Remove space around selectors/braces
  .replace(/\s*{\s*/g, "{")
  .replace(/\s*}\s*/g, "}")
  .replace(/\s*;\s*/g, ";")
  .replace(/\s*:\s*/g, ":")
  .replace(/\s*,\s*/g, ",")
  // Remove trailing semicolons before closing braces
  .replace(/;}/g, "}")
  // Remove leading/trailing whitespace
  .trim();

writeFileSync("styles.css", minified);

const savings = css.length - minified.length;
console.log(`Original: ${css.length} bytes`);
console.log(`Minified: ${minified.length} bytes`);
console.log(`Saved: ${savings} bytes (${((savings / css.length) * 100).toFixed(1)}%)`);
