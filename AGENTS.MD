# The code

Static site built with a minimal generator: `bun build.js` outputs everything into `dist/` (not committed, deployed by CI).

Pages live in `site/pages/` as pairs: `page.html` (structure, with `{{key}}` placeholders) + `page.json` (all text/localization, keyed by language). Shared header/footer: `site/header.html`, `site/footer.html`; shared text (nav labels, footer): `site/shared.json`. The renderer retains English key-by-key fallback as a resilience mechanism, but the build validator requires complete explicit locale data before rendering, so ordinary builds can never silently rely on fallback. Never edit `dist/`, it is generated. `api/` is served untouched, don't restructure it. Blog posts: entries in `blog/posts.json` (feed metadata; translated titles/descriptions under `i18n`), article body as a template in `blog/<slug>/body.html` (`{{key}}` placeholders) + `blog/<slug>/body.json` (text/localization), rendered through `site/pages/post.html` into `/<lang>/blog/<slug>/`.

To add a page: create `site/pages/name.html` + `site/pages/name.json`, include every supported language (`en`, `zh`, `de`, `fr`, `vi`, `pt`, `es`, `ja`), and add the name to `PAGES` in `build.js`.

# Localization is mandatory

Every new or changed piece of human-facing text must be localized into all eight supported languages in the same change. This includes headings, buttons, labels, descriptions, metadata, accessibility text, and blog copy. English is the source of truth, but a successful English fallback does not mean the work is finished.

- Never put translatable prose directly in an HTML template or JavaScript file. Use a `{{key}}` and define it in the appropriate JSON file for every language.
- When adding or changing an English key, add or update that same key under `en`, `zh`, `de`, `fr`, `vi`, `pt`, `es`, and `ja` before considering the task complete.
- Every locale object must contain exactly the same keys as `en`, with non-empty string values. Proper names, product/model identifiers, URLs, and code tokens may repeat the English value, but the key and value must still be explicitly present in every locale.
- Before finishing, compare the locale objects for the file you changed and spot-check at least one generated non-English page. Do not use fallback output as a substitute for a translation.
- Preserve valid UTF-8 characters directly; do not replace translated text with ASCII approximations or escaped mojibake.
- `bun build.js` performs localization validation before deleting or writing `dist/`. It hard-fails on missing locale objects, missing keys, keys absent from `en`, empty/non-string values, or incomplete translated blog metadata. Never bypass or weaken this validation to make a change build.
- A successful `bun build.js` is a required final check for every change involving templates or localized content.

# Branding

Font: <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400..900&display=swap" rel="stylesheet">

Colors:

Green: 33DA72 
Dark Gray (almost black): 4D4D4D 
White Gray (almost white) F2F2F2

Very minimal, simple, yet cute aestethics.

# What's different from other web pages

1. A lot of websites have a bunch of bloat and fake stuff. We want to be minimal so people can explore our website and get what they want easily.

2. We have a lot of languages! and that's cool. English is the source language, and every user-facing change must ship in all supported languages.

# How to work

Don't make changes that I didn't ask, unless it's obvious it needs to change.

Reuse CSS a lot, only inline CSS if it's obvious that it will ONLY go there or if it's an asset.

I use Bun
