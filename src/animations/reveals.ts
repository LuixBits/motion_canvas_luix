import {Line, Node, Rect, Txt} from '@motion-canvas/2d';
import {
  all,
  delay,
  easeInOutCubic,
  easeOutBack,
  easeOutCubic,
  sequence,
  type SimpleSignal,
  type ThreadGenerator,
} from '@motion-canvas/core';

export function* revealUp(
  node: Node,
  duration = 0.46,
  distance = 48,
): ThreadGenerator {
  node.opacity(0);
  node.y(distance);
  node.scale(0.97);

  yield* all(
    node.opacity(1, duration, easeOutCubic),
    node.y(0, duration, easeOutCubic),
    node.scale(1, duration, easeOutBack),
  );
}

export function* hideUp(
  node: Node,
  duration = 0.34,
  distance = 36,
): ThreadGenerator {
  yield* all(
    node.opacity(0, duration, easeOutCubic),
    node.y(-distance, duration, easeOutCubic),
    node.scale(0.985, duration, easeOutCubic),
  );
}

export function* revealFromRight(
  node: Node,
  duration = 0.38,
  distance = 72,
): ThreadGenerator {
  node.opacity(0);
  node.x(distance);
  node.scale(0.92);

  yield* all(
    node.opacity(1, duration, easeOutCubic),
    node.x(0, duration, easeOutBack),
    node.scale(1, duration, easeOutBack),
  );
}

export function* staggerReveal(
  nodes: Node[],
  stagger = 0.1,
  duration = 0.34,
): ThreadGenerator {
  yield* sequence(
    stagger,
    ...nodes.map(node =>
      all(
        node.opacity(1, duration, easeOutCubic),
        node.y(0, duration, easeOutBack),
        node.x(0, duration, easeOutBack),
        node.scale(1, duration, easeOutBack),
      ),
    ),
  );
}

export function* drawLine(line: Line, duration = 0.5): ThreadGenerator {
  line.end(0);
  yield* line.end(1, duration, easeOutCubic);
}

export function* drawLines(
  lines: Line[],
  stagger = 0.08,
  duration = 0.46,
): ThreadGenerator {
  yield* sequence(stagger, ...lines.map(line => drawLine(line, duration)));
}

export function* setChapter(
  chapterText: Txt,
  chapterRule: Line,
  text: string,
  duration = 0.44,
): ThreadGenerator {
  chapterText.text(text);
  chapterRule.end(0);
  yield* chapterRule.end(1, duration, easeOutCubic);
}

export function* typeText(
  progress: SimpleSignal<number, void>,
  length: number,
  duration = 1.2,
): ThreadGenerator {
  progress(0);
  yield* progress(length, duration, easeOutCubic);
}

export function* sweepAcross(
  sweep: Rect,
  fromX: number,
  toX: number,
  duration = 1.1,
): ThreadGenerator {
  sweep.x(fromX);
  yield* sweep.x(toX, duration, easeInOutCubic);
}

export function* softPulse(
  node: Node,
  scale = 1.05,
  upDuration = 0.16,
  downDuration = 0.2,
): ThreadGenerator {
  yield* node.scale(scale, upDuration, easeOutCubic).to(1, downDuration, easeOutCubic);
}

export function* delayed<T extends ThreadGenerator>(
  seconds: number,
  animation: T,
): ThreadGenerator {
  yield* delay(seconds, animation);
}
