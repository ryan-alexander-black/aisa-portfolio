# OCLA Sales Funnel — case-study content draft

> **This is the editable WORDS layer.** Revise freely (de-AI the voice, fix anything wrong), then I
> port it into a `/projects/ocla-funnel` page that matches the other case studies. Notes to you are in
> `> blockquotes` and **[BRACKETS]** — they won't make it into the page.
>
> **Angle (your call, locked):** this one proves *design + funnel-build*, not back-end engineering. The
> OCLA app case study already carries the "I can build a SaaS" weight — this is the "I can design a
> polished, on-brand, converting experience **and** wire the whole funnel behind it" piece. No
> performance metrics (kept deliberately design/craft-focused).

---

## Card (home grid — full-width, under the other work)

- **Title:** OCLA Sales Funnel
  > *[Alt titles if you prefer: "OCLA Launch Funnel" · "OCLA Sales Page & Funnel".]*
- **Tagline:** A hand-built sales page and the automated opt-in funnel behind it — designed end to end.
- **Status:** Live
- **Stack chips:** HTML/CSS/JS · Klaviyo · Meta Pixel · Skool · Vercel
- **Live URL:** https://onlinecoachlaunchacademy.com/  *(card CTA: "View live →")*

> **[Build facts for the header strip — NOT performance numbers, just craft/build facts. Keep, cut, or
> swap any:]**
> - Hand-built pages: **2** (sales + opt-in)
> - Frameworks: **0** (raw HTML/CSS/JS)
> - Nurture flow: **7 emails**
> - Funnel tools wired: **3** (Klaviyo · Pixel · Skool)

---

## Plain lead (what it is, for anyone)

This is the public face of OCLA — the sales page that sells the program and the automated funnel that
turns a curious visitor into a free-trial member. I designed and built all of it by hand: a long-form
sales page with a video, a clear story and a five-part breakdown of how the program works; a separate
lead-magnet opt-in page; and the email sequence that follows up automatically once someone opts in. It's
the counterpart to the OCLA app case study — that one is the software; this one is the **design and the
marketing funnel** that get people to it.

---

## The design — the part I want you to look at

The sales page is built to do one job well: take a coach who's tried and struggled to get online, and
walk them all the way to "okay, I'll try this." So the page is a designed *argument*, not a brochure:

- **A narrative that builds.** It opens on the problem ("you've already tried…"), contrasts *the way
  most coaches go online* with *the way OCLA builds it instead*, earns trust with a six-year founder
  story, then lays out the program as five named systems — the Online Foundation Blueprint, the Warm
  Audience Activation System, the Dual-Channel Growth Engine, the Sustainable Freedom Model, and the
  Always-On Accountability System — before a four-phase visual roadmap, exactly-what's-included, FAQ,
  and a "who this is (and isn't) for" qualifier.
- **A real visual system, on brand.** Custom roadmap illustrations for each phase, founder photography,
  in-product screenshots, short looping videos and a VSL — composed into one consistent look (The
  Fitness Stall brand), not a stock template.
- **Motion used with restraint.** Video where it earns attention (the VSL, the roadmap), static and
  legible everywhere else.

> **[Ryan — add/curb anything here. If there's a design decision you're proud of (type system, the
> roadmap illustration approach, how the VSL is framed), say it in a line and I'll feature it.]**

---

## The funnel — designed and wired end to end

The page is the front of a complete, automated funnel. The interesting part is that there's no
funnel-builder platform under it — I assembled it from primitives:

1. **Lead magnet → opt-in.** A separate opt-in page (`/claude-cheat-sheet`) offers a free resource. The
   form posts **directly to the Klaviyo API** (no plugin, no middleman) and fires a Meta Pixel
   `Subscribe` event the moment it succeeds.
2. **Automated nurture.** Joining the list triggers a **live 7-email Klaviyo flow** ("Added to List"),
   spaced across the **7-day free-trial window** — the first email immediate, the rest on daily delays —
   with profile-property steps at entry and exit so the sequence stays clean.
3. **The handoff.** Every "Start 7-Day Free Trial" call to action routes to the **Skool** community,
   where the trial → paid membership lives. The sales page sells; Skool converts and hosts.
4. **Measurement.** Meta Pixel on both pages (`PageView` everywhere, `Subscribe` on opt-in) so the ad
   spend that feeds the top of the funnel is actually attributable.

The point: I can take a marketing idea and stand up the **whole** path — page, capture, follow-up,
tracking, handoff — not just one piece of it.

---

## Under the hood (the technical layer)

- **Hand-built, no framework.** Plain HTML, CSS and a little JavaScript — no React, no page builder.
  Deployed on **Vercel** with `cleanUrls` (so `claude-cheat-sheet.html` serves at `/claude-cheat-sheet`).
  Fast, dependency-free, and trivially cheap to host.
- **Direct Klaviyo integration.** The opt-in form talks to the **Klaviyo Client Subscriptions API**
  straight from the browser — list subscription handled in a small script, no third-party form widget.
- **The Klaviyo flow as the engine.** A live, multi-step flow (7 emails + time-delays + profile
  updates) does the follow-up automatically — the "set it once, it runs forever" half of the funnel.
- **Skool as the commerce/community layer.** Deliberately not rebuilt — the trial, billing and member
  experience live where they're already solved.

> **[This stays high-level on purpose — it's a design/funnel piece, not a deep-engineering one like
> Super Tracker. Tell me if you want more or less technical depth.]**

---

## A couple of decisions worth talking about

> **[Optional section — these mirror the "decisions worth talking about" pattern on the other case
> studies. Keep one, both, or cut. Reword in your voice.]**

**01 — Build the funnel from primitives, not a funnel platform.**
ClickFunnels/Kajabi-style tools are quick but they own your pages, your data and a monthly fee. Building
the page as static HTML on Vercel and wiring Klaviyo + Pixel directly means OCLA owns the asset outright,
it loads instantly, and there's nothing to rent. The same ownership argument I make to clients — applied
to my own funnel.

**02 — Let each tool do the one thing it's best at.**
The sales page persuades, Klaviyo nurtures, Skool handles trial-to-paid and community. Rather than force
one platform to do all three badly, I designed the seams between them — the opt-in, the pixel events, the
trial CTA — so the handoffs are clean and measurable.

---

## Where it is now

It's **live** at [onlinecoachlaunchacademy.com](https://onlinecoachlaunchacademy.com/), running the full
funnel — opt-in capture, the automated 7-email sequence, and the Skool trial handoff. OCLA itself is now
in maintenance mode, but the funnel stands as a complete, working example of the **design + go-to-market**
side of a launch — the part that lives in front of the software.

---

## CTA

- **Primary:** View it live → https://onlinecoachlaunchacademy.com/
- **Secondary:** Request a walkthrough (opens the contact modal) — *"I'll happily walk through the design
  choices and how the funnel is wired."*

> **[Open questions for you:]**
> 1. Title — "OCLA Sales Funnel" ok, or one of the alternatives above?
> 2. Build-facts strip — keep those four, or change them?
> 3. Screenshots — I'll capture the live page (hero/VSL, the five systems, the four-phase roadmap, the
>    opt-in page). Any section you specifically want shown — or one you'd rather not?
> 4. Where on the home grid: a **full-width band under the two grouped pairs** (matches "under the
>    others") — confirm that placement.
