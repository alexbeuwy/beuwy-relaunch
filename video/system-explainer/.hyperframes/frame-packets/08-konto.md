# Frame packet: 08-konto

## Project inputs

- Project: /home/user/beuwy-relaunch/video/system-explainer
- Design truth: /home/user/beuwy-relaunch/video/system-explainer/frame.md
- RULES_DIR: /root/.claude/skills/hyperframes-animation/rules

## Assigned storyboard block

## Frame 8 — Konto

- scene: links Headline „Käufer legen bei ihm ein Konto an. Mit Suchauftrag.“ (h2, max. 800 px), Highlighter unter „Mit Suchauftrag.“ auf „hinterlege
- duration: 7.29s
- start: 44.29s
- transition_in: wipe-left
- status: built
- voiceover: "Käufer legen bei ihm ein Konto an und hinterlegen, was sie suchen. Passt ein neues Objekt, geht die Mail von selbst raus."
- src: compositions/08-konto.html
- blueprint: compose
- rules: spring-pop-entrance, anchored-layout-expand
- focal: Mail „Passt zu Ihrem Suchauftrag“
- cues: Käufer@0.35 · legen@0.78 · bei@0.99 · ihm@1.12 · ein@1.27 · Konto@1.4 · an@1.74 · und@1.89 · hinterlegen,@2.0 · was@2.46 · sie@2.65 · suchen.@2.8 · Passt@3.43 · ein@3.76 · neues@3.89 · Objekt,@4.19 · geht@4.7 · die@4.91 · Mail@5.05 · von@5.23 · selbst@5.4 · raus.@5.72

Shot sequence (Sekunden relativ zum Frame-Start; Wortzeiten in `cues`):
Scene 1 (0.0–1.6s): links Headline „Käufer legen bei ihm ein Konto an. Mit Suchauftrag.“ (h2, max. 800 px), Highlighter unter „Mit Suchauftrag.“ auf „hinterlegen“. Rechts Konto-Karte (760 × 520): Label „SUCHAUFTRAG“, Avatar-Kreis surface mit Initialen „JK“, Chips erscheinen nacheinander: „3–4 Zimmer“, „Speyer“, „bis 450.000 €“, „Garten“. → Scene 2 (auf „Passt“): ein neues Objekt-Kärtchen (Titel „Doppelhaushälfte, Speyer-West“, grauer Bildblock) gleitet von rechts in die Karte. → Scene 3 (auf „Mail“): darunter klappt eine Mail-Zeile auf (anchored-layout-expand): linker gelber Balken, Text „Passt zu Ihrem Suchauftrag: Doppelhaushälfte, Speyer-West“, rechts Status „gesendet 06:00“ (dim).

## Selected motion rule: spring-pop-entrance

---
name: spring-pop-entrance
description: The canonical entrance pop — an element (or staggered group) arrives by scaling 0 → 1 on a smooth long-tail settle (power3 default); bouncy overshoot is a rare, explicitly-playful exception. fromTo so it's correct at t=0 under seek.
metadata:
  tags: spring, entrance, pop, scale, power3, settle, stagger, reveal, arrival
---

# Spring-Pop Entrance

> **Smooth beats bouncy.** This entrance defaults to a smooth long-tail settle — `power3.out` (or `expo.out` for a faster front) — that decelerates cleanly into the resting size with **no overshoot**. Bouncy `back.out` is the **#1 instant turn-off** in agent-made videos and is almost never executed well; it is a rare, explicitly-playful exception (consumer / fun brand), never the default. When unsure, settle smoothly.

THE entrance primitive: an element (or staggered group) arrives by springing from nothing — `scale: 0 → 1`, optional small `y` rise — and settles without bouncing. This is **arrival**, not reaction: distinct from [press-release-spring.md](press-release-spring.md) (a click/press → release feedback chain on an element that already rests on screen). Many blueprints used to borrow that rule to fake an entrance; reach for this instead.

