# Portfolio — Ryan Alexander Black

The portfolio site for Ryan Alexander Black, AI Solutions Architect. A hub of
selected builds, each with its own case study (the problem, how it's built, why,
the stack, and a live example).

> **Lane 2** standalone project (own git repo, deployed). Gitignored by the AISA
> hub. Carries its own copy of the AISA brand kit so it's self-contained for deploy.

## Stack
- **Next.js 16** (App Router) + **TypeScript** + **React 19**
- **Tailwind CSS v3** driven by the **AISA brand preset** (`tailwind.brand.js`)
- Brand tokens / fonts / logos copied in from the kit (`app/brand-tokens.css`, `public/brand/`)
- Static export — deploys cleanly to Vercel

## Structure
```
app/
  layout.tsx              # fonts, metadata, dark theme, header/footer
  page.tsx                # home — hero + project grid
  globals.css             # brand fonts + tokens + Tailwind layers
  brand-tokens.css        # AISA semantic colour variables (light + dark)
  projects/<slug>/page.tsx# one case-study page per build
lib/projects.ts           # source of truth for every project card
components/                # site-header, site-footer, project-card, status-badge
public/
  brand/                  # logo marks + favicon
  projects/newsletter/    # the real Issue 01 output + charts (case-study assets)
```

## Add / update a project
Edit [`lib/projects.ts`](lib/projects.ts). Each entry renders a card on the home
grid; set `caseStudy: true` and add `app/projects/<slug>/page.tsx` to give it a
full case-study page.

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
```

## Brand kit
On-brand via the AISA kit (Signal Green · Sora / Inter / JetBrains Mono · dark
surface + one green moment). Colours come through `tailwind.brand.js` + the
semantic CSS variables in `brand-tokens.css`. **Alpha gotcha:** opacity modifiers
(`/40`, `/10`) only work on the raw hex palette (`green-brand`, `ink-900`), not on
the `var()`-based semantic tokens (`accent`, `bg`) — use hex tokens for tints.

---
*Built with the WAT framework · brand kit v1.0.0*
