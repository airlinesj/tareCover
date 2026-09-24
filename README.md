# Tare Cover

Tare Cover is a Next.js App Router foundation for embedded microinsurance for informal traders and artisans in Zimbabwe.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

- `/` - Public landing page
- `/login` - Workspace sign-in page
- `/dashboard` - Trader and market workspace overview
- Any unknown route - Custom 404 page

## Production

```bash
npm run build
npm run start
```

The project is Vercel-ready. Import the repository into Vercel with the framework preset set to Next.js. No environment variables are required for the current static foundation.

Production browser source maps are disabled in `next.config.ts`, package imports for Lucide are optimized, and the default Next.js powered-by header is disabled.
