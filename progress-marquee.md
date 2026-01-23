# Social Proof Marquee — Progress / PR Plan

This file tracks the implementation of a **site-wide, auto-scrolling marquee** (no buttons) that showcases **customers** and **speaking engagements**, rendered **above the footer on all pages**.

## Status Summary

**Status**: ⏳ **PLANNED**

## PR Quality Gates (enforced on every PR)

Every PR in this plan must meet these requirements **before merge**:

- **CI must be green**: `pnpm check` must pass in GitHub Actions for the PR.
- **Branch protection** must require the CI status check (so merges are blocked when CI fails).
- **Local preflight** before pushing:
  - `pnpm check`

**Definition of done**:

- A horizontally scrolling “logo wall” that loops continuously (infinite).
- **No controls** (no next/prev buttons).
- **Accessible by default**:
  - Respects `prefers-reduced-motion` (animation disabled).
  - Duplicate items used for looping are **not** read by screen readers and are **not focusable**.
  - Links (if provided) are keyboard reachable with visible focus.
- Simple implementation: **CSS-first marquee** (no carousel library required).
- Integrated globally via `app/layout.tsx` (above `Footer`).

## Goal

Add “social proof” to every page without adding UI complexity:

- Customers you worked with
- External companies / events where you lectured

## Design Decisions

- **Approach**: CSS marquee (translateX animation), not a JS carousel.
- **Placement**: Root layout (`app/layout.tsx`) inside `<main>` after `{children}`, so it appears at the bottom of content but above the footer.
- **Data source**: Single typed list in `content/` (keeps the component dumb and easy to update).
- **Assets**: Logos stored in `public/` (SVG preferred). Fallback to text “pills” if a logo isn’t available yet.
- **Content**: Show **logos + text** together for each item.
- **Interactivity**: **Purely decorative** (not clickable; no external links).
- **Ordering**: No strict order required.

## Implementation PRs

### PR 1: Social proof data + assets

**Goal**: Create a single source of truth for the marquee items and add initial assets (logos).

**Risk**: Low (no runtime behavior change yet, can be merged early)

**Branch**: `feat/social-proof-data`

**Planned changes**:

- Add `content/social-proof.ts` exporting an array like:
  - `name` (string, required)
  - `logoSrc` (string | undefined, optional; e.g. `"/logos/acme.svg"`)
- Add initial logo assets under `public/logos/*` (prefer SVG; keep consistent height expectations).

**Verification**:

- `pnpm check`

---

### PR 2: Marquee component (CSS-first, accessible)

**Goal**: Build `BottomMarquee` component with continuous auto-scroll and reduced-motion fallback.

**Risk**: Medium (UI behavior + a11y considerations)

**Branch**: `feat/social-proof-marquee-component`

**Planned changes**:

- Add component `app/components/BottomMarquee.tsx`:
  - Render a labeled `<section>` with heading/subheading styled like existing `Section` patterns.
  - Render **two copies** of items in a single animated row:
    - First copy: normal (links focusable if `href` exists).
    - Second copy: `aria-hidden="true"` and **non-focusable**.
  - Use `next/image` when `logoSrc` exists; fallback to a text chip when missing.
  - Add `motion-reduce:*` Tailwind class to disable animation for reduced motion.
  - Optional: edge fade gradients (purely decorative, `pointer-events-none`).
- Add marquee animation CSS to `app/globals.css`:
  - `@keyframes marquee` from `translateX(0)` to `translateX(-50%)`
  - `.animate-marquee` uses linear infinite animation with a single speed constant.

**Verification**:

- Manual:
  - Scrolling loops smoothly and never “jumps” noticeably.
  - Reduced motion disables animation (macOS: Accessibility → Display → Reduce motion).
  - Keyboard tab order does not get trapped in duplicated items.
- Automated:
  - `pnpm check`

---

### PR 3: Integrate globally above footer

**Goal**: Show the marquee on all pages above the footer (site-wide).

**Risk**: Low

**Branch**: `feat/social-proof-marquee-layout`

**Planned changes**:

- Update `app/layout.tsx` to render:
  - `<main>{children}<BottomMarquee /></main>`
  - Keep `Footer` below.

**Verification**:

- Manual: visit `/`, `/about`, `/life`, `/writing` and confirm placement above footer.
- Automated:
  - `pnpm check`

---

### PR 4: Tests + a11y guardrails

**Goal**: Prevent regressions in looping/a11y behavior.

**Risk**: Medium (tests can be brittle if too implementation-specific; keep user-observable)

**Branch**: `test/social-proof-marquee`

**Planned changes**:

- Add unit tests for `BottomMarquee`:
  - Renders all primary items.
  - Duplicate set is `aria-hidden`.
  - If `href` exists, rendered as link (focusable); if not, rendered as non-link.
  - Component has accessible section label/heading.
- Add a lightweight integration test asserting marquee appears on key pages (or in root layout).

**Verification**:

- `pnpm check`

---

## Workshop Doc (required for meaningful change)

After PR 2 or PR 3 lands (first meaningful user-facing change), add a short workshop doc in:

- `../ai-driven/workshop/`

Structure: **Goal → Prereqs → Live steps → Verification → Common failures**.

## Open Questions

- None (decisions confirmed):
  - **Logos + text**
  - **Decorative (non-clickable)**
  - **No ordering requirements**