## How It Works

One `fromTo` carries the whole arrival: from `{ scale: 0, opacity: 0 }` (explicit, so t=0 is correct under seek) to `{ scale: 1, opacity: 1, ease: "power3.out" }`. For a **group**, the same `fromTo` runs per element at `i * STAGGER`, capped so the group reads as one arriving beat. The `scale` grow is load-bearing; the `y` rise is garnish — drop everything else and it must still read as a clean entrance. Let the ease produce the settle: never hand-key a `scale: 1.1` mid-state (it double-bounces against the curve).

## Recipe

```html
<!-- inside a standard scene clip (hyperframes-core) -->
<div class="pop-hero" id="hero">{heroLabel}</div>

<div class="pop-grid">
  <div class="pop-item">{itemA}</div>
  <div class="pop-item">{itemB}</div>
  <div class="pop-item">{itemC}</div>
</div>
```

```css
.pop-hero,
.pop-item {
  transform-origin: 50% 50%; /* in-place pop; move to the source point for the anchored variation */
  will-change: transform;
}
.pop-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: GRID_GAP;
  place-items: center;
}
```

```js
// Single hero pop — smooth long-tail settle, no overshoot.
tl.fromTo(
  "#hero",
  { scale: 0, opacity: 0 },
  { scale: 1, opacity: 1, duration: POP_DUR, ease: "power3.out" },
  ENTRY_AT,
);

// Staggered group pop — one arriving beat.
gsap.utils.toArray(".pop-item").forEach((el, i) => {
  tl.fromTo(
    el,
    { scale: 0, opacity: 0, y: Y_RISE },
    { scale: 1, opacity: 1, y: 0, duration: POP_DUR, ease: "power3.out" },
    GROUP_ENTRY_AT + i * STAGGER,
  );
});
```

## Variations

- **Calm settle** (premium / enterprise): `power3.out`, no rotation, `Y_RISE` 0–12px — a weighted, confident landing for a hero wordmark or product shot.
- **Firm settle** (everyday default): `power3.out` or `expo.out` for a punchier front, `Y_RISE` ~24px — cards, icons, callouts.
- **Exact-physics settle**: when the settle IS the shot, swap the ease for `springEase({ response: 0.4 })` (critically damped) from `../adapters/gsap-easing-and-stagger.md` → Spring Eases; take `duration` from the helper.
- **Origin-anchored pop**: a callout growing out of a specific point (marker, pointer tip) sets `transform-origin` to that point (e.g. `0% 100%`) so `scale: 0 → 1` reads as "emerging from the source", not "inflating in place".
- **Pop into a held slot**: land the pop and hold still — no idle loop baked into the entrance. If the held frame genuinely needs life, hand off to [sine-wave-loop.md](sine-wave-loop.md) for subtle jitter on a separate later tween; prefer revealing the next element on its VO cue.
- **Bouncy pop (RARE — explicitly-playful only)**: swap the ease for `back.out(OVERSHOOT)` and optionally settle a small `rotation: ROT_FROM → 0` so elements look hand-placed. Only for a deliberately playful register — never product / enterprise / serious tone:

```js
tl.fromTo(
  el,
  { scale: 0, opacity: 0, rotation: ROT_FROM },
  { scale: 1, opacity: 1, rotation: 0, duration: POP_DUR, ease: `back.out(${OVERSHOOT})` },
  GROUP_ENTRY_AT + i * STAGGER,
);
```

Even here keep `OVERSHOOT ≤ ~2` — past that it reads as cartoon wobble. Better still: the baked spring at `dampingFraction: 0.6–0.7` (same adapters doc) gives ~5–10% overshoot that reads physical where `back.out` reads cartoon.

## Values

