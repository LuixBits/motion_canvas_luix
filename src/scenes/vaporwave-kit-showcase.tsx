import {
  Line,
  Node,
  Rect,
  Txt,
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
  type PipelineStep,
  TerminalWindow,
  VaporScene,
  VerdictPanel,
  drawLines,
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

export default makeScene2D(function* (view) {
  const sections = createRefArray<Node>();
  const titleLines = createRefArray<Line>();
  const introCards = createRefArray<Node>();
  const logoBadges = createRefArray<Node>();
  const compactCards = createRefArray<Node>();
  const warningCards = createRefArray<Node>();
  const verdictChips = createRefArray<Node>();

  const chapterText = createRef<Txt>();
  const chapterRule = createRef<Line>();
  const scanLine = createRef<Line>();
  const mainTitle = createRef<Txt>();
  const subtitle = createRef<Txt>();
  const terminal = createRef<Node>();
  const terminalSweep = createRef<Rect>();
  const pipeline = createRef<Node>();
  const pipelineProgress = createRef<Line>();
  const verdictPanel = createRef<Node>();
  const verdictRule = createRef<Line>();
  const logoPulse = createRef<Line>();

  const command = 'pnpm scene-kit:new --theme vaporwave --ci clear';
  const commandProgress = createSignal(0);

  const introItems = [
    ['scene shell', 'grid, scanline, header, chapter', 'V', 'pink', -1060, 232],
    ['neon cards', 'features, warnings, compact chips', '#', 'cyan', -350, 232],
    ['terminal ui', 'typed commands and sweep motion', '$', 'mint', 360, 232],
    ['verdict flow', 'pipeline and final summary panels', '>', 'amber', 1070, 232],
  ] as const;

  const compactItems = [
    ['theme', 'central palette', 'pink', -420],
    ['assets', 'shared components', 'cyan', -210],
    ['motion', 'consistent reveals', 'mint', 0],
    ['guide', 'future prompts know where to look', 'amber', 210],
  ] as const;

  const pipelineSteps: PipelineStep[] = [
    {label: 'idea', detail: 'scene prompt', accent: 'pink'},
    {label: 'kit', detail: 'reuse assets', accent: 'purple'},
    {label: 'build', detail: 'Motion Canvas', accent: 'cyan'},
    {label: 'check', detail: 'tsc + vite', accent: 'mint'},
    {label: 'ship', detail: 'clear story', accent: 'amber'},
  ];

  const warnings = [
    ['do', 'reuse the kit first', '>', 'mint', -760, 282],
    ['avoid', 'one-off panels in every scene', '!', 'amber', 0, 282],
    ['extend', 'only when two scenes need it', '+', 'cyan', 760, 282],
  ] as const;

  view.add(
    <VaporScene
      series={'scene-kit playground'}
      episode={'episode://vaporwave-kit'}
      chapter={'part 00 / boot'}
      scanLineRef={scanLine}
      chapterTextRef={chapterText}
      chapterRuleRef={chapterRule}
    >
      <Node ref={sections} opacity={0}>
        <Txt
          ref={mainTitle}
          text={'VAPORWAVE\nSCENE KIT'}
          y={-138}
          width={2180}
          textWrap
          textAlign={'center'}
          fontFamily={vaporFont}
          fontSize={128}
          lineHeight={136}
          fontWeight={800}
          fill={vaporAccentGradient('pink', 'cyan')}
          letterSpacing={10}
          opacity={0}
        />
        <Txt
          ref={subtitle}
          text={'dark reusable assets for cleaner Motion Canvas scenes'}
          y={72}
          width={1760}
          textAlign={'center'}
          fontFamily={vaporFont}
          fontSize={34}
          fill={vaporPalette.muted}
          opacity={0}
        />
        <Line
          ref={titleLines}
          points={[
            [-560, 0],
            [560, 0],
          ]}
          y={142}
          stroke={vaporAccentGradient('pink', 'cyan')}
          lineWidth={10}
          end={0}
        />
        <Line
          ref={titleLines}
          points={[
            [-240, 0],
            [240, 0],
          ]}
          y={164}
          stroke={vaporPalette.lineStrong}
          lineWidth={4}
          end={0}
        />

        {introItems.map(([title, detail, symbol, accent, x, y]) => (
          <Node x={x} y={y}>
            <Node ref={introCards} opacity={0} y={46} scale={0.86}>
              <NeonCard
                title={title}
                detail={detail}
                symbol={symbol}
                accent={accent}
                width={620}
              />
            </Node>
          </Node>
        ))}
      </Node>

      <Node ref={sections} opacity={0}>
        <Node x={-1060} y={-50}>
          <Node ref={logoBadges} opacity={0} y={38} scale={0.76}>
            <LogoBadge
              src={'/icons/obsidian.png'}
              label={'Obsidian'}
              accent={'purple'}
              secondaryAccent={'pink'}
              size={430}
            />
          </Node>
        </Node>
        <Node x={-530} y={-50}>
          <Node ref={logoBadges} opacity={0} y={38} scale={0.76}>
            <LogoBadge
              src={'/icons/neorg.png'}
              label={'Neorg'}
              accent={'mint'}
              secondaryAccent={'cyan'}
              size={430}
            />
          </Node>
        </Node>
        <Node x={0} y={-50}>
          <Node ref={logoBadges} opacity={0} y={38} scale={0.76}>
            <LogoBadge
              label={'Kit'}
              accent={'pink'}
              secondaryAccent={'cyan'}
              size={430}
            />
          </Node>
        </Node>

        <Node x={825} y={-28}>
          <TerminalWindow
            ref={terminal}
            path={'~/motion-canvas-next-video'}
            command={command}
            commandProgress={commandProgress}
            output={
              'read SCENE_KIT.md\nload theme/vaporwave.ts\ncompose components\nanimate with reveals.ts'
            }
            accent={'cyan'}
            secondaryAccent={'pink'}
            width={1200}
            height={570}
            sweepRef={terminalSweep}
            opacity={0}
            y={46}
            scale={0.92}
          />
        </Node>

        {compactItems.map(([title, detail, accent, x]) => (
          <Node x={x} y={426}>
            <Node ref={compactCards} opacity={0} y={34} scale={0.9}>
              <NeonCard
                title={title}
                detail={detail}
                accent={accent}
                variant={'compact'}
                width={360}
                height={112}
              />
            </Node>
          </Node>
        ))}
      </Node>

      <Node ref={sections} opacity={0}>
        <Txt
          text={'CI/CD as reusable motion language'}
          y={-378}
          width={2100}
          textAlign={'center'}
          fontFamily={vaporFont}
          fontSize={70}
          fontWeight={800}
          fill={vaporPalette.text}
        />
        <Txt
          text={'future scenes can show process without rebuilding diagrams every time'}
          y={-302}
          width={2100}
          textAlign={'center'}
          fontFamily={vaporFont}
          fontSize={30}
          fill={vaporPalette.muted}
        />
        <Node y={-60}>
          <PipelineStrip
            ref={pipeline}
            steps={pipelineSteps}
            activeIndex={0}
            width={2480}
            progressRef={pipelineProgress}
            opacity={0}
            y={42}
            scale={0.94}
          />
        </Node>

        {warnings.map(([title, detail, symbol, accent, x, y]) => (
          <Node x={x} y={y}>
            <Node ref={warningCards} opacity={0} y={36} scale={0.88}>
              <NeonCard
                title={title}
                detail={detail}
                symbol={symbol}
                accent={accent}
                variant={'warning'}
                iconShape={'circle'}
                width={660}
                height={150}
              />
            </Node>
          </Node>
        ))}
      </Node>

      <Node ref={sections} opacity={0}>
        <VerdictPanel
          ref={verdictPanel}
          logoSrc={'/icons/neorg.png'}
          logoLabel={'KIT'}
          chips={[
            {label: 'SCENE SHELL', accent: 'pink'},
            {label: 'TERMINAL', accent: 'cyan'},
            {label: 'LOGOS', accent: 'purple'},
            {label: 'PIPELINE', accent: 'amber'},
            {label: 'CARDS', accent: 'mint'},
            {label: 'GUIDE READY', accent: 'text'},
          ]}
          accent={'mint'}
          secondaryAccent={'cyan'}
          lineRef={verdictRule}
          chipRef={verdictChips}
          opacity={0}
          y={42}
          scale={0.94}
        />
        <Line
          ref={logoPulse}
          points={[
            [-1320, 346],
            [1320, 346],
          ]}
          stroke={vaporAccentGradient('pink', 'cyan')}
          lineWidth={6}
          end={0}
        />
      </Node>
    </VaporScene>,
  );

  yield* all(
    scanLine().opacity(0.86, 0.5, easeOutCubic),
    scanLine().end(1, 0.8, easeInOutCubic),
  );

  yield* setChapter(chapterText(), chapterRule(), 'part 01 / reusable identity');
  yield* all(
    revealUp(sections[0]),
    delay(
      0.1,
      all(
        mainTitle().opacity(1, 0.62, easeOutCubic),
        mainTitle().letterSpacing(0, 0.62, easeOutCubic),
        subtitle().opacity(1, 0.5, easeOutCubic),
        drawLines(titleLines, 0.08, 0.48),
      ),
    ),
    delay(0.58, staggerReveal(introCards, 0.1, 0.34)),
    waitFor(4.2),
  );
  yield* sequence(
    0.08,
    ...introCards.map(card => softPulse(card, 1.06, 0.14, 0.18)),
  );
  yield* waitFor(0.8);
  yield* hideUp(sections[0]);

  yield* setChapter(chapterText(), chapterRule(), 'part 02 / assets in motion');
  commandProgress(0);
  yield* all(
    revealUp(sections[1]),
    delay(0.1, staggerReveal(logoBadges, 0.12, 0.42)),
    delay(0.32, revealUp(terminal(), 0.48)),
    delay(0.56, typeText(commandProgress, command.length, 1.35)),
    delay(0.86, sweepAcross(terminalSweep(), -780, 780, 1.15)),
    delay(1.05, staggerReveal(compactCards, 0.08, 0.3)),
    waitFor(4.6),
  );
  yield* all(
    logoBadges[0].rotation(-3, 1.2, easeInOutSine).to(0, 1.2, easeInOutSine),
    logoBadges[1].rotation(3, 1.2, easeInOutSine).to(0, 1.2, easeInOutSine),
    logoBadges[2].scale(1.04, 0.2, easeOutCubic).to(1, 0.24, easeOutCubic),
    waitFor(2.4),
  );
  yield* hideUp(sections[1]);

  yield* setChapter(chapterText(), chapterRule(), 'part 03 / cicd clarity');
  pipelineProgress().end(0);
  yield* all(
    revealUp(sections[2]),
    delay(0.14, revealUp(pipeline(), 0.5)),
    delay(0.72, pipelineProgress().end(1, 2.2, easeInOutCubic)),
    delay(1.1, staggerReveal(warningCards, 0.12, 0.32)),
    waitFor(4.8),
  );
  yield* sequence(
    0.12,
    ...warningCards.map(card => softPulse(card, 1.05, 0.14, 0.18)),
  );
  yield* waitFor(1.2);
  yield* hideUp(sections[2]);

  yield* setChapter(chapterText(), chapterRule(), 'part 04 / future prompts');
  yield* all(
    revealUp(sections[3]),
    delay(0.14, revealUp(verdictPanel(), 0.5)),
    delay(0.36, verdictRule().end(1, 0.48, easeOutCubic)),
    delay(0.62, staggerReveal(verdictChips, 0.1, 0.34)),
    delay(0.94, logoPulse().end(1, 0.68, easeOutCubic)),
    waitFor(5.6),
  );
  yield* all(
    verdictPanel().scale(1.015, 1.6, easeInOutSine).to(1, 1.6, easeInOutSine),
    sequence(
      0.08,
      ...verdictChips.map(chip => softPulse(chip, 1.06, 0.14, 0.18)),
    ),
    waitFor(3.2),
  );

  yield* all(
    scanLine().y(586, 1.15, easeInOutCubic),
    scanLine().opacity(0, 1.15, easeOutCubic),
    waitFor(1.1),
  );
});
