# Carousel Social Component - Progress Tracker

## Project Overview

**Objective**: Add an accessible, endless tag/name carousel displayed above the footer on every page.  
**Context**: Provide a subtle, dynamic showcase of tags/names (like CodeRabbit) without interactive controls.  
**Success Metrics**: Carousel renders site-wide, meets a11y needs (reduced motion + pause on hover/focus), no layout regressions.  
**Timeline**: 1–2 small PRs.  
**Scope**: UI-only component, no new routes.  
**Out of Scope**: Image-based carousel, complex controls, or external data sources.

---

## PR Breakdown Summary

| PR | Title                         | Goal                               | Status  | Steps | Branch                     |
|----|-------------------------------|------------------------------------|---------|-------|----------------------------|
| 0  | Data Source                   | Create carousel data list          | Pending | 1-2   | `feat/carousel-data`       |
| 1  | Marquee Component + Styles    | Build the endless carousel         | Pending | 3-8   | `feat/carousel-marquee`    |
| 2  | Site-wide Integration + Tests | Place above footer, add coverage   | Pending | 9-12  | `feat/carousel-integrate`  |

---

## PR 0: Data Source

**Goal**: Define the tag/name data list used by the carousel.  
**Risk**: Low — content-only change.  
**Dependencies**: None.  
**Branch**: `feat/carousel-data`  
**Estimated Effort**: 30–60 minutes.

### Steps

#### STEP-001: Decide and create data source
- **Status**: Pending
- **Description**: Create a dedicated data list (new file or existing content module).
- **Files**: `content/profile.ts` (or new `content/tags.ts`)
- **Success Criteria**: List exists as a typed array and is easy to maintain.
- **Testing**: Typecheck passes.
- **Commit**: `feat(carousel): add tag list`

#### STEP-002: Export for component usage
- **Status**: Pending
- **Description**: Export the list in a stable shape for the carousel component.
- **Files**: `content/profile.ts` (or new `content/tags.ts`)
- **Success Criteria**: Named export is available and documented in code.
- **Testing**: Typecheck passes.
- **Commit**: `feat(carousel): export tag list`

### PR 0 Testing Checklist
- `pnpm typecheck`

---

## PR 1: Marquee Component + Styles

**Goal**: Implement a CSS-driven, endless marquee with a11y guardrails.  
**Risk**: Low — UI-only, no behavior changes elsewhere.  
**Dependencies**: PR 0.  
**Branch**: `feat/carousel-marquee`  
**Estimated Effort**: 2–4 hours.

### Steps

#### STEP-003: Create marquee component
- **Status**: Pending
- **Description**: Add `TagCarousel` component rendering a duplicated list for seamless looping.
- **Files**: `app/components/TagCarousel.tsx`
- **Success Criteria**: Component renders tags with list semantics (`section`, `ul`, `li`).
- **Testing**: Local render check.
- **Commit**: `feat(carousel): add marquee component`

#### STEP-004: Add CSS animation
- **Status**: Pending
- **Description**: Add keyframes + utility classes for a smooth marquee.
- **Files**: `app/globals.css`
- **Success Criteria**: Marquee animates horizontally without jitter.
- **Testing**: Visual verification.
- **Commit**: `feat(carousel): add marquee animation`

#### STEP-005: Add a11y guardrails
- **Status**: Pending
- **Description**: Respect `prefers-reduced-motion` and pause on hover/focus.
- **Files**: `app/components/TagCarousel.tsx`, `app/globals.css`
- **Success Criteria**: Motion stops in reduced-motion mode; hover/focus pauses.
- **Testing**: OS reduced-motion toggle + keyboard focus test.
- **Commit**: `feat(carousel): add a11y motion guards`

#### STEP-006: Add spacing/visual polish
- **Status**: Pending
- **Description**: Match site styling (borders, background, spacing).
- **Files**: `app/components/TagCarousel.tsx`
- **Success Criteria**: Visual consistency with current design system.
- **Testing**: Visual review in light/dark.
- **Commit**: `style(carousel): align with site design`

#### STEP-007: Document carousel behavior
- **Status**: Pending
- **Description**: Add brief notes in progress doc or inline comments if needed.
- **Files**: `progress-carousel-social-component.md`
- **Success Criteria**: Clear rationale for a11y behavior.
- **Testing**: N/A
- **Commit**: `docs(carousel): note a11y behavior`

### PR 1 Testing Checklist
- `pnpm lint`
- `pnpm typecheck`
- Manual: verify motion, pause on hover/focus, reduced-motion stops

---

## PR 2: Site-wide Integration + Tests

**Goal**: Render the carousel above the footer on every page and validate with tests.  
**Risk**: Low — layout placement and minimal tests.  
**Dependencies**: PR 1.  
**Branch**: `feat/carousel-integrate`  
**Estimated Effort**: 1–2 hours.

### Steps

#### STEP-009: Integrate in global layout
- **Status**: Pending
- **Description**: Render `TagCarousel` between `<main>` and `<Footer>` in `app/layout.tsx`.
- **Files**: `app/layout.tsx`
- **Success Criteria**: Carousel appears above footer on all pages.
- **Testing**: Manual check on `/`, `/about`, `/life`, `/writing`.
- **Commit**: `feat(carousel): render above footer`

#### STEP-010: Add integration test
- **Status**: Pending
- **Description**: Update integration test(s) to assert carousel presence.
- **Files**: `tests/integration/home-page.test.tsx` (or new test)
- **Success Criteria**: Test asserts carousel region exists (ARIA label).
- **Testing**: `pnpm test:integration`
- **Commit**: `test(carousel): assert global render`

#### STEP-011: Update a11y expectations in tests
- **Status**: Pending
- **Description**: Ensure reduced-motion behavior is mocked if needed.
- **Files**: `tests/setup.tsx` (if mocking matchMedia)
- **Success Criteria**: Tests stable with motion queries.
- **Testing**: `pnpm test`
- **Commit**: `test(carousel): stabilize motion media`

#### STEP-012: Visual verification sweep
- **Status**: Pending
- **Description**: Quick manual check in light/dark mode.
- **Files**: N/A
- **Success Criteria**: No overlap with footer, consistent spacing.
- **Testing**: Manual UI check.
- **Commit**: N/A

### PR 2 Testing Checklist
- `pnpm test:integration`
- Manual: verify placement on all pages, no overlap

---

## Testing Strategy

- **PR 1**: Lint + typecheck + manual visual/a11y checks.
- **PR 2**: Integration test + manual placement check.

---

## Risk Assessment

### Low Risk
- UI-only changes, no data or API changes.

### Medium Risk
- Motion settings or animation glitches on different browsers.

### Mitigations
- Use CSS-only animation, reduced-motion opt-out, pause on hover/focus.

---

## Notes & References

- Reference site: https://www.coderabbit.ai/  
- Carousel inspiration: https://ui.shadcn.com/docs/components/radix/carousel  
- Accessibility: WCAG 2.2.2 (Pause, Stop, Hide) and prefers-reduced-motion
