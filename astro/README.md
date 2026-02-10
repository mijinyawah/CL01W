# CL-01W (Astro)

## Quick Start

```bash
cd astro
npm install
npm run dev
```

Site runs at `http://127.0.0.1:4321`.

## Keystatic (GitHub Storage)

Keystatic is configured to store content in GitHub. You’ll need these env vars:

```
KEYSTATIC_GITHUB_CLIENT_ID=
KEYSTATIC_GITHUB_CLIENT_SECRET=
KEYSTATIC_SECRET= # 32+ chars
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=
```

Local setup:

1. Copy `.env.example` to `.env` and fill the values.
2. Run `npm run dev`.
3. Visit `/keystatic/setup` to create/install the GitHub App if you haven’t yet.

Vercel setup:

1. Add the same env vars in Vercel → Project → Settings → Environment Variables.
2. Redeploy.

## Deployment (Vercel)

Root Directory should be `astro`.