| token      | range                                     | notes                                                            |
| ---------- | ----------------------------------------- | ---------------------------------------------------------------- |
| EASE       | `power3.out` default; `expo.out` punchier | `back.out(OVERSHOOT)` only in the playful variant                |
| POP_DUR    | 0.4–0.7s                                  | shorter = tight snap; hero must be visible by **t ≤ 0.5s**       |
| STAGGER    | 0.04–0.08s                                | `min(0.06, 0.5 / ITEM_COUNT)` — self-caps the window             |
| ITEM_COUNT | 3–9                                       | >9 makes the stagger vanish — switch to a wipe/sweep reveal      |
| Y_RISE     | 0–32px                                    | small; never large enough to read as a slide-up                  |
| ROT_FROM   | −10°–+10°                                 | playful variant only; alternate sign by index (`i % 2 ? 6 : -6`) |
| ENTRY_AT   | 0–0.4s                                    | a beat of quiet, but keep the subject landing by t ≤ 0.5s        |

## Critical Constraints

- Default ease `power3.out` (no overshoot); `back.out` only in the explicitly-playful variant, and there `OVERSHOOT ≤ ~2`.
- `ITEM_COUNT × STAGGER ≤ ~0.5s` — the group must land inside one beat.
- Entrances state the collapsed from-state in `fromTo` — never rely on a CSS-hidden start (it renders visible before the tween claims it under seek).
- `transform-origin: 50% 50%` for an in-place pop; the source point only for the anchored variation.
- This is a finite arrival — idle motion on a held element is a separate, later `sine-wave-loop` tween.

## See also

`center-outward-expansion` (pop while radiating to slots) · `press-release-spring` (the click-feedback counterpart) · `sine-wave-loop` (post-arrival jitter, sparingly).

## Selected motion rule: anchored-layout-expand

---
name: anchored-layout-expand
description: Edge-pinned container grows (or collapses) along ONE axis and in-flow content reflows with it — a pill springs open downward into a dropdown, a panel grows a sub-task stack, an input card stretches as typed text wraps, a pane expands over a neighbor. Transform-only (mask + slide, or proxy-driven scaleY + counter-scale) because width/height tweens are forbidden; the push on subsequent content is a matched translate on the same tween.
metadata:
  tags: expand, collapse, anchored, dropdown, menu, accordion, panel, reflow, push, mask, counter-scale, layout
---

# Anchored Layout Expand

> The law: **author the layout at its final (expanded) state in CSS, then fake the collapsed state with transforms.** The container never changes size — the _visible_ region does — and everything downstream rides a matched translate. The browser computes layout ONCE; every intermediate frame is pure transform.

THE one-axis growth primitive: a container pinned at one edge appears to grow along a single axis, and the in-flow content after it moves in perfect contact with the traveling edge — dropdown, sub-task stack, growing composer card, pane widening over a neighbor. Growth and push are ONE motion: if the panel's bottom edge and the pushed content ever separate or overlap, the illusion dies.

Distinct from [card-morph-anchor.md](card-morph-anchor.md) (a free-floating two-shot morph with no neighbors to push — this rule's container is a live layout participant), [spring-pop-entrance.md](spring-pop-entrance.md) (arrival at a point, no edge travel or reflow), and [reactive-displacement.md](reactive-displacement.md) (displacement by a colliding intruder; here content moves because the container's edge reached it — layout causality, not collision).

## How It Works

1. **Mask** — a wrapper at the final body height (`BODY_H`), `overflow: hidden`. Never tweened.
2. **Sheet** — the panel surface + content inside the mask, starting at `y: -BODY_H` (tucked above the mask window, behind the pinned header).
3. **Below** — ONE wrapper holding everything after the container, also starting at `y: -BODY_H`.
4. **Grow** — ONE `fromTo` drives sheet AND below from `y: -BODY_H → 0`. Shared tween ⇒ the descending bottom edge and the pushed content stay in exact contact by construction. Collapse = the same pair tweened back.

When the surface must visibly **stretch in place** (rows revealed top-first, or a pane growing sideways), use the proxy counter-scale variant below instead.

## Recipe

