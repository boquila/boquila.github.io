# The code

Static site built with a minimal generator: `bun build.js` outputs everything into `dist/` (not committed, deployed by CI).

Pages live in `site/pages/` as pairs: `page.html` (structure, with `{{key}}` placeholders) + `page.json` (all text/localization, keyed by language, English required, other languages fall back to English key by key). Shared header/footer: `site/header.html`, `site/footer.html`; shared text (nav labels, footer): `site/shared.json`. Never edit `dist/`, it is generated. `api/` is served untouched, don't restructure it. Blog posts: entries in `blog/posts.json`, body html in `blog/<slug>/body.html`, rendered through `site/pages/post.html`.

To add a page: create `site/pages/name.html` + `site/pages/name.json` (at least `en`) and add the name to `PAGES` in `build.js`.

# Branding

Font: <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400..900&display=swap" rel="stylesheet">

Colors:

Green: 33DA72 
Dark Gray (almost black): 4D4D4D 
White Gray (almost white) F2F2F2

Very minimal, simple, yet cute aestethics.

# What's different from other web pages

1. A lot of websites have a bunch of bloat and fake stuff. We want to be minimal so people can explore our website and get what they want easily.

2. We have a lot of languages! and that's cool. English is king. If there's a change in english, I will instruct you to update all the other languages, only do so if I tell you.

# How to work

Don't make changes that I didn't ask, unless it's obvious it needs to change.

Reuse CSS a lot, only inline CSS if it's obvious that it will ONLY go there or if it's an asset.

I use Bun