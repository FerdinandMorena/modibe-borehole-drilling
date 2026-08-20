@AGENTS.md
# CLAUDE.md — Modibe Borehole Drilling

Standing contract for this project. Read this before touching any code. If PROMPT.md conflicts with this file, this file wins — PROMPT.md is the kickoff brief, this is the durable spec.

---

## 1. Project Overview

Full multi-page marketing/lead-gen site for **Modibe Borehole Drilling**, a family-run borehole drilling and water-solutions business based in Polokwane, Limpopo, South Africa. The brand concept is **"Surface to Source"** — a geological journey from ground level down to the aquifer, used as the visual and narrative spine of the site.

Client-facing goal: convert visitors into WhatsApp/quote leads. Secondary goal: read as a premium, trustworthy operation, not a budget flyer.

---

## 2. Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger for scroll-driven motion
- Lenis for smooth scroll
- Framer Motion for micro-interactions
- Self-hosted fonts: **Fraunces** (display) + **Manrope** (body) — locked in, do not substitute
- AI-generated imagery via Hugging Face MCP (see §8, imagery constraints)
- EmailJS for contact/quote form submission
- WhatsApp deep links (`wa.me/27607105939`) as the primary CTA channel — this audience calls and WhatsApps far more than it emails

---

## 3. Design System

### Colors (CSS variables — carry these exactly)

```css
--ocean-deep:   #041B2D;
--ocean-mid:    #0A3A5C;
--ocean-soft:   #14588A;
--aqua:         #3FD0E8;
--aqua-deep:    #1EA9C4;
--gold:         #C9A227;
--gold-light:   #E8C766;
--foam:         #EAF6FA;
--foam-dim:     #CFE7EE;
--ink:          #06283D;
--ink-soft:     rgba(6,40,61,0.65);
```

**Color logic — don't break this:** aqua/blue carries structure, interactivity, and wayfinding (links, primary buttons, section eyebrows, nav). Gold carries *emphasis and value* — stat numbers, the logo's "BOREHOLE DRILLING" wordline, the eyebrow underline rule, pricing highlights, the CTA banner's shimmer word. Gold is a seasoning, not a base — if more than roughly 15% of any given viewport is gold, pull back. This mirrors the real logo: a blue droplet with a gold drill bit accent, not the other way around.

### Typography

- **Fraunces** (serif, optical-size range) for all headlines, section titles, and the "Surface to Source" narrative copy. Use italic weights for the shimmer/hero treatment.
- **Manrope** for nav, body copy, buttons, labels. Do not use a harder grotesk (e.g. Inter) anywhere on this project — it was explicitly rejected earlier in favor of something less mechanical.
- Section eyebrows: Manrope Semi Bold, 12–13px, 2.5–3px letter-spacing, uppercase, with a small gold gradient underline rule (see the homepage mockup for the exact treatment).

### Shape & motif language

- Rounded pill buttons, 999px radius.
- Wave-shaped SVG dividers between sections — never a hard straight edge between a dark and light section.
- Droplet motifs (the process-step "drop" icons) for numbered sequences.
- The geological cross-section (layered bands descending to a glowing aquifer point) is the site's signature illustration — reuse or riff on it wherever "Surface to Source" needs a visual anchor, not just on the homepage.

---

## 4. Brand Voice & Tone

**Warm & reassuring** — family-run, trustworthy, community-facing. Not corporate, not purely technical.

- First-person "we" language.
- Name Polokwane and Limpopo specifically; avoid generic "we serve your area" copy.
- No jargon-forward engineering copy as a default register — precision language (depth, casing, yield) is allowed but should always serve trust, not showcase technical expertise for its own sake.
- Testimonials, once real ones exist, should carry real narrative weight — not a one-line quote wall.
- The trust/policy line **"What if you don't find water?"** → answer with the real policy ("No water quality can be guaranteed before drilling — no money, no drilling") lives in an FAQ, not as a headline banner. Frame it as transparency, not a disclaimer.

---

## 5. Motion & Animation

