// Static site generator - run with: bun build.js
// Builds the whole site into dist/ from site/ (templates + text in .json), blog/ and assets.
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, statSync, copyFileSync } from "fs";
import { join, dirname } from "path";

// Display order used in the language selector.
const LANGS = ["en", "zh", "de", "fr", "vi", "pt", "es", "ja"];
const PAGES = ["index", "hub", "verse", "donate", "blog", "merch"];
const SITE = "https://boquila.org";

const read = (p) => readFileSync(p, "utf8");
const json = (p) => JSON.parse(read(p));

// Strict {{key}} replacement: a missing key is a build error, so pages never ship half-filled.
function render(tpl, vars) {
  return tpl.replace(/\{\{([^{}]+)\}\}/g, (_, key) => {
    if (!(key in vars)) throw new Error(`Missing key "${key}"`);
    return vars[key];
  });
}

// Text for a language falls back to English key by key.
function dict(shared, pageStrings, lang) {
  const d = { ...shared.en, ...pageStrings.en };
  if (lang !== "en") Object.assign(d, shared[lang] || {}, pageStrings[lang] || {});
  return d;
}

// Path variables for a page rendered at a given depth below the site root.
function pathVars(page, lang, depth) {
  const r = "../".repeat(depth);
  const vars = {
    lang,
    r,
    logoHref: depth >= 2 ? r : "./",
  };
  for (const p of PAGES) vars[`navHref.${p}`] = lang === "en" ? r + p : p;
  const options = LANGS.map((L) => {
    const name = page === "index" ? "" : page;
    let target;
    if (L === lang) target = page === "index" ? "./" : page;
    else if (L === "en") target = r + name;
    else target = r + `${L}/${name}`;
    const selected = L === lang ? " selected" : "";
    return `                            <option value="${target}"${selected}>${L.toUpperCase()}</option>`;
  });
  vars.langSelect = `<select id="lang-select" class="lang-select" onchange="if(this.value) location.href = this.value;">\n${options.join("\n")}\n                        </select>`;
  if (page === "index") vars.ogUrl = lang === "en" ? `${SITE}/` : `${SITE}/${lang}/`;
  if (page === "blog") vars.ogUrl = lang === "en" ? `${SITE}/blog` : `${SITE}/${lang}/blog`;
  return vars;
}

// Single source of truth for post URLs: en at /blog/<slug>/, others at /<lang>/blog/<slug>/.
// Post pages are written to dist + this path, and blog cards link to it, so they can't diverge.
function postPath(lang, slug) {
  return `/${lang === "en" ? "" : lang + "/"}blog/${slug}/`;
}

// Path variables for localized blog posts
function postPathVars(slug, lang) {
  const isEn = lang === "en";
  const up = isEn ? "../../" : "../../../"; // to the site root
  const vars = {
    lang,
    r: up,
    logoHref: "../..",
  };
  for (const p of PAGES) vars[`navHref.${p}`] = "../.." + "/" + p;
  const options = LANGS.map((L) => {
    const target = L === lang ? "./" : postPath(L, slug);
    const selected = L === lang ? " selected" : "";
    return `                            <option value="${target}"${selected}>${L.toUpperCase()}</option>`;
  });
  vars.langSelect = `<select id="lang-select" class="lang-select" onchange="if(this.value) location.href = this.value;">\n${options.join("\n")}\n                        </select>`;
  return vars;
}

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });

const shared = json("site/shared.json");
const headerTpl = read("site/header.html");
const footerTpl = read("site/footer.html");

for (const page of PAGES) {
  const tpl = read(`site/pages/${page}.html`);
  const pageStrings = json(`site/pages/${page}.json`);
  for (const lang of ["en", "es", "de", "fr", "ja", "pt", "vi", "zh"]) {
    const depth = lang === "en" ? 0 : 1;
    const vars = { ...dict(shared, pageStrings, lang), ...pathVars(page, lang, depth) };
    if (page === "blog") vars.postsSuffix = lang === "en" ? "" : "." + lang;
    vars.header = render(headerTpl, vars);
    vars.footer = render(footerTpl, vars);
    const out = render(tpl, vars);
    const file = depth === 0 ? `dist/${page}.html` : `dist/${lang}/${page}.html`;
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, out);
  }
}

// Blog: per-language card lists for the runtime fetch.
const posts = json("blog/posts.json");
mkdirSync("dist/blog", { recursive: true });
for (const lang of LANGS) {
  const cards = posts.map((p) => {
    const i = (p.i18n && p.i18n[lang]) || {};
  return {
    slug: p.slug,
    href: postPath(lang, p.slug),
    title: i.title || p.title,
      description: i.description || p.description,
      date: p.date,
      thumbnail: p.thumbnail,
    };
  });
  const name = lang === "en" ? "posts.json" : `posts.${lang}.json`;
  writeFileSync(`dist/blog/${name}`, JSON.stringify(cards, null, 2) + "\n");
}

// Blog posts: one page per entry and language, body rendered from blog/<slug>/body.html + body.json.
const postTpl = read("site/pages/post.html");
for (const post of posts) {
  const bodyTpl = read(`blog/${post.slug}/body.html`);
  const bodyStrings = json(`blog/${post.slug}/body.json`);
  for (const lang of LANGS) {
    const i = (post.i18n && post.i18n[lang]) || {};
    const vars = {
      ...dict(shared, {}, lang),
      ...postPathVars(post.slug, lang),
      "post.slug": post.slug,
      "post.title": i.title || post.title,
      "post.htmlTitle": i.htmlTitle || i.title || post.htmlTitle || post.title,
      "post.description": i.description || post.description,
      "post.keywords": post.keywords || "",
      "post.dateFormatted": new Intl.DateTimeFormat(lang, { year: "numeric", month: "long", day: "numeric" }).format(new Date(post.date + "T00:00:00")),
      "post.ogUrl": `${SITE}${postPath(lang, post.slug)}`,
      "post.body": render(bodyTpl, dict(shared, bodyStrings, lang)),
    };
    vars.header = render(headerTpl, vars);
    vars.footer = render(footerTpl, vars);
    const file = `dist${postPath(lang, post.slug)}index.html`;
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, render(postTpl, vars));
  }
}

// Minified CSS and JS (sources stay untouched).
const minifyCss = (css) => css
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
const minifyJs = (js) => js
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\/\/.*$/gm, "")
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.length > 0)
  .join("\n");

writeFileSync("dist/styles.css", minifyCss(read("styles.css")));
writeFileSync("dist/main.js", minifyJs(read("main.js")));

// Static files copied as-is (api/ is served untouched).
copyFileSync("CNAME", "dist/CNAME");
const copyDir = (src, dest, skip = (f) => false) => {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    if (skip(entry)) continue;
    const s = join(src, entry);
    const d = join(dest, entry);
    if (statSync(s).isDirectory()) copyDir(s, d, skip);
    else copyFileSync(s, d);
  }
};
copyDir("api", "dist/api");
copyDir("assets", "dist/assets");
// Copy blog assets; skip body templates and posts.json, which the generator writes itself.
copyDir("blog", "dist/blog", (f) => f.startsWith("body") || f === "posts.json");

console.log(`Built ${PAGES.length * LANGS.length} pages + ${posts.length * LANGS.length} blog post(s) into dist/`);
