# CONTINUE.md — Modibe Borehole Drilling

Session handoff. Read `CLAUDE.md` first (it's the standing contract), then this.

**Status: all six pages built, building clean, lint clean, SSR verified.**

> **Later in the session** the client supplied real assets and several decisions changed. See §7 — it supersedes parts of §2 and §4.

---

## 1. Where things stand

| Check | Result |
|---|---|
| `npm run build` | ✅ 6 routes, all prerendered static |
| `npx eslint .` | ✅ 0 errors, 0 warnings |
| SSR smoke test (all 6 routes) | ✅ 200s, correct `<title>`, no dev-server errors |
| Fonts self-hosted | ✅ 12 `.woff2` in `.next/static/media`, no Google requests |
| Real content rendered | ✅ all 16 price tiers, all 3 phone numbers, email, region |
| Placeholder flags rendered | ✅ stats, testimonials, projects, team |

Dev server: `npm run dev` (took port 3001 during this session — 3000 was occupied by an unrelated process).

---

## 2. What was built

### Design tokens — `app/globals.css`
All eleven CLAUDE.md §3 colours as Tailwind v4 `@theme` tokens (`bg-ocean-deep`, `text-aqua`, `text-gold-light`, …), plus `--font-display` / `--font-sans`, `--radius-card` / `--radius-panel`, `--shadow-card` / `--shadow-lift` / `--shadow-aqua` / `--shadow-gold`, and `--ease-water`.

Component classes live in `@layer components`: `.wrap`, `.wrap-wide`, `.shimmer-aqua`, `.shimmer-gold`, `.droplet`, `.btn-ripple`, `.depth-range`.

A global `prefers-reduced-motion` block kills all animation, and every JS-driven component checks it independently.

### Content layer
- **`lib/site.ts`** — everything real: contacts, WhatsApp message builders, the 7 services with long-form copy, all 16 pricing tiers, add-ons, policy line, process steps, the 4 strata. **Nothing invented lives here.**
- **`lib/placeholders.ts`** — everything unverified: stats, 6 case studies, 3 testimonials, 3 team profiles. Each export ships with a `*_FLAG` string, and every render site pairs it with `<PlaceholderNote>`.
- **`lib/faq.ts`** — 9 FAQ entries. Every fact in them traces to §9 data.

### Shared components
| Component | Notes |
|---|---|
| `SmoothScroll` | Lenis driven by the GSAP ticker (one clock — stops pinned sections jittering). Exports `lockScroll()` for the nav drawer. |
| `SplitHeading` | GSAP `SplitText` with `autoSplit` + `mask: "lines"`; words rise from behind a per-line mask. |
| `AnimatedCounter` | Counts up on scroll; final value is in the SSR HTML. |
| `MagneticButton` | Framer Motion spring pull + water-ripple on press. 4 variants. Renders `<Link>`, `<a>` or `<button>` as appropriate. |
| `TiltCard` | 3D tilt + cursor-tracking aqua sheen. **Projects page only**, per the motion budget. |
| `Reveal` | The calm-page primitive — one fade-and-rise, once. |
| `Tally` | Number that tweens between values; React never touches the text node GSAP owns. |
| `WaveDivider` | 3 crest shapes, flippable. Used at every dark↔light boundary. |
| `WorksGallery` | Real site footage, one clip playing at a time, `preload="none"`. |
| `Icon`, `Logo`, `Eyebrow`, `SectionHead`, `PlaceholderNote`, `AmbientField`, `ServiceCard` | |

### Pages
- **`/`** — hero → stats → services → **Surface to Source** → process → testimonials → pricing teaser → CTA.
- **`/pricing`** — `DepthSelector` (the centrepiece) → add-ons → full table in `<details>` → FAQ → CTA.
- **`/services`** — 7 alternating full sections + process + CTA.
- **`/projects`** — `TiltCard` gallery, double-flagged as placeholder.
- **`/about`** — Surface to Source told in full (static illustration, reveals only) → values → team → process → FAQ → CTA.
- **`/contact`** — 3 channel cards (WhatsApp first) → EmailJS form → FAQ.

---

## 3. The two load-bearing pieces

### Surface to Source — `components/home/SurfaceToSource.tsx` + `GeoCrossSection.tsx`
The site's one cinematic moment, and where the whole motion budget went.

A `320vh`/`440vh` track holds a `position: sticky` viewport. One scrubbed GSAP timeline (`scrub: 0.8`) drives everything against normalised progress 0→1:

- camera drifts `yPercent: 0 → -7`
- bore + casing draw downward (`DrawSVGPlugin`)
- drill bit translates `y: 56 → 900`
- each of 4 strata boundaries draws in as the bit passes it (`EDGE_AT = [0.03, 0.23, 0.51, 0.81]`)
- per-band texture fades in behind each boundary
- depth ruler ticks arrive at `TICK_AT`
- aquifer bloom opens at `0.82`
- copy panels hand over at `0.24` intervals
- live depth readout written straight to the DOM (no React re-render per frame)

**Sticky, not `ScrollTrigger.pin`** — with Lenis driving scroll, native sticky stays glued where a pinned spacer drifts. Reduced motion swaps to a plain stacked list of the four strata.

### Depth selector — `components/pricing/DepthSelector.tsx`
A native `<input type="range">` over 16 real tiers. Native because it's the only way to get correct keyboard stepping, touch handling and SR announcement for free; the track and fill are painted behind it and `aria-valuetext` reads `"60 metres, R33,300 total"`.

Around it: a literal bore visual whose water column and bit follow the selection, three spring-animated proportion bars, `Tally` on every figure, and a WhatsApp CTA that pre-fills the selected package. The full 16-row table sits below in a `<details>` — collapsed for sighted visitors, always in the DOM for crawlers and assistive tech.

---

## 4. Content-policy calls I made

CLAUDE.md §10 says nothing unverified may be presented as real. Applying that strictly, I **removed several claims the mockup had introduced** because they aren't in §9:

| Removed / changed | Why |
|---|---|
| "Get a **Free** Site Assessment" → "Book a Site Assessment" | No free-survey claim in the supplied data. Only *transport* 0–65km is confirmed free. |
| "Free callout on first visit" | Same — dropped from the hero trust line. |
| "No deposit taken before we agree a date" | Invented payment-terms claim. |
| "Depths between tiers are quoted at the next tier up" | Invented pricing policy. |
| "a Modibe borehole is still giving water years after the truck has gone" | Implies a track record we can't evidence. |
| "Fully licensed & insured" | Not supplied; dropped. |

### ✅ Resolved: "No money, no drilling"

**Confirmed by the client: this is payment terms.** Drilling is arranged and paid for before the rig comes out. It is **not** a no-water-no-charge guarantee and must never be written up as one anywhere on the site.

Acted on:
- `POLICY_LINE` in `lib/site.ts` now carries the confirmed reading as a comment, alongside two new split exports — `POLICY_QUALITY` and `POLICY_PAYMENT` — so each half of the flyer line can be answered on its own.
- `lib/faq.ts` splits the old hedged answer into **two** FAQ entries:
  - *"What happens if you don't find water?"* — quotes only the water-quality half, leans on the survey and the post-drill yield test, promises honest reporting. Makes no payment claim in either direction.
  - *"How does payment work?"* — quotes the payment half plainly: paid for before the rig comes out, nothing asked for during the survey, and the figure is the one published on `/pricing`.
- FAQ is now 9 items. `/pricing` and `/about` render all of them; `/contact` still renders the first five (water, payment, inclusions, depth, travel) under its "The five we get most often" heading — still accurate.

Nothing else on the site references payment terms; grep for `deposit|refund|money back` returns only these deliberate mentions.

---

## 5. Not done / next up

1. **Imagery.** No AI imagery was generated this session. Every visual is hand-built SVG in the brand's geological language, which suits the cross-section motif — but `ServicePanel` (`components/services/ServiceSection.tsx`) and `ProjectCard`'s top block are designed as drop-in photo slots. `next.config.ts` already whitelists the HF CDN hostnames in `images.remotePatterns` per the §8 workaround.
2. **EmailJS credentials.** Form is fully wired but inert until `.env.local` is filled — see `.env.example` for the three keys and the exact template variable names. Until then the form renders an explicit "not yet connected" notice and WhatsApp carries the page. **Verify a real send once keys are in.**
3. **Browser verification.** SSR, build and lint are verified. Client-side interaction — the scrubbed narrative timeline, magnetic buttons, slider drag, tilt cards — has **not** been checked in a real browser; there was no browser tool available this session. Open `/` and `/pricing` and scroll them before showing the client.
4. **Real content swaps.** Stats → `lib/placeholders.ts`, testimonials, 6 case studies, 3 team profiles. Move each into `lib/site.ts` and delete the `<PlaceholderNote>` at its call site.
5. **`metadataBase`** in `app/layout.tsx` is a guess (`modibeboreholedrilling.co.za`). Correct it before deploy.
6. **Not committed.** All work is in the working tree, unstaged.

---

## 6. Gotchas worth knowing

- **Tailwind v4 syntax**: gradients are `bg-linear-135` / `bg-linear-to-r`, *not* `bg-gradient-*`. Arbitrary z-index needs brackets: `z-[100]`.
- **`.split-heading` starts `visibility: hidden`** in `globals.css` to kill the pre-hydration flash; the `<noscript>` block in `app/layout.tsx` unhides it for no-JS visitors. Every path through `SplitHeading`'s effect ends by calling `reveal()` — don't add an early return that skips it.
- **`AGENTS.md` is regenerated by `next dev`.** Reverting it just re-creates the change; commit it with your work.
- **GSAP 3.15 ships all former Club plugins free** — `SplitText`, `DrawSVGPlugin`, `MorphSVG`, `Flip`, `ScrollSmoother` are all in `node_modules/gsap/`. Register through `lib/gsap.ts`, never from the package directly.


---

## 7. Later changes (supersede §2 and §4 above)

### Service icons made uniform
All seven service tiles now use the same aqua gradient. The `flagship` flag that gave Borehole Drilling a gold tile is **removed entirely** from `Service`, from the data, and from both `ServiceCard` and `ServiceSection`. Gold is now used only for value emphasis (prices, stat numbers) and the nav's active underline — verified: the only `from-gold-light to-gold` gradients left in the codebase are the nav underline and an unused `MagneticButton` variant.

### Real logo replaces the typographic wordmark
Client decision, overriding CLAUDE.md §8 (that section has been rewritten to match).

- `public/logo-backup.png` → trimmed to **`public/logo-lockup.png`** (1352×521, ratio 2.595), which is what `<Logo>` imports.
- The drawn "Modibe / BOREHOLE DRILLING" wordmark is gone — verified absent from the rendered HTML.
- **Why there is a white plate:** the lockup's "MODIBE" measures RGB(3,34,119), luminance 29, against the nav's `#041B2D` at luminance 24 — about **1.2:1**, invisible. The file is RGB with a solid white background and no alpha, and keying that white out would also remove the white water-splash inside the droplet. So the mark sits on a white plate and the client's artwork is untouched. Keep the plate on any dark surface.
- Sizes: `sm 26 / md 34 / lg 44 / xl 56` px tall. Nav uses `md`↔`lg` on scroll; footer uses `xl`.
- The nav drawer no longer assumes a fixed header height — a `ResizeObserver` measures the header, so changing the logo size can't desync the mobile menu again.

### `/projects` rebuilt on real footage
`public/works/` held seven genuine site videos. They were renamed `work-01…07.mp4` (the originals had spaces and parentheses, which make fragile URLs) and a poster frame was extracted from each at 15% in — `work-0N.jpg`, ~380KB total.

- New `lib/works.ts` holds the real data; `WorksGallery` plays one clip at a time with `preload="none"`, so the ~33MB of video is only fetched on demand.
- **`PLACEHOLDER_PROJECTS` and `ProjectCard` are deleted.** Six invented case studies with fabricated depths and yields sat next to genuine footage, which would have made made-up numbers look documented. Captions now describe only what is visibly on screen; no location, depth, yield or client name is claimed.
- `WORKS_DETAIL_NOTE` states plainly that per-site details have not been supplied.
- **Still needed from the client:** location, final depth and tested yield per clip. Add them to `lib/works.ts` as optional fields and surface them on the card.

### Surface to Source — two real bugs fixed
1. **The locator was invisible until it reached the blue bands.** `preserveAspectRatio="slice"` means the container crops the 1040-tall viewBox to roughly `y` 165–875 (measured across all four container sizes in use). The bit starts at `y=56` and the surface line is at `y=86` — both outside the frame. The camera tween only travelled 73px. It now runs `CAMERA_FROM = 210` → `CAMERA_TO = -130`, chosen so the topsoil is in frame at the start and the aquifer at the end, on the shortest viewport we support. The bit also gained a gold locator ring so it stays trackable against the dark topsoil.
2. **`/about` was rendering a broken diagram.** `#geo-glow` and `.geo-tick` are hard-coded `opacity="0"` for the timeline to reveal — but nothing animates them on `/about`, so the aquifer bloom and the entire depth ruler were permanently invisible, and `slice` cropped the diagram there too. `GeoCrossSection` now takes `variant="scrubbed" | "static"`; `static` uses `meet` and paints every layer.

### Pinned section: merged into one composition

Two earlier attempts tuned the split layout — first `vh` fractions per breakpoint, then a self-balancing flex column. Both still read badly at tablet sizes, because a copy column and a diagram column competing for the same vertical space can only ever be traded off, never solved.

**The copy now lives inside the illustration.** One full-frame panel; the diagram fills it, and the copy is overlaid — bottom-anchored below `lg` with a bottom-up scrim, left-aligned and vertically centred at `lg` with a left-to-right scrim. The depth readout became a chip in the top-right of the frame, like an instrument. There is no height competition left to tune, so one composition serves every screen.

**The camera is now measured, not hardcoded.** Overlaying the copy means the bore can pass behind it, and `preserveAspectRatio="slice"` crops the 1040-tall viewBox by an amount that depends entirely on the panel's shape — the visible window ranges from ~290 viewBox units on a short laptop to the full 1040 on a tall phone, a 3.5× spread. So `cameraRange()` reads the panel's live `getBoundingClientRect()`, works out the crop, and returns a camera range that lands the bit at a chosen fraction of the frame: `BIT_TRACK.base` keeps it in the upper third (clear of the bottom copy), `BIT_TRACK.lg` lets it use the full height. Values are function-based with `invalidateOnRefresh: true`, so a resize recomputes them.

If you change the panel's padding or the copy block's size, you do not need to retune anything — but do keep `BIT_TRACK.base.end` below where the mobile copy starts, or the bit will slide behind the text.

### Nav offset
The pinned frame sits at `top-[88px]` / `lg:top-[104px]` so it clears the fixed nav. **`NAV_OFFSET` in `SurfaceToSource.tsx` must stay in step with those classes** — the ScrollTrigger `start` is computed from it, and if they drift the first stretch of scroll does nothing while the frame sits pinned.

### Strata: distinct layers, and made to look like material

Three problems, fixed together.

**1. A scrim was flattening everything.** The overlaid copy needed a ground to sit on, and the first version ran `via-ocean-deep/72` across the *whole* panel. Composited, all four bands landed within ~25 RGB of `--ocean-deep` — visually identical to the section background, which is exactly why the layers looked like they never changed while scrolling. The scrim now uses staged stops and is fully transparent well before the middle of the frame.

**2. Four shades of blue is not four layers.** They now differ by hue first: `#7A5636` earth brown → `#5E6152` olive stone → `#3A5A72` slate → `#0F4C6E` water blue, each with its own vertical gradient (`geo-band-0..3`) for light falloff. They are deliberately mid-tone — anything near `--ocean-deep` in value just reads as the background showing through. Each copy panel also carries a swatch of its band, so the text and the layer are unmistakably the same thing.

**3. Flat vector did not read as ground.** `scripts/gen-geo.py` generates the aggregate procedurally from a fixed seed and rewrites the `<defs>` and camera group of `GeoCrossSection.tsx` in place: 36 topsoil pebbles, 22 weathered blocks, 20 fractured shards with 12 fissures, 18 aquifer rocks with water streaks and 24 bubbles — 96 irregular polygons in all, plus an `feTurbulence` grain layer blended over the whole profile, a dark organic crust on the ground line, and a real open bore shaft behind the casing. The script is idempotent (verified: identical md5 across runs), so re-running it is safe. **Edit band colours in its `BAND_GRADS`, not in the component** — the component's constants block is regenerated.

### Project cards shortened
9:16 phone video plus a text block ran to ~820px per card in a three-up grid. The caption moved into the frame and the crop went to `aspect-4/5`, bringing cards to ~435px. The caption and its scrim fade out while a clip plays, so the footage is unobstructed, and `line-clamp-2` keeps long captions from reflowing the grid.

### Hero visual: SVG diagram replaced with a photoreal image

The hero went through two stages. First the abstract column of wavy bands was rebuilt as a readable SVG cut-away (homestead, tank, cased bore, named layers, pump, depth ruler, rising droplets). Then the client supplied `public/hero-visual.png` — a photoreal render of that same composition — and it replaced the SVG.

**Why the image won:** it reads as the thing itself rather than an illustration of it. Measured trade-offs, all handled or documented:

- **Weight.** 2.79MB PNG source. Served through `next/image` it comes down to **274KB at w=640** — verified against the running server, not assumed. It must never be used via a raw `<img>`.
- **Brightness.** The image measures luminance ~98 (sky band 144) against the hero's `#041B2D` at ~24. It cannot blend the way the SVG did, so the rounded panel, border and shadow are **load-bearing** — they make it read as an inset window rather than something pasted on. Do not remove them.
- **Baked labels.** The layer names and depths are pixels now: not Manrope, not restylable, and ~11px cap-height on desktop / ~9px on mobile. Changing a depth or a layer name means a new render.
- **Aspect.** Panel is `aspect-1149/1369`, the image's exact ratio, so `object-cover` crops nothing.

**Droplets kept as an overlay**, because showing water actually travelling up out of the ground is the one thing a still cannot do. Positions are *measured* off the PNG — bore centre 50.13% (found via the yellow wellhead cap and the pipe), pump top 86.6%, wellhead cap 28.7–33.7% — and the constants block records them. **Re-measure if the image is ever re-rendered.**

Two bugs were found and fixed in that overlay, both worth knowing:

1. `shadow-[0_0_10px_3px_rgba(143,230,245,0.55)]` **compiled to nothing.** Tailwind splits arbitrary shadow values on commas, so the commas inside `rgba()` stop the utility parsing — it fails silently and the glow simply never rendered. It is an inline `boxShadow` now. Watch for this with any arbitrary value containing a function call.
2. `top` anchors an element's **top edge**, so the dot sat half its height low, and `BORE_X` was 3.4px left of the pipe. Fixed by nesting: the outer span is animated and positioned, the inner one carries the `-50%/-50%` shift that centres the dot. Keeping both on one element would also have put a transform where Framer Motion could clobber it.

The SVG version and `scripts/gen-hero.py` (which wrote into markers that no longer exist) were removed. Git history has them if the image is ever abandoned; `scripts/gen-geo.py` is untouched and still drives the Surface to Source cross-section.

### Reviews: real Google data, on a horizontal marquee

`lib/reviews.ts` replaced the placeholder testimonials. Four five-star Google reviews, all rendered.

**Provenance differs per entry and the file says so.** Phuti Morifi and Lesetja Makhura are transcribed verbatim from Google. Conley Machuene and Modibe Gafane left star ratings with no written text; the quotes on those two were supplied by the client, not written by the reviewers. Note also that "Modibe Gafane" matches the business contact `gafane.modibe1@gmail.com`. Keep that distinction recorded if the file is edited again.

**The rail** (`components/sections/TestimonialPreview.tsx` + the `.marquee` primitive in `globals.css`):

- Full-bleed rather than inside `.wrap` — a marquee that stops at the page gutter reads as a broken carousel; one running off both edges reads as continuous.
- `SETS = 3` copies of the list, translating by exactly one set width. **`SETS` must stay in step with the `-33.3333%` in the `marquee-x` keyframe.** Three sets of four ~360px cards loops seamlessly up to a ~3000px viewport.
- **Hover pause is large screens only** — `@media (min-width: 1024px) and (hover: hover)`. The pointer check matters as much as the width: a touch screen has no real hover, so a tap latches `:hover` and freezes the rail until the visitor taps elsewhere.
- **Focus pause is deliberately not gated.** If anything inside a card ever becomes focusable, tabbing to it must never slide it away, at any size.
- Only the first set is exposed to assistive tech; the two copies are `aria-hidden`, so the reviews are announced once rather than three times.
- **Reduced motion needed an explicit override.** The global `prefers-reduced-motion` rule collapses every animation to `0.01ms`, which would snap the track to its end position and look broken. `.marquee-track { animation: none !important }` stops it outright and the container becomes a normal horizontal scroller with scroll-snap.
- Edge `mask-image` fades cards in and out instead of slicing them mid-word.

### Depth selector: mobile overflow

The tick rail under the slider rendered all sixteen depth labels and hid twelve of them with `opacity-0`. That hides a thing visually but leaves it occupying layout width — sixteen labels forced a ~317px minimum row, which overflows every phone (46px over at 375px, 101px at 320px).

Labels are now **absolutely positioned and only rendered for the four in `LABELLED`**, so they contribute nothing to the row's width; the minimum is just sixteen 1px ticks. Buttons got `min-w-0` so they can actually shrink.

Two related fixes fell out of it:

- **`MagneticButton` could not shrink.** "WhatsApp about the 120m package" plus `px-7` came to ~303px against 271px of usable width on a 375px phone. The button now carries `max-w-full` **on both the wrapper and the inner element** — putting it only on the inner one is a no-op, because its max-width resolves against a wrapper that is itself content-sized. Padding also drops to `px-6` below `sm`.
- The pricing CTA now reads "WhatsApp this package" below `sm`; the selected depth is already shown at ~32px directly above it, so the long form was redundant on a phone.

### Section seams

Two separate faults produced the hairline "divider rules" where sections met.

- **Five dividers had no `bg`** — every one following a hero. `WaveDivider`'s un-filled area is transparent, so the body's foam background showed through beneath a dark hero.
- **A subpixel seam at the bottom edge.** The SVG's bottom landed exactly on the section boundary, so fractional device pixel ratios left a 1px line.

Fixes: `WaveDivider` gained `position="bottom"`, which pins it absolutely inside the preceding section so the section's *own* background shows behind it — no colour matching possible or needed. `Hero` and `PageHero` now render their own bottom wave that way, and the five bg-less flow dividers are gone. For the four genuine section-to-section dividers that remain, the viewBox is now `0 0 1440 86` while the paths still close at `y=90`, so the fill overshoots and is clipped rather than landing on the edge, and `-mb-px` closes the same gap on the layout side.

**Rule for any new divider:** either use `position="bottom"` inside the section above, or pass an explicit `bg`. A flow divider without `bg` will show the page background through the wave. Verified: no `background-color:transparent` divider remains on any page.

### Note on the dev server
Running `next build` while `next dev` is live against the same `.next` directory caused a Turbopack internal panic. Not a code fault — stop the dev server before building, or the panic will look like a real bug.
