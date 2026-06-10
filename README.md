# Portfolio — Ryan Alexander Black

The portfolio site for Ryan Alexander Black, AI Software & Automation Builder. A hub
of selected builds, each with its own case study (the problem, how it's built, why,
the stack, and a live example).

> **Lane 2** standalone project (own git repo, deployed). Gitignored by the AISA
> hub. Carries its own copy of the AISA brand kit so it's self-contained for deploy.

## Two-track positioning (2026-06-07)
The live site runs the **generalist (Track A)** framing — *"I build AI software,
automations and tools"* — the income-now front door (AI jobs, eval platforms, Upwork).
The words live in [`content-v2-generalist.md`](content-v2-generalist.md). The earlier
**North-Star (Track B / AIOS Architect)** copy is archived in
[`content-northstar.md`](content-northstar.md) for rebuild/swap-back when Ryan is doing
AIOS-install outreach. Builds/case studies are shared; only the positioning differs.

## Stack
- **Next.js 16** (App Router) + **TypeScript** + **React 19**
- **Tailwind CSS v3** driven by the **AISA brand preset** (`tailwind.brand.js`)
- Brand tokens / fonts / logos copied in from the kit (`app/brand-tokens.css`, `public/brand/`)
- Mostly static, **plus one server route** (`/api/operator-form` — see "Forms & email" below); deploys to Vercel

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
npm run dev      # http://localhost:3000 (3001 if 3000 is taken)
npm run build    # production build
```

## Brand kit
On-brand via the AISA kit (Signal Green · Sora / Inter / JetBrains Mono · dark
surface + one green moment). Colours come through `tailwind.brand.js` + the
semantic CSS variables in `brand-tokens.css`. **Alpha gotcha:** opacity modifiers
(`/40`, `/10`) only work on the raw hex palette (`green-brand`, `ink-900`), not on
the `var()`-based semantic tokens (`accent`, `bg`) — use hex tokens for tints.

## Forms & email (Resend) — setup status

The site sends transactional email via **[Resend](https://resend.com)**. Set up 2026-06-10 for the
operator intake form; the sending domain is reusable for any future email feature.

### What's live
- **Route:** `/operator-form` — the branded "AI Time-Back Audit" intake form (operator-role version;
  the question copy is owned by the AISA hub at `projects/money-engine/05-intake-form.md`).
- **Handler:** `app/api/operator-form/route.ts` (POST) — emails each submission via Resend, then returns
  JSON. Honeypot field (`company_website`) silently drops bots. All form fields are required client-side.
- **Who gets emailed:** **only Ryan** (the `OPERATOR_FORM_TO` inbox). The submitter receives **nothing**;
  `reply-to` is set to their address so replying in Gmail reaches them.

### Sending domain (Resend)
- **Verified domain:** `ryanalexanderblack.com` (the root domain, **not** a subdomain). Because the whole
  domain is verified, **any `local-part@ryanalexanderblack.com` works as a sender with no extra
  verification** — so it's reusable for future features (just vary the display name).
- **From address:** `hello@ryanalexanderblack.com` (generic on purpose). This is a *send-from identity*,
  not a mailbox — the domain has no inbox. To also *receive* at an address later, add **Cloudflare Email
  Routing** (free) to forward it to Gmail; Resend "Enable Receiving" is **off** (we only send).
- **DNS (at Namecheap):** DKIM `TXT resend._domainkey` · SPF `TXT send` (`v=spf1 include:amazonses.com ~all`)
  · MX `send` → `feedback-smtp.ap-northeast-1.amazonses.com` (pri 10) · DMARC `TXT _dmarc` (`v=DMARC1; p=none;`).
  Region = Tokyo (ap-northeast-1, closest to Perth). The Vercel A/CNAME records are untouched.
  - ⚠️ **Namecheap gotcha:** the MX record type only appears once **Advanced DNS → MAIL SETTINGS** is set
    to **Custom MX**.
- **Plan:** Resend **free tier** — 1 verified domain, 3,000 emails/month (100/day). Ample for forms.

### Env vars (Vercel + local `.env.local` — see `.env.example`)
| Var | Purpose | Default if unset |
|---|---|---|
| `RESEND_API_KEY` | Resend API key — **required** to send | — (route returns 500 "not configured") |
| `OPERATOR_FORM_TO` | inbox that receives submissions | `ryanalexanderblack@gmail.com` |
| `MAIL_FROM` | override the send-from identity | `Ryan Alexander Black — Operator Intake <hello@ryanalexanderblack.com>` |

> Vercel env vars apply to deploys built **after** they're saved. The Resend account is currently
> registered under `hello@thefitnessstall.com`, but with the domain verified that no longer limits
> recipients — it can send straight to the Gmail.

### Test / debug
- Submit at `ryanalexanderblack.com/operator-form` → expect the "Got it" success screen → email lands in
  `OPERATOR_FORM_TO` from `hello@ryanalexanderblack.com`.
- Failures surface as a red error on the form. Check **Vercel → Deployment → Runtime Logs** for
  `/api/operator-form` (the handler `console.error`s the exact Resend response).

---
*Built with the WAT framework · brand kit v1.0.0*