**Heavy motion overall, but concentrated, not everywhere.**

- The **Surface to Source narrative section** (wherever it appears — homepage and/or its own moment on other pages) is where the heaviest motion budget goes: pinned scroll, frame-sequence or scrubbed SVG reveal, cinematic pacing. This section is allowed to slow the visitor down.
- Services, Pricing, About, Contact pages: scroll-reveal only (fade/slide-up on IntersectionObserver or ScrollTrigger, no pinning, no scrubbing). Keep these pages calm and fast — heavy motion here would read as flashy rather than trustworthy, and would undercut the warm/reassuring tone.
- Hero sections on every page get a light ambient treatment (gradient drift, gentle shimmer text) but not full cinematic sequences outside the one signature moment above.
- Shared components to use: `SplitHeading` (headline reveals), `AnimatedCounter` (stat bar numbers), `MagneticButton` (primary CTAs), `TiltCard` (Projects gallery cards only). Skip `CustomCursor` — decided against it, reads too tech-forward for this brand.
- SmoothScroll (Lenis) runs site-wide as usual.

---

## 6. Reference Sites

Not to be copied — to be raided for specific, nameable qualities:

- **Fraser Yachts / Burgess Yachts** — deep ocean-blue palettes, brass/gold hardware accents, cinematic full-bleed scroll storytelling. Closest existing DNA match.
- **VistaJet** — tiered pricing presented as a premium experience rather than a comparison chart. Direct reference for the Pricing page depth-selector (see §7).
- **A Swiss watch heritage site (Patek Philippe / Jaeger-LeCoultre)** — blue+gold as a brand signature; precision/craftsmanship copy tone for describing drilling depth and casing work.
- **Fiji Water / Voss** — water-sourcing origin storytelling. Study how they narrate geology and purity without sounding like a lab report.
- **Apple product pages (iPhone / AirPods)** — the exploded/cross-section diagram scroll treatment. Reference for how the geological cross-section illustration should reveal and animate.

---

## 7. Site Map & Page Notes

- **/ (Home)** — hero (Surface to Source headline), stats bar (flagged placeholder numbers), services overview (cards, not full detail), narrative section (heaviest motion budget), process steps, testimonial preview, pricing teaser card linking to /pricing, footer.
- **/services** — full detail on all seven offerings (see §9 for the real list). One section per service, not just cards.
- **/projects** — case-study gallery. Build now with clearly flagged placeholder projects (see §9); swap in real ones as client supplies them. `TiltCard` lives here.
- **/pricing** — the 16-tier table (real data in §9). **Do not render this as a static HTML table as the primary UI.** Build an interactive depth selector: a slider or stepped control from 30m–120m that animates the Drilling / Casing / Pump / Total figures as the visitor drags it. Keep a plain accessible table underneath (visually secondary, or in a "view full table" toggle) for a11y and SEO. This is the single most important interaction on the site — it's the whole reason a visitor is on this page.
- **/about** — brand story, "Surface to Source" narrative in full, team/family framing (placeholder until real content supplied), trust line / FAQ (§4).
- **/contact** — WhatsApp deep links (primary), phone numbers, email, EmailJS-wired form, address is region-only (Polokwane, Limpopo) until a real street address is supplied — do not invent one.

---

## 8. Imagery Pipeline

- Source: Hugging Face MCP, AI-generated, for now.
- **Known constraint:** Hugging Face image URLs are ephemeral and cannot be fetched via `curl`/bash in a Claude Code sandbox. Workaround: re-upload generated images as chat attachments, or configure `next.config` `images.remotePatterns` to reference the HF CDN directly rather than downloading.
- Direction: atmospheric and people-forward (workers on-site, farmland, a homestead tap running) rather than pure machinery close-ups — this matches the warm/reassuring tone. Do not attempt to AI-generate the client's actual trucks/rig or logo.

### Logo — SUPERSEDED (client decision)

The earlier "keep the logo typographic" rule **no longer applies**. The client supplied real logo artwork and asked for it to be used directly, with the drawn wordmark removed.