```html
<!-- inside a standard scene clip (hyperframes-core) -->
<div class="stack">
  <div class="expander">
    <div class="expander-head">{headerLabel}</div>
    <div class="expand-mask" id="expand-mask" data-layout-allow-overflow>
      <div class="expand-sheet" id="expand-sheet">
        <div class="expand-row">{rowA}</div>
        <div class="expand-row">{rowB}</div>
      </div>
    </div>
  </div>
  <!-- EVERYTHING that must be pushed lives in this one wrapper -->
  <div class="below" id="below">{followingContent}</div>
</div>
```

```css
/* Layout is the EXPANDED end state — no collapsed geometry exists in CSS. */
.expander-head {
  position: relative;
  z-index: 2; /* the sheet slides out from UNDER the header */
}
.expand-mask {
  height: BODY_H; /* authored final height — NEVER tweened */
  overflow: hidden;
}
.expand-sheet {
  height: BODY_H;
  border-radius: 0 0 SHEET_RADIUS SHEET_RADIUS; /* bottom-only — header + sheet read as one grown card */
  will-change: transform; /* + on .below */
}
```

```js
// BODY_H must equal the mask's CSS height exactly — measure once at build.
// (Montage caveat: per the contract, in a multi-scene master use an authored
// CSS-matched constant instead — later clips may not be laid out yet.)
const BODY_H = document.querySelector("#expand-mask").offsetHeight;

// The grow: ONE tween, BOTH sides of the seam.
tl.fromTo(
  ["#expand-sheet", "#below"],
  { y: -BODY_H },
  { y: 0, duration: GROW_DUR, ease: GROW_EASE },
  GROW_AT,
);

// Garnish: rows already ride the sheet; the fade stagger makes them read as "options arriving".
tl.fromTo(
  ".expand-row",
  { opacity: 0 },
  { opacity: 1, duration: ROW_FADE_DUR, stagger: ROW_STAGGER, ease: "power2.out" },
  GROW_AT + GROW_DUR * 0.25,
);

// Collapse — same machinery back; faster (closing is a snap decision).
tl.fromTo(
  ["#expand-sheet", "#below"],
  { y: 0 },
  { y: -BODY_H, duration: COLLAPSE_DUR, ease: "power3.in", immediateRender: false },
  COLLAPSE_AT,
);
```

## Variations

- **Proxy counter-scale — surface stretches in place** (rows revealed top-first holding their screen positions; the "payload card expands from the tool-call line"). Drive mask `scaleY` and the sheet's exact inverse from ONE proxy — two independent tweens are wrong: eased midpoints of `s` and `1/s` are not inverses and the content squashes mid-grow. Net content scale is `s × 1/s = 1` every frame; seek-safe because everything derives from the one interpolated proxy.

  ```js
  const grow = { h: COLLAPSED_H }; // 0 for fully collapsed
  tl.fromTo(
    grow,
    { h: COLLAPSED_H },
    {
      h: BODY_H,
      duration: GROW_DUR,
      ease: GROW_EASE,
      onUpdate: () => {
        const s = Math.max(grow.h / BODY_H, 0.0001); // clamp: no divide-by-zero
        gsap.set("#expand-mask", { scaleY: s, transformOrigin: "50% 0%" });
        gsap.set("#expand-sheet", { scaleY: 1 / s, transformOrigin: "50% 0%" });
        gsap.set("#below", { y: grow.h - BODY_H });
      },
    },
    GROW_AT,
  );
  ```

