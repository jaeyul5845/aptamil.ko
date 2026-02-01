# Aptamil Recall Korea Archive

Static MVP built with React + Vite + TypeScript. Cloudflare Pages compatible (no backend).

## Features
- Archive with source credibility labeling
- Recall Checker against local JSON rules
- Article detail pages with credibility tier/score and sources
- Updates (changelog) page
- SEO-ready meta tags, sitemap, and robots.txt

## Project structure
- `src/data/` – JSON datasets (archive, sources, recall rules, updates)
- `src/content/articles/` – markdown bodies per archive item
- `src/pages/` – route pages

## How credibility works
Source tier → score mapping:
- OFFICIAL_GOV: 95
- OFFICIAL_MANUFACTURER: 90
- OFFICIAL_RETAILER: 80
- REPUTABLE_MEDIA: 65
- COMMUNITY_RUMOR: 25
- UNKNOWN: 10

Score → label (Korean):
- 90–100: 공식(매우 높음)
- 70–89: 준공식/신뢰 높음
- 50–69: 언론/참고(중간)
- 0–49: 카더라/미확인(낮음)

## Add a new article
1. Create a markdown file in `src/content/articles/`.
2. Add an entry in `src/data/archive.json` with:
   - `slug` (URL-safe)
   - `content_md` pointing to the markdown path (e.g., `articles/2026-01-example.md`)
3. Ensure `sources` include URLs and `last_checked` dates.

## Add a new source
1. Add a new entry in `src/data/sources.json`.
2. Reference the `source_id` from archive items or recall rules.

## Recall checker rules
Rules live in `src/data/recall_rules.json`. They are placeholders and must be replaced with verified data. The checker only returns “included” when OFFICIAL_GOV or OFFICIAL_MANUFACTURER evidence is present.

## Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Tests
```bash
npm run test
```

## Cloudflare Pages
- Build command: `npm run build`
- Output directory: `dist`

## Notes
- `public/sitemap.xml` uses placeholder domain. Replace `https://example.com` with your real domain.
- All sample data is placeholder only.
