# Portfolio content — V2 **GENERALIST** (Track A) — editable source of the *words*

> **This is the Track-A generalist re-frame** of the portfolio copy. The live site is **Track-B /
> North-Star** framed ("I install the AI operating system a business runs on") — too narrow for AI jobs,
> eval platforms and Upwork. This version keeps the **same builds** but opens the hero wide:
> *"I build AI software, automations and tools — end to end."* Same case studies, framed to show **range**.
>
> **Where this copy lives in the build** (for when we render it — NOT today):
> - Hero eyebrow / headline / subhead → `app/page.tsx`
> - The three strength cards → `strengths[]` in `app/page.tsx`
> - The three experience rows → `experience[]` in `app/page.tsx`
> - Project taglines / summaries / "under the hood" → `lib/projects.ts`
>
> **Plan:** generalist portfolio gets its own **subdomain** (e.g. `build.ryanalexanderblack.com`), main
> stays North-Star. We build it **tomorrow** — this is the content pass only. Edit the words here freely.

---

## ⚠️ Decisions to confirm before we build (read first)

1. ~~**Title / eyebrow.**~~ ✅ **LOCKED — "AI Software & Automation Builder"** (matches the approved v2 CV).
2. **Subdomain + split.** Plan is `build.` (generalist) vs main (North-Star), same builds, different
   hero/positioning. Confirm the subdomain name. (Open question parked in `BACKLOG.md` → "Two front doors".)
3. **How much diverges.** Default: only the **hero, strength cards, and the work group labels** change.
   The project summaries / "under the hood" are already plain and outcome-led, so they mostly carry over
   as-is. Confirm you're happy keeping the case-study detail shared between both sites.

---

## Hero

**Eyebrow:** AI Software & Automation Builder

**Headline:** I build AI software, automations and tools — **end to end.**
*(accent on "end to end")*

**Subhead:**
I'm Ryan. I take ideas and turn them into working AI products — full-stack apps, automation pipelines,
and custom model integrations — with the production guardrails that keep AI reliable. After ~7 years
running my own businesses, I build for real outcomes, not just features: I understand the whole operation
a tool has to fit into, the context most builders lack. Proven across a live SaaS, a decision-support
engine, a custom AI media toolset, and research/reporting automations — all built solo.

**Buttons:** `See the work` · `Get in touch` (mailto) · `Download CV`

---

## Strength cards (the three under the hero)

**1 — Range, end to end**
Full-stack apps, automation pipelines, AI integrations, custom tooling — I build whatever the job needs
and take it from idea to live, not just the fun bits in the middle.

**2 — Business-minded builder**
~7 years running my own businesses — I read a whole operation fast and build for outcomes, not just
features that look good in a demo. The context most builders lack.

**3 — AI-native & fast**
I take ideas → live with AI-assisted tooling, with the production guardrails (validation, code-not-LLM
for anything numeric, tests) that keep AI reliable once real people use it.

---

## Experience rows (the three below the cards)

**Builder & founder** — ~7 years running my own businesses; now building AI software full-time. Flagship
is OCLA — a SaaS that unifies a whole coaching business into one system, built solo, live with paying users.

**Operations & delivery** — Ran production and installation for a signage company — ~$250k/month, 30+
concurrent projects, a team of 5–6. I understand real-world constraints.

**Full range of builds** — Full-stack SaaS, a rules-based data/decision engine, a custom AI media toolset
(MCP server + automated video editor), and research/reporting automation pipelines. (See the work below.)

**Closing line:** The full story is in my CV → *Download CV*

---

## Selected work

**Section heading:** Builds & case studies
**Sub-note (optional):** A spread on purpose — a product, an engine, a toolset, and pipelines. The point:
I build whatever the job needs.

### Work group labels (generalist framing)
- **Full-stack & products** → OCLA (spotlight)
- **Data, engines & tooling** → Investment Strategy Engine · TFS Creative Suite
- **Automation pipelines** → Newsletter Automation · Business Brief Generator
- **Coming soon** → 7-day challenge days 3–7 · Marathon Training Plan

---

## Project copy
*(Mostly carries over from the live site — it's already plain and outcome-led. Only taglines tweaked to
lead with the build type / range. Edit freely.)*

### OCLA — Full-stack SaaS product
**Tagline:** A complete app that unifies a whole online coaching business — zero to launched.
**Summary:** Online Coach Launch Academy — the system that unifies an entire coaching business into one
place. A four-module guided curriculum, then the tools to operate the business: content and ad planners,
an AI assistant for live client DMs, a daily-metrics tracker, a simple client tracker (CRM), and a
website-copy builder — with an AI helper on every page. Built solo, live with paying users.
**Under the hood:**
- AI on every feature (Claude), hardened to stay accurate in production — it won't drift or anchor to a user's old answers when it regenerates
- Designed around a third-party's limits — a trial→paid lifecycle built on the handful of events the community platform actually exposes
- Row-level security — every user only ever sees their own data

### Investment Strategy Engine — Data & decision-support
**Tagline:** A rules-based engine that scores the market daily and flags when the strategy says move.
**Summary:** A personal decision-support system for a disciplined, rules-based investment strategy. It
pulls live market and macro data, scores conditions against a fixed rulebook, tracks allocation gates and
triggers, and shows whether the strategy is working over time — on a dashboard with daily, weekly and
monthly reports, replacing a manual ChatGPT-and-Excel routine. It recommends; the human decides — it never
auto-trades.
**Under the hood:**
- Every number the decision depends on is computed in plain Python, never by an AI — the old LLM workflow made ~6 moving-average errors in a single month
- The rulebook lives as versioned config (data, not code), so every strategy change is auditable
- AI is used only for the genuinely linguistic parts — news sentiment, report narrative, and a chat that explains your own data

### TFS Creative Suite — AI tooling & integration
**Tagline:** One place to generate images, video, voice and music — saved to the cloud.
**Summary:** A single toolset for generating images, video, voice and music from top AI models, with every
result saved to the cloud automatically. I built the connector that wires those models into the tools I use
day to day — plus an automated video editor that turned clips into finished Reels for live ad campaigns.
**Under the hood:**
- A custom connector (MCP server) links multiple AI media models into one toolset
- Generated assets save to permanent cloud storage automatically
- An automated editor (Remotion) assembled clips into finished, ad-ready Reels

### Newsletter Automation — Pipeline
**Tagline:** "Signal over Noise" — give it a topic, get a finished newsletter.
**Summary:** Give it a topic and it produces a finished newsletter — researched with real sources, written
in a set brand voice, with accurate charts and a header image, then checked and sent. The card links to a
real issue it produced.
**Under the hood:**
- Charts are drawn in code, not AI-generated — so the numbers are always exact
- Every issue is checked by rendering it to an image before it sends
- Each part (research, images, sending) is swappable without rebuilding the rest

### Business Brief Generator — Pipeline
**Tagline:** Point it at a company's website → a branded, ready-to-read business brief.
**Summary:** Give it a company's web address and it produces a complete brief on that business — what they
do, how they're positioned, who they serve, their team, and their full visual identity (colours, fonts,
logo) — then renders it as a clean, branded PDF. Built from public pages only, in about an hour. The
preview is a real, anonymised run.
**Under the hood:**
- Reads the site with the Firecrawl MCP server — maps the pages, pulls the content, and auto-extracts the brand (colours, fonts, logo)
- Two outputs from one research pass — a candid internal recon brief, or a warm client-facing version in your own brand
- Renders to a styled PDF in code (headless browser), so the output is consistent every time
