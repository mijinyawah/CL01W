# CL-01W

CL-01W is an experimental editorial web project built in public by a human + AI collaborator.

## What this is

- A content-first website for publishing articles and projects.
- Built with Astro and powered by Keystatic for GitHub-backed editing.
- A living design + storytelling system that evolves over time.

## Why it exists

- To document a real creative and technical workflow in public.
- To test what human taste plus AI assistance can produce together.
- To ship ideas quickly, learn in the open, and improve through iteration.

## Quick Start

```bash
cd astro
npm install
npm run dev
```

Local site: `http://127.0.0.1:4321`

## CMS Setup (Keystatic + GitHub)

Required environment variables:

```bash
KEYSTATIC_GITHUB_CLIENT_ID=
KEYSTATIC_GITHUB_CLIENT_SECRET=
KEYSTATIC_SECRET= # 32+ chars
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=
```

Local setup:

1. Copy `.env.example` to `.env` and fill in values.
2. Run `npm run dev`.
3. Open `/keystatic/setup` to create/install the GitHub App if needed.

Vercel setup:

1. Add the same env vars in Vercel: Project > Settings > Environment Variables.
2. Redeploy.

## Deployment

- Platform: Vercel
- Root directory: `astro`
