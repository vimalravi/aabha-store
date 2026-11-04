# Aabha — Artificial Jewellery Storefront

A single-page jewellery storefront for Aabha, Trivandrum. Built with TanStack Start, React 19, Tailwind CSS v4 and Radix UI.

## Develop

```bash
npm install
npm run dev
npm test
```

## Build

```bash
npm run build
```

## Deploy to Netlify

1. Push this folder to a GitHub/GitLab/Bitbucket repository.
2. In Netlify: **Add new site → Import an existing project** and pick the repo.
3. Netlify reads `netlify.toml` (build command `npm run build`, publish directory `dist/client`). Click **Deploy**.

Or from the CLI:

```bash
npm i -g netlify-cli
netlify login
netlify deploy --build --prod
```

## Editing content

- Products, categories, coupons and WhatsApp number: `src/data/catalog.ts`
- Colours and fonts: `src/styles.css`