- Source of truth: `public/logo-backup.png` (flat lockup, 1588×596, **no alpha — solid white background**).
- In use: `public/logo-lockup.png`, which is that file with its white margin trimmed (1352×521, ratio 2.595).
- The artwork already contains "MODIBE / BOREHOLE DRILLING". **Do not draw a typographic wordmark next to it.**
- Its "MODIBE" is a deep blue that measures ~1.2:1 against `--ocean-deep`, i.e. invisible on the dark nav, and the white background cannot be keyed out without also removing the white water-splash inside the droplet. So `<Logo>` seats it on a **white plate**. Keep that plate on any dark surface.
- `public/logo.png` is the same mark with heavy bevels on transparency; `logo-header.webp` is a pre-cropped alpha version. Both are unused — the client chose the flat backup.

### Site footage — REAL

`public/works/work-01…07.mp4` are genuine clips from Modibe sites, supplied by the client, with `work-0N.jpg` poster frames extracted from each. They drive `/projects` via `lib/works.ts`. This is real content, not placeholder.

---

## 9. Real Content — use exactly, do not invent alternatives

### Contact
- WhatsApp / primary: **060 710 5939**
- Also: **073 804 2476**, **015 001 1340**
- Email: **gafane.modibe1@gmail.com**
- Location: Polokwane, Limpopo (no street address on file — do not fabricate one)

### Services (real, from client flyer)
1. Borehole Drilling (core service)
2. Borehole Testing
3. PVC & Steel Casing
4. Electric Pumps
5. Pressure Pumps
6. Tank & Stands
7. Pipes & Fittings

### Add-on pricing notes (real)
- Pressure pump alone: R5,000
- Extra steel casing: R850/m
- Free transport: 0–65km

### Pricing table (real, 16 tiers) — Depth / Drilling / PVC Casing / Pump / Total

| Depth | Drilling | PVC Casing | Pump | Total |
|---|---|---|---|---|
| 30m | R8,100 | R3,800 | R4,800 | R16,700 |
| 35m | R10,440 | R4,400 | R5,600 | R20,440 |
| 40m | R12,180 | R4,900 | R6,400 | R23,480 |
| 50m | R13,920 | R5,600 | R8,000 | R27,520 |
| 55m | R15,660 | R6,600 | R8,800 | R31,060 |
| 60m | R17,400 | R6,900 | R9,000 | R33,300 |
| 65m | R19,140 | R7,300 | R9,500 | R35,940 |
| 70m | R20,880 | R7,300 | R10,000 | R38,180 |
| 80m | R22,620 | R9,200 | R11,300 | R43,120 |
| 85m | R24,360 | R9,800 | R12,000 | R46,160 |
| 90m | R26,100 | R10,000 | R12,400 | R48,500 |
| 95m | R27,840 | R10,900 | R13,700 | R52,440 |
| 100m | R29,580 | R12,000 | R15,000 | R56,580 |
| 105m | R31,320 | R12,800 | R15,700 | R59,820 |
| 110m | R33,060 | R13,500 | R16,500 | R63,060 |
| 120m | R34,800 | R15,000 | R17,000 | R66,800 |

### Trust / policy line (real, from flyer — soften into FAQ per §4)
> "No water quality can be guaranteed before drilling. No money, no drilling."

---

## 10. Content & Placeholder Policy

Non-negotiable, carried from prior projects: **all unverified content is explicitly flagged as a placeholder, never silently invented as if real.** This applies to:
- Stats bar numbers (500+ boreholes, 98% success rate, etc.) — flag as placeholder pending real figures.
- Projects/case studies — **superseded.** Real site footage now exists (see §8), so `/projects` is real content. What is still missing is per-site metadata: location, final depth, tested yield. None of it is displayed rather than estimated, because invented numbers beside genuine video would read as documented fact. Add those to `lib/works.ts` only once the client confirms them.
- Testimonials — flag clearly, do not write them as if from real named clients.
- Team/about content — flag until real bios/photos supplied.

Anything in §9 above is real and should be used as-is, without a placeholder flag.