- **One-axis pane expand (X)**: same machinery rotated 90° — pin the left edge, sheet from `x: -PANE_W` (or proxy `scaleX` + counter-scale, origin `0% 50%`). Decide the neighbor's fate explicitly: **overlap** (pane paints over it, no neighbor tween) or **push** (neighbor rides the same tween). Never both.
- **Typed-wrap growth** — the composer card gets taller as typed text wraps. Quantize: one short step per wrap boundary, each moving the pair by one `LINE_H`; wrap times come from the deterministic typing schedule ([discrete-text-sequence.md](discrete-text-sequence.md)), never measured at render time. Two battle-tested traps:
  - **Composer cards have no pinned header** — a composer grows from its TOP edge (the send-button footer stays put), so a plain y-step clips the card's top out of the mask. Combine the proxy counter-scale with the wrap quantization (step the proxy by `LINE_H` at each wrap time) and split the surface into a **sheet** (carries the top radius) + **footer** (carries the bottom radius) so the growth seam stays invisible.
  - **Wrap TIME vs wrap POSITION are two different authorities** — the typing schedule decides _when_ a wrap fires, the browser's line-breaking decides _where_ text actually wraps, and with proportional fonts they silently disagree. Author an explicit `\n` in the typed string (with `white-space: pre-wrap`) at the chosen split point so both derive from the same authored fact.
- **Springy open** (rare, explicitly-playful): `back.out(1.2)` — the edge overshoots a few px; the pushed content bounces with the panel (correct — they're in contact). Default stays `power3.out`.
- **Row grows a sub-task stack**: the row is the pinned header, the stack is the sheet, every later row lives in `#below`; chain several scopes for progressive disclosure.
- **FLIP hand-off**: if the container also TRAVELS to a new layout slot while resizing (prompt promoted to heading, card docking into a sidebar), that's a FLIP problem — `/hyperframes-keyframes` (FLIP recipes). This rule stays the in-place one-axis specialist.

## Values

| token                    | range                       | notes                                                                 |
| ------------------------ | --------------------------- | --------------------------------------------------------------------- |
| BODY_H                   | measured / authored         | drift from the CSS height = visible gap or overlap at full open       |
| GROW_AT                  | trigger beat + 0–0.1s       | growth needs a cause (click / wrap / status beat) or it reads haunted |
| GROW_DUR                 | 0.35–0.6s                   | below ~0.3s the pushed content appears to teleport                    |
| GROW_EASE                | `power3.out` default        | `back.out(1.1–1.3)` only for the playful register                     |
| ROW_STAGGER / \_FADE_DUR | 0.04–0.08s / 0.2–0.3s       | start rows ~25% into the grow so none flash inside a closed panel     |
| COLLAPSE_DUR             | 0.2–0.35s, `power3.in`      | faster than open                                                      |
| STEP_DUR / LINE_H        | 0.12–0.2s / CSS line-height | typed-wrap variant; WRAP_TIMES from the typing script                 |

## Critical Constraints

- **NEVER tween `width` / `height` / `top` / `left` / `margin` / `padding`** — the mask's height is a CSS constant; only its children transform. Tweening the mask IS the forbidden move this rule replaces.
- **`data-layout-allow-overflow` on the mask** — the collapsed phase parks the sheet outside the mask's box by construction, which trips the `hyperframes check` layout gate (`container_overflow`). The flag is the sanctioned waiver: this overflow is the technique working as designed, not a bug.
- **Sheet + below share one tween (or one proxy)** — matched-but-separate tweens on the two sides of the contact edge are the classic seam bug.
- **Everything downstream rides `#below`** — content outside the wrapper is overlapped at t=0 and orphaned during the grow.
- **`overflow: hidden` on the mask** — without it the tucked sheet is visible above the header at t=0.
- **Counter-scale needs a proxy**, clamped `s ≥ 0.0001` (a fully-collapsed body divides by zero).
- **Deterministic sizes** — `BODY_H`, `LINE_H`, `WRAP_TIMES` are build-time constants or one-time measurements, never per-frame layout reads.

## See also

`cursor-click-ripple` (the igniting click) · `spring-pop-entrance` (richer per-row arrivals) · `discrete-text-sequence` (the typing that drives stepped growth) · `scale-swap-transition` (the grown menu's exit) · `/hyperframes-keyframes` FLIP (grow + travel).
