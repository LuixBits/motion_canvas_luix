import {
  Line,
  Node,
  Rect,
  Txt,
  Video,
  makeScene2D,
} from '@motion-canvas/2d';
import {
  all,
  createRef,
  createRefArray,
  createSignal,
  delay,
  easeInOutCubic,
  easeInOutSine,
  easeOutBack,
  easeOutCubic,
  sequence,
  waitFor,
} from '@motion-canvas/core';
import {
  LogoBadge,
  NeonCard,
  PipelineStrip,
  TerminalWindow,
  VaporScene,
  hideUp,
  revealUp,
  setChapter,
  softPulse,
  staggerReveal,
  sweepAcross,
  typeText,
  vaporAccentGradient,
  vaporFont,
  vaporPalette,
} from '../scene-kit';

const segment = {
  question: 4.6,
  scope: 7.5,
  format: 6.4,
  workflow: 6.4,
  tutorial: 4.7,
  minimal: 9.81,
};

const tutorialClip = '/videos/neorggithub.mp4';

export default makeScene2D(function* (view) {
  const sections = createRefArray<Node>();
  const conceptCards = createRefArray<Node>();
  const scopeCards = createRefArray<Node>();
  const formatCards = createRefArray<Node>();
  const workflowCards = createRefArray<Node>();
  const minimalCards = createRefArray<Node>();

  const chapterText = createRef<Txt>();
  const chapterRule = createRef<Line>();
  const scanLine = createRef<Line>();
  const title = createRef<Txt>();
  const titleRule = createRef<Line>();
  const neorgBadge = createRef<Node>();
  const norgLine = createRef<Line>();
  const terminal = createRef<Node>();
  const terminalSweep = createRef<Rect>();
  const terminalProgress = createSignal(0);
  const tutorialFrame = createRef<Node>();
  const tutorialVideo = createRef<Video>();
  const tutorialBorder = createRef<Line>();
  const minimalPipeline = createRef<Node>();
  const pipelineProgress = createRef<Line>();

  const command = 'nvim ~/notes/first-workspace/index.norg';

  function* timedSection(
    node: Node,
    duration: number,
    hideDistance = 32,
  ) {
    yield* all(
      waitFor(duration),
      delay(Math.max(0, duration - 0.4), hideUp(node, 0.4, hideDistance)),
    );
  }

  function* playTutorialRecording() {
    tutorialVideo().seek(0);
    tutorialVideo().play();
    yield* waitFor(4);
    tutorialVideo().pause();
  }

  view.add(
    <VaporScene
      series={'open-source alternatives'}
      episode={'episode://neorg'}
      chapter={'part 00 / what is neorg'}
      scanLineRef={scanLine}
      chapterTextRef={chapterText}
      chapterRuleRef={chapterRule}
    >
      <Node ref={sections} opacity={0}>
        <Txt
          ref={title}
          text={'SO FIRST OFF,\nWHAT IS NEORG?'}
          y={-160}
          width={2100}
          textWrap
          textAlign={'center'}
          fontFamily={vaporFont}
          fontSize={116}
          lineHeight={126}
          fontWeight={800}
          fill={vaporPalette.text}
          letterSpacing={8}
          opacity={0}
        />
        <Line
          ref={titleRule}
          points={[
            [-520, 0],
            [520, 0],
          ]}
          y={28}
          stroke={vaporAccentGradient('pink', 'cyan')}
          lineWidth={12}
          end={0}
        />
        <Node ref={conceptCards} opacity={0} y={52} scale={0.86}>
          <NeonCard
            title={'Neovim plugin'}
            detail={'notes inside the editor'}
            symbol={'N'}
            accent={'mint'}
            x={-390}
            y={210}
            width={640}
          />
        </Node>
        <Node ref={conceptCards} opacity={0} y={52} scale={0.86}>
          <NeonCard
            title={'not just notes'}
            detail={'a workspace for structured writing'}
            symbol={'+'}
            accent={'cyan'}
            x={390}
            y={210}
            width={640}
          />
        </Node>
      </Node>

      <Node ref={sections} opacity={0}>
        <Node ref={neorgBadge} x={-1120} y={-28} opacity={0} scale={0.72}>
          <LogoBadge
            src={'/icons/neorg.png'}
            label={'Neorg'}
            accent={'mint'}
            secondaryAccent={'cyan'}
            size={520}
          />
        </Node>

        <Txt
          text={'an all-encompassing tool'}
          x={500}
          y={-352}
          width={1540}
          textAlign={'left'}
          fontFamily={vaporFont}
          fontSize={70}
          fontWeight={800}
          fill={vaporPalette.text}
        />
        <Txt
          text={'structured note taking, projects, time, slides, documents, and more'}
          x={500}
          y={-270}
          width={1540}
          textWrap
          textAlign={'left'}
          fontFamily={vaporFont}
          fontSize={31}
          lineHeight={40}
          fill={vaporPalette.muted}
        />

        {([
          ['notes', 'structured pages', 'N', 'pink', 180, -78],
          ['tasks', 'project management', '#', 'mint', 900, -78],
          ['time', 'tracking context', '@', 'cyan', 180, 142],
          ['slides', 'present from text', '>', 'purple', 900, 142],
          ['docs', 'write long-form', '*', 'amber', 540, 362],
        ] as const).map(([cardTitle, detail, symbol, accent, x, y]) => (
          <Node ref={scopeCards} opacity={0} x={70} scale={0.9}>
            <NeonCard
              title={cardTitle}
              detail={detail}
              symbol={symbol}
              accent={accent}
              x={x}
              y={y}
              width={660}
              height={162}
            />
          </Node>
        ))}
      </Node>

      <Node ref={sections} opacity={0}>
        <Txt
          text={'not markdown\ninside neovim'}
          x={-900}
          y={-204}
          width={980}
          textWrap
          textAlign={'left'}
          fontFamily={vaporFont}
          fontSize={82}
          lineHeight={94}
          fontWeight={800}
          fill={vaporPalette.text}
        />
        <Txt
          text={'Neorg has its own file format: norg'}
          x={-900}
          y={8}
          width={980}
          textWrap
          textAlign={'left'}
          fontFamily={vaporFont}
          fontSize={34}
          lineHeight={46}
          fill={vaporPalette.muted}
        />
        <Line
          ref={norgLine}
          points={[
            [-480, 0],
            [480, 0],
          ]}
          x={-900}
          y={112}
          stroke={vaporAccentGradient('pink', 'mint')}
          lineWidth={8}
          end={0}
        />

        <Node x={520} y={-46}>
          <Node ref={formatCards} opacity={0} y={42} scale={0.86}>
            <NeonCard
              title={'.md'}
              detail={'familiar, loose, simple'}
              accent={'purple'}
              variant={'compact'}
              x={-360}
              y={-128}
              width={560}
              height={128}
            />
          </Node>
          <Node ref={formatCards} opacity={0} y={42} scale={0.86}>
            <NeonCard
              title={'.norg'}
              detail={'structured plain text'}
              accent={'mint'}
              variant={'compact'}
              x={360}
              y={-128}
              width={560}
              height={128}
            />
          </Node>
          <Node ref={formatCards} opacity={0} y={42} scale={0.86}>
            <TerminalWindow
              path={'~/notes'}
              command={'open index.norg'}
              output={'* ideas\n  - tasks\n  - links\n\n@meta\n  title: first workspace'}
              accent={'mint'}
              secondaryAccent={'pink'}
              width={1480}
              height={640}
              y={270}
            />
          </Node>
        </Node>
      </Node>

      <Node ref={sections} opacity={0}>
        <Txt
          text={'shape it\nyour way'}
          x={-1040}
          y={-224}
          width={920}
          textWrap
          textAlign={'left'}
          fontFamily={vaporFont}
          fontSize={86}
          lineHeight={96}
          fontWeight={800}
          fill={vaporPalette.text}
        />
        <Txt
          text={'Start small. Add only what you need.'}
          x={-1040}
          y={-18}
          width={920}
          textWrap
          textAlign={'left'}
          fontFamily={vaporFont}
          fontSize={34}
          lineHeight={46}
          fill={vaporPalette.muted}
        />

        <TerminalWindow
          ref={terminal}
          path={'~/notes/neorg'}
          command={command}
          commandProgress={terminalProgress}
          output={'workspace = notes\nformat = norg\nconfig = minimal'}
          accent={'cyan'}
          secondaryAccent={'purple'}
          width={1360}
          height={560}
          x={560}
          y={-6}
          sweepRef={terminalSweep}
          opacity={0}
          scale={0.92}
        />

        {([
          ['plain text', '', 'mint', -290],
          ['personal', '', 'pink', 0],
          ['workflow', '', 'cyan', 290],
        ] as const).map(([cardTitle, detail, accent, x]) => (
          <Node ref={workflowCards} opacity={0} y={36} scale={0.9}>
            <NeonCard
              title={cardTitle}
              detail={detail || undefined}
              accent={accent}
              variant={'compact'}
              width={420}
              height={116}
              x={560 + x}
              y={382}
            />
          </Node>
        ))}
      </Node>

      <Node ref={sections} opacity={0}>
        <Node ref={tutorialFrame} opacity={0} y={36} scale={0.96}>
          <Rect
            width={3060}
            height={1284}
            y={34}
            radius={20}
            fill={'rgba(6, 9, 18, 0.88)'}
            stroke={vaporAccentGradient('pink', 'cyan')}
            lineWidth={5}
            shadowColor={'rgba(0, 0, 0, 0.62)'}
            shadowBlur={76}
          />
          <Video
            ref={tutorialVideo}
            src={tutorialClip}
            width={3016}
            height={1262}
            y={34}
            radius={16}
            play={false}
          />
          <Line
            ref={tutorialBorder}
            points={[
              [-1508, -607],
              [1508, -607],
              [1508, 675],
              [-1508, 675],
              [-1508, -607],
            ]}
            stroke={vaporAccentGradient('mint', 'cyan')}
            lineWidth={8}
            end={0}
          />
          <Rect
            width={980}
            height={84}
            x={-980}
            y={-536}
            radius={14}
            fill={'rgba(6, 9, 18, 0.82)'}
            stroke={'rgba(255, 244, 232, 0.16)'}
            lineWidth={2}
          />
          <Txt
            text={'tutorials: GitHub / YouTube'}
            x={-980}
            y={-536}
            width={900}
            textAlign={'center'}
            fontFamily={vaporFont}
            fontSize={32}
            fontWeight={800}
            fill={vaporPalette.text}
          />
        </Node>
      </Node>

      <Node ref={sections} opacity={0}>
        <Txt
          text={'start small.\nthen fix what hurts.'}
          y={-326}
          width={2200}
          textWrap
          textAlign={'center'}
          fontFamily={vaporFont}
          fontSize={86}
          lineHeight={98}
          fontWeight={800}
          fill={vaporPalette.text}
        />
        <PipelineStrip
          ref={minimalPipeline}
          steps={[
            {label: 'install', detail: 'minimal setup', accent: 'mint'},
            {label: 'use it', detail: 'for a few minutes', accent: 'cyan'},
            {label: 'notice', detail: 'real friction', accent: 'amber'},
            {label: 'fix', detail: 'exactly that thing', accent: 'pink'},
          ]}
          activeIndex={0}
          width={2300}
          y={-34}
          progressRef={pipelineProgress}
          opacity={0}
          scale={0.94}
        />

        {([
          ['no huge config', 'do not copy what you do not understand', '!', 'amber', -760, 340],
          ['small config', 'readable from day one', '>', 'mint', 0, 340],
          ['build up', 'only when the workflow asks for it', '+', 'cyan', 760, 340],
        ] as const).map(([cardTitle, detail, symbol, accent, x, y]) => (
          <Node ref={minimalCards} opacity={0} y={40} scale={0.88}>
            <NeonCard
              title={cardTitle}
              detail={detail}
              symbol={symbol}
              accent={accent}
              variant={'warning'}
              iconShape={'circle'}
              width={650}
              height={150}
              x={x}
              y={y}
            />
          </Node>
        ))}
      </Node>
    </VaporScene>,
  );

  yield* all(
    scanLine().opacity(0.86, 0.5, easeOutCubic),
    scanLine().end(1, 0.8, easeInOutCubic),
  );

  yield* setChapter(chapterText(), chapterRule(), 'part 00 / what is neorg');
  yield* all(
    revealUp(sections[0]),
    delay(
      0.12,
      all(
        title().opacity(1, 0.58, easeOutCubic),
        title().letterSpacing(0, 0.58, easeOutCubic),
        titleRule().end(1, 0.62, easeOutCubic),
      ),
    ),
    delay(0.72, staggerReveal(conceptCards, 0.14, 0.34)),
    timedSection(sections[0], segment.question),
  );

  yield* setChapter(chapterText(), chapterRule(), 'part 01 / tutorials');
  yield* all(
    revealUp(sections[4]),
    delay(
      0.12,
      all(
        tutorialFrame().opacity(1, 0.42, easeOutCubic),
        tutorialFrame().y(0, 0.42, easeOutBack),
        tutorialFrame().scale(1, 0.42, easeOutBack),
        tutorialBorder().end(1, 0.72, easeOutCubic),
      ),
    ),
    delay(0.18, playTutorialRecording()),
    timedSection(sections[4], segment.tutorial, 18),
  );

  yield* setChapter(chapterText(), chapterRule(), 'part 02 / more than notes');
  yield* all(
    revealUp(sections[1]),
    delay(
      0.16,
      all(
        neorgBadge().opacity(1, 0.46, easeOutCubic),
        neorgBadge().scale(1, 0.58, easeOutBack),
      ),
    ),
    delay(0.58, staggerReveal(scopeCards, 0.1, 0.34)),
    delay(
      4.2,
      sequence(
        0.08,
        ...scopeCards.map(card => softPulse(card, 1.05, 0.14, 0.18)),
      ),
    ),
    timedSection(sections[1], segment.scope),
  );

  yield* setChapter(chapterText(), chapterRule(), 'part 03 / norg');
  yield* all(
    revealUp(sections[2]),
    delay(0.34, norgLine().end(1, 0.58, easeOutCubic)),
    delay(0.64, staggerReveal(formatCards, 0.14, 0.36)),
    timedSection(sections[2], segment.format),
  );

  yield* setChapter(chapterText(), chapterRule(), 'part 04 / personalize it');
  terminalProgress(0);
  yield* all(
    revealUp(sections[3]),
    delay(0.18, revealUp(terminal(), 0.46)),
    delay(0.54, typeText(terminalProgress, command.length, 1.25)),
    delay(0.9, sweepAcross(terminalSweep(), -820, 820, 1.08)),
    delay(1.26, staggerReveal(workflowCards, 0.1, 0.3)),
    timedSection(sections[3], segment.workflow),
  );

  yield* setChapter(chapterText(), chapterRule(), 'part 05 / configure by friction');
  pipelineProgress().end(0);
  yield* all(
    revealUp(sections[5]),
    delay(0.18, revealUp(minimalPipeline(), 0.48)),
    delay(0.82, pipelineProgress().end(1, 2.5, easeInOutCubic)),
    delay(1.7, staggerReveal(minimalCards, 0.12, 0.34)),
    delay(
      5.0,
      sequence(
        0.12,
        ...minimalCards.map(card => softPulse(card, 1.05, 0.14, 0.18)),
      ),
    ),
    timedSection(sections[5], segment.minimal),
  );

  yield* all(
    scanLine().y(586, 1.15, easeInOutSine),
    scanLine().opacity(0, 1.15, easeOutCubic),
    waitFor(1.1),
  );
});
