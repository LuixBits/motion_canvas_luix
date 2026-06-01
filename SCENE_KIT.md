# Motion Canvas Vaporwave Scene Kit

This repo uses Motion Canvas. Future scene prompts should read this file before creating or refactoring scenes.

## Structure

- `src/scene-kit.ts` is the single import surface for reusable scene assets.
- `src/theme/vaporwave.ts` contains the shared dark vaporwave palette, gradients, font, radii, shadows, and 3440x1440 safe-area dimensions.
- `src/components/` contains reusable TSX visual assets.
- `src/animations/reveals.ts` contains generator helpers for common reveals, typing, sweeps, pulses, and chapter changes.
- `src/project.ts` should load one active export scene at a time. Do not chain unrelated scenes in the `scenes` array unless the user explicitly wants one combined video.

## Export Target

The active scene is selected with `VITE_SCENE`. Current scene keys:

- `neorg-what-is`
- `obsidian-neorg`

Use:

```bash
npm run serve:neorg
npm run serve:obsidian
```

or:

```bash
VITE_SCENE=neorg-what-is npm run serve
```

## Import Pattern

```ts
import {
  LogoBadge,
  NeonCard,
  PipelineStrip,
  TerminalWindow,
  VaporScene,
  VerdictPanel,
  drawLines,
  revealUp,
  setChapter,
  softPulse,
  staggerReveal,
  typeText,
  vaporFont,
  vaporPalette,
} from '../scene-kit';
```

Use `../scene-kit` from files in `src/scenes/`.

## Visual Direction

- Keep the overall look simple, dark, and vaporwave.
- Default background should be near-black navy/eggplant with subtle grid lines.
- Use accents sparingly: `pink`, `cyan`, `mint`, `purple`, `amber`, `red`.
- Keep text warm off-white with muted secondary text.
- Use translucent dark panels, thin neon strokes, scanline transitions, and terminal-like UI.
- Avoid busy decoration. The grid, scanline, cards, terminal, logo badges, and pipeline strips are the recurring identity.

## Component Roles

- `VaporScene`: scene shell with background, grid, scanline, top episode bar, and chapter label.
- `NeonCard`: feature, warning, compact, or verdict chip card.
- `TerminalWindow`: reusable terminal panel with command typing support and sweep highlight.
- `LogoBadge`: logo/icon presentation with neon ring and pulse layer.
- `PipelineStrip`: CI/CD-style step flow such as `idea -> code -> test -> ship`.
- `VerdictPanel`: final summary panel with logo/text and verdict chips.

## Recommended Scene Skeleton

```tsx
import {makeScene2D} from '@motion-canvas/2d';
import {all, createRef, createRefArray, createSignal, waitFor} from '@motion-canvas/core';
import {
  NeonCard,
  TerminalWindow,
  VaporScene,
  revealUp,
  setChapter,
  staggerReveal,
  typeText,
} from '../scene-kit';

export default makeScene2D(function* (view) {
  const chapter = createRef<Txt>();
  const chapterRule = createRef<Line>();
  const terminal = createRef<Node>();
  const cards = createRefArray<Node>();
  const commandProgress = createSignal(0);
  const command = 'npm run build && npm test';

  view.add(
    <VaporScene
      chapterTextRef={chapter}
      chapterRuleRef={chapterRule}
      episode={'episode://tool-name'}
      chapter={'part 00 / boot'}
    >
      <TerminalWindow
        ref={terminal}
        command={command}
        commandProgress={commandProgress}
        output={'build ok\\ntests ok\\nship it'}
      />
      <NeonCard ref={cards} title={'code'} detail={'write the change'} symbol={'>'} x={-520} y={320} />
      <NeonCard ref={cards} title={'test'} detail={'verify behavior'} symbol={'+'} x={260} y={320} accent={'mint'} />
    </VaporScene>,
  );

  yield* setChapter(chapter(), chapterRule(), 'part 01 / pipeline');
  yield* all(
    revealUp(terminal()),
    typeText(commandProgress, command.length, 1.2),
    staggerReveal(cards, 0.1),
    waitFor(3),
  );
});
```

Add missing local imports such as `Line`, `Node`, and `Txt` from `@motion-canvas/2d` when using refs.

## Scene Creation Checklist

1. Start with `VaporScene`.
2. Define refs first, then static data arrays.
3. Use kit components for repeated UI before making custom shapes.
4. Use `setChapter`, `revealUp`, `staggerReveal`, `typeText`, `sweepAcross`, and `softPulse` for consistent motion.
5. Keep scene-specific copy/data inside the scene file.
6. Only add a new reusable component when at least two scenes will benefit from it.
