# Appscrip Frontend Assignment - PLP

Product listing page built for the Appscrip frontend assignment. Implemented with Next.js
(pages router, `getServerSideProps` for SSR) and plain CSS Modules - no Bootstrap/Tailwind
and no UI kit.

Live data comes from [fakestoreapi.com](https://fakestoreapi.com), fetched on the server so
the page ships with the full product list already rendered in the HTML.

## What's in here

- `pages/index.js` - the PLP itself, data fetched server-side per request
- `components/` - Header, Footer, FilterSidebar, ToolBar, ProductGrid, ProductCard
- `lib/api.js` - small fetch wrapper around fakestoreapi
- Plain CSS Modules per component, one global stylesheet for resets/layout helpers

## Features

- Server-side rendering via `getServerSideProps` (view source and the product grid is
  already there, no client-side loading spinner)
- Category filter sourced from the real API categories, sort by price/rating
- Responsive layout down to mobile (filter sidebar collapses on tablet/mobile widths)
- Basic on-page SEO: unique title/description, single H1, ItemList JSON-LD schema,
  descriptive alt text on product images, `robots.txt`

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Production build

```bash
npm run build
npm start
```

## Live demo

https://appscrip-task-arunendra21.netlify.app



### Some info about this project. 

fakestoreapi.com sits behind Cloudflare, and its bot-protection rules reject requests coming
from Netlify's serverless function IPs specifically (403, confirmed this isn't a header/UA
problem - the exact same request works fine from a normal machine or from Netlify's build
servers). So `lib/api.js` still calls the live API first on every request, but if that call
gets blocked it falls back to `lib/products-fallback.json`, a snapshot pulled from the real
API. That keeps `getServerSideProps` doing genuine per-request SSR without the live demo
ever showing an empty page because of a third-party host block outside this app's control.
