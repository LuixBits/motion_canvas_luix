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

const sceneSize = {
  width: 2880,
  height: 1800,
};

const cue = {
  finally: 2.0,
  suggestions: 3.3,
  tryEmacs: 5.3,
  context: 9.0,
  oldSchool: 11.5,
  normalEditor: 16.0,
  workspace: 20.0,
  doom: 26.0,
  preconfigured: 30.0,
  org: 37.42,
  obsidianLogseq: 42.3,
  orgFiles: 54.1,
  evil: 56.3,
  vim: 61.1,
  modal: 64.0,
  question: 70.0,
  serious: 75.0,
  tooMuch: 79.0,
};

const endTime = 82.0;

export default makeScene2D(function* (view) {
  const sections = createRefArray<Node>();
  const suggestionCards = createRefArray<Node>();
  const workspaceCards = createRefArray<Node>();
  const doomCards = createRefArray<Node>();
  const compareCards = createRefArray<Node>();
  const orgDetailCards = createRefArray<Node>();
  const modalCards = createRefArray<Node>();
  const finalStackCards = createRefArray<Node>();
  const finalChoices = createRefArray<Node>();

  const scanLine = createRef<Line>();
  const chapterText = createRef<Txt>();
  const chapterRule = createRef<Line>();

  const introTitle = createRef<Txt>();
  const introRule = createRef<Line>();
  const introTerminal = createRef<Node>();
  const introSweep = createRef<Rect>();
  const introProgress = createSignal(0);

  const emacsBadge = createRef<Node>();
  const contextTitle = createRef<Txt>();
  const contextSubtitle = createRef<Txt>();
  const normalEditorCard = createRef<Node>();
  const workspaceRule = createRef<Line>();

  const doomBadge = createRef<Node>();
  const doomTitle = createRef<Txt>();
  const doomTerminal = createRef<Node>();
  const doomSweep = createRef<Rect>();
  const doomProgress = createSignal(0);
  const doomPipeline = createRef<Node>();
  const doomPipelineProgress = createRef<Line>();

  const orgTitle = createRef<Txt>();
  const orgTerminal = createRef<Node>();
  const orgSweep = createRef<Rect>();
  const orgFileBadge = createRef<Node>();

  const evilTitle = createRef<Txt>();
  const evilTerminal = createRef<Node>();
  const bridgeLine = createRef<Line>();
  const nvimBadge = createRef<Node>();
  const evilBadge = createRef<Node>();

  const finalQuestion = createRef<Txt>();
  const finalRule = createRef<Line>();

  const introCommand = 'emacs ~/notes/doom-test.org';
  const doomCommand = 'doom sync && doom run';
  const featureCardText = {
    titleFontSize: 42,
    titleLineHeight: 50,
    detailFontSize: 31,
    detailLineHeight: 40,
    symbolFontSize: 42,
  };
  const compactCardText = {
    titleFontSize: 38,
    titleLineHeight: 46,
    detailFontSize: 29,
    detailLineHeight: 38,
  };
  const verdictCardText = {
    titleFontSize: 52,
    titleLineHeight: 64,
  };
  const terminalText = {
    pathFontSize: 30,
    commandFontSize: 34,
    commandLineHeight: 44,
    outputFontSize: 32,
    outputLineHeight: 45,
  };

  function* showFixed(node: Node, duration = 0.46) {
    yield* all(
      node.opacity(1, duration, easeOutCubic),
      node.scale(1, duration, easeOutBack),
    );
  }

  function* revealText(node: Txt, duration = 0.54) {
    yield* all(
      node.opacity(1, duration, easeOutCubic),
      node.letterSpacing(0, duration, easeOutCubic),
    );
  }

  view.add(
    <VaporScene
      sceneWidth={sceneSize.width}
      sceneHeight={sceneSize.height}
      series={'open-source alternatives'}
      episode={'episode://doom-emacs'}
      chapter={'part 00 / trying emacs'}
      accent={'purple'}
      secondaryAccent={'mint'}
      scanLineRef={scanLine}
      chapterTextRef={chapterText}
      chapterRuleRef={chapterRule}
    >
      <Node ref={sections} opacity={0}>
        <Txt
          ref={introTitle}
          text={'TRYING\nDOOM EMACS'}
          y={-290}
          width={2200}
          textWrap
          textAlign={'center'}
          fontFamily={vaporFont}
          fontSize={128}
          lineHeight={140}
          fontWeight={800}
          fill={vaporPalette.text}
          letterSpacing={8}
          opacity={0}
        />
        <Line
          ref={introRule}
          points={[
            [-480, 0],
            [480, 0],
          ]}
          y={-64}
          stroke={vaporAccentGradient('purple', 'mint')}
          lineWidth={12}
          end={0}
        />

        {([
          ['finally time', 'viewer request accepted', '!', 'amber', -620],
          ['your suggestions', 'emacs, org, doom', '+', 'cyan', 0],
          ['neovim lens', 'notes first', 'N', 'mint', 620],
        ] as const).map(([title, detail, symbol, accent, x]) => (
          <Node ref={suggestionCards} opacity={0} y={46} scale={0.86}>
            <NeonCard
              {...featureCardText}
              title={title}
              detail={detail}
              symbol={symbol}
              accent={accent}
              width={640}
              height={188}
              x={x}
              y={130}
            />
          </Node>
        ))}

        <Node ref={introTerminal} opacity={0} scale={0.92}>
          <TerminalWindow
            path={'~/notes'}
            command={introCommand}
            commandProgress={introProgress}
            output={'question = can this become a real notes app?'}
            accent={'mint'}
            secondaryAccent={'purple'}
            {...terminalText}
            width={1880}
            height={420}
            y={540}
            sweepRef={introSweep}
          />
        </Node>
      </Node>

      <Node ref={sections} opacity={0}>
        <Node ref={emacsBadge} x={-840} y={-50} opacity={0} scale={0.72}>
          <LogoBadge
            label={'Emacs'}
            accent={'purple'}
            secondaryAccent={'cyan'}
            size={470}
          />
        </Node>

        <Txt
          ref={contextTitle}
          text={'old-school editor'}
          x={450}
          y={-360}
          width={1360}
          textAlign={'left'}
          fontFamily={vaporFont}
          fontSize={82}
          fontWeight={800}
          fill={vaporPalette.text}
          letterSpacing={4}
          opacity={0}
        />
        <Txt
          ref={contextSubtitle}
          text={'powerful because you can reshape the environment around your work'}
          x={450}
          y={-258}
          width={1360}
          textWrap
          textAlign={'left'}
          fontFamily={vaporFont}
          fontSize={40}
          lineHeight={52}
          fill={vaporPalette.muted}
          opacity={0}
        />

        <Node ref={normalEditorCard} opacity={0} y={42} scale={0.88}>
          <NeonCard
            {...featureCardText}
            title={'normal editor?'}
            detail={'not exactly the way people use it'}
            symbol={'?'}
            accent={'amber'}
            width={900}
            height={196}
            x={500}
            y={46}
          />
        </Node>

        <Line
          ref={workspaceRule}
          points={[
            [-760, 0],
            [760, 0],
          ]}
          x={500}
          y={238}
          stroke={vaporAccentGradient('mint', 'cyan')}
          lineWidth={8}
          end={0}
          opacity={0}
        />

        {([
          ['writing', 'outlines and drafts', '*', 'mint', -130],
          ['coding', 'buffers and commands', '>', 'cyan', 450],
          ['notes', 'links, tasks, schedule', '#', 'pink', 1030],
        ] as const).map(([title, detail, symbol, accent, x]) => (
          <Node ref={workspaceCards} opacity={0} y={46} scale={0.86}>
            <NeonCard
              {...featureCardText}
              title={title}
              detail={detail}
              symbol={symbol}
              accent={accent}
              width={560}
              height={200}
              x={x}
              y={450}
            />
          </Node>
        ))}
      </Node>

      <Node ref={sections} opacity={0}>
        <Node ref={doomBadge} x={-900} y={-70} opacity={0} scale={0.72}>
          <LogoBadge
            label={'Doom'}
            accent={'pink'}
            secondaryAccent={'mint'}
            size={470}
          />
        </Node>

        <Txt
          ref={doomTitle}
          text={'Doom Emacs'}
          x={420}
          y={-390}
          width={1400}
          textAlign={'left'}
          fontFamily={vaporFont}
          fontSize={92}
          fontWeight={800}
          fill={vaporPalette.text}
          letterSpacing={4}
          opacity={0}
        />

        <Node ref={doomPipeline} x={520} y={-82} opacity={0} scale={0.94}>
          <PipelineStrip
            steps={[
              {label: 'Emacs', detail: 'the big system', accent: 'purple'},
              {label: 'Doom', detail: 'curated defaults', accent: 'pink'},
              {label: 'modern', detail: 'less scary start', accent: 'mint'},
            ]}
            activeIndex={2}
            width={1280}
            cardHeight={166}
            labelFontSize={36}
            labelLineHeight={44}
            detailFontSize={25}
            detailLineHeight={32}
            progressRef={doomPipelineProgress}
          />
        </Node>

        {([
          ['preconfigured', 'sane defaults first', 'pink', -110],
          ['modern feel', 'faster first impression', 'cyan', 500],
          ['less intimidating', 'less empty-screen panic', 'mint', 1110],
        ] as const).map(([title, detail, accent, x]) => (
          <Node ref={doomCards} opacity={0} y={42} scale={0.86}>
            <NeonCard
              {...compactCardText}
              title={title}
              detail={detail}
              accent={accent}
              variant={'compact'}
              width={500}
              height={158}
              x={x}
              y={300}
            />
          </Node>
        ))}

        <Node ref={doomTerminal} opacity={0} scale={0.92}>
          <TerminalWindow
            path={'~/.config/doom'}
            command={doomCommand}
            commandProgress={doomProgress}
            output={'modules = org + evil + completion\nstartup = configured, not blank'}
            accent={'pink'}
            secondaryAccent={'mint'}
            {...terminalText}
            width={1580}
            height={410}
            x={520}
            y={635}
            sweepRef={doomSweep}
          />
        </Node>
      </Node>

      <Node ref={sections} opacity={0}>
        <Txt
          ref={orgTitle}
          text={'Org mode'}
          x={-860}
          y={-392}
          width={760}
          textAlign={'left'}
          fontFamily={vaporFont}
          fontSize={92}
          fontWeight={800}
          fill={vaporPalette.text}
          letterSpacing={4}
          opacity={0}
        />
        <Txt
          text={'plain-text notes with structure'}
          x={-860}
          y={-282}
          width={760}
          textWrap
          textAlign={'left'}
          fontFamily={vaporFont}
          fontSize={40}
          lineHeight={52}
          fill={vaporPalette.muted}
        />

        <Node ref={orgTerminal} opacity={0} scale={0.94}>
          <TerminalWindow
            path={'~/notes/video.org'}
            command={'open video.org'}
            output={[
              '* Doom Emacs notes',
              '** TODO compare notes workflow',
              '   SCHEDULED: <2026-05-25 Mon>',
              '   [[file:research.org][research links]]',
              '',
              '#+begin_src lua',
              'return { editor = "nvim brain", notes = "org" }',
              '#+end_src',
            ]}
            accent={'mint'}
            secondaryAccent={'cyan'}
            {...terminalText}
            width={1540}
            height={760}
            x={460}
            y={68}
            sweepRef={orgSweep}
          />
        </Node>

        {([
          ['Obsidian', 'familiar notes graph', 'purple', -1030],
          ['Logseq', 'outlines and blocks', 'cyan', -580],
        ] as const).map(([title, detail, accent, x]) => (
          <Node ref={compareCards} opacity={0} y={42} scale={0.86}>
            <NeonCard
              {...compactCardText}
              title={title}
              detail={detail}
              accent={accent}
              variant={'compact'}
              width={430}
              height={150}
              x={x}
              y={176}
            />
          </Node>
        ))}

        <Node ref={orgFileBadge} opacity={0} scale={0.84}>
          <NeonCard
            {...featureCardText}
            title={'.org files'}
            detail={'headings, todos, links, schedules, code'}
            symbol={'*'}
            accent={'amber'}
            width={900}
            height={200}
            x={-810}
            y={430}
          />
        </Node>

        {([
          ['TODO', 'tasks'],
          ['[[links]]', 'connections'],
          ['#+src', 'code blocks'],
        ] as const).map(([title, detail], index) => (
          <Node ref={orgDetailCards} opacity={0} y={36} scale={0.88}>
            <NeonCard
              {...compactCardText}
              title={title}
              detail={detail}
              accent={index === 0 ? 'pink' : index === 1 ? 'cyan' : 'mint'}
              variant={'compact'}
              width={360}
              height={142}
              x={80 + index * 430}
              y={632}
            />
          </Node>
        ))}
      </Node>

      <Node ref={sections} opacity={0}>
        <Txt
          ref={evilTitle}
          text={'Evil mode'}
          y={-392}
          width={1900}
          textAlign={'center'}
          fontFamily={vaporFont}
          fontSize={94}
          fontWeight={800}
          fill={vaporPalette.text}
          letterSpacing={4}
          opacity={0}
        />

        <Node ref={evilTerminal} opacity={0} scale={0.94}>
          <TerminalWindow
            path={'~/notes/video.org'}
            command={'SPC f f video.org'}
            output={'-- NORMAL --\njk = move   i = insert   dd = delete\nSPC = leader menu   / = search'}
            accent={'cyan'}
            secondaryAccent={'pink'}
            {...terminalText}
            width={1540}
            height={470}
            y={-56}
          />
        </Node>

        <Node ref={nvimBadge} x={-760} y={330} opacity={0} scale={0.76}>
          <LogoBadge
            label={'Neovim'}
            accent={'mint'}
            secondaryAccent={'cyan'}
            size={300}
          />
        </Node>
        <Node ref={evilBadge} x={760} y={330} opacity={0} scale={0.76}>
          <LogoBadge
            label={'Doom'}
            accent={'pink'}
            secondaryAccent={'purple'}
            size={300}
          />
        </Node>
        <Line
          ref={bridgeLine}
          points={[
            [-520, 0],
            [520, 0],
          ]}
          y={330}
          stroke={vaporAccentGradient('mint', 'pink')}
          lineWidth={8}
          end={0}
          opacity={0}
        />

        {([
          ['NORMAL', 'motions first', 'mint', -630],
          ['INSERT', 'write text', 'cyan', -210],
          ['motions', 'w b / gg', 'purple', 210],
          ['leader keys', 'SPC menus', 'pink', 630],
        ] as const).map(([title, detail, accent, x]) => (
          <Node ref={modalCards} opacity={0} y={42} scale={0.86}>
            <NeonCard
              {...compactCardText}
              title={title}
              detail={detail}
              accent={accent}
              variant={'compact'}
              width={390}
              height={148}
              x={x}
              y={700}
            />
          </Node>
        ))}
      </Node>

      <Node ref={sections} opacity={0}>
        <Txt
          ref={finalQuestion}
          text={'CAN DOOM EMACS\nFEEL LIKE A NOTES APP?'}
          y={-470}
          width={2440}
          textWrap
          textAlign={'center'}
          fontFamily={vaporFont}
          fontSize={94}
          lineHeight={108}
          fontWeight={800}
          fill={vaporPalette.text}
          letterSpacing={4}
          opacity={0}
        />
        <Line
          ref={finalRule}
          points={[
            [-620, 0],
            [620, 0],
          ]}
          y={-210}
          stroke={vaporAccentGradient('mint', 'pink')}
          lineWidth={12}
          end={0}
        />

        {([
          ['Doom Emacs', 'configured base', 'pink', -520],
          ['Org mode', 'notes engine', 'mint', 0],
          ['Evil mode', 'vim controls', 'cyan', 520],
        ] as const).map(([title, detail, accent, x]) => (
          <Node ref={finalStackCards} opacity={0} y={42} scale={0.86}>
            <NeonCard
              {...compactCardText}
              title={title}
              detail={detail}
              accent={accent}
              variant={'compact'}
              width={500}
              height={156}
              x={x}
              y={20}
            />
          </Node>
        ))}

        {([
          ['serious notes app\nfor Neovim users?', 'mint', -560],
          ['or just too much\nEmacs?', 'amber', 560],
        ] as const).map(([title, accent, x]) => (
          <Node ref={finalChoices} opacity={0} y={54} scale={0.88}>
            <NeonCard
              {...verdictCardText}
              title={title}
              accent={accent}
              variant={'verdict'}
              width={920}
              height={280}
              x={x}
              y={420}
            />
          </Node>
        ))}
      </Node>
    </VaporScene>,
  );

  yield* all(
    delay(
      0,
      all(
        scanLine().opacity(0.86, 0.5, easeOutCubic),
        scanLine().end(1, 0.8, easeInOutCubic),
        setChapter(chapterText(), chapterRule(), 'part 00 / trying emacs'),
        revealUp(sections[0]),
      ),
    ),
    delay(
      0.18,
      all(
        revealText(introTitle()),
        introRule().end(1, 0.58, easeOutCubic),
      ),
    ),
    delay(cue.finally, softPulse(introTitle(), 1.035, 0.14, 0.18)),
    delay(cue.suggestions, staggerReveal(suggestionCards, 0.12, 0.34)),
    delay(
      cue.tryEmacs,
      all(
        showFixed(introTerminal()),
        typeText(introProgress, introCommand.length, 1.1),
        delay(0.32, sweepAcross(introSweep(), -1160, 1160, 1.0)),
      ),
    ),
    delay(cue.context - 0.32, hideUp(sections[0], 0.32, 26)),

    delay(
      cue.context,
      all(
        setChapter(chapterText(), chapterRule(), 'part 01 / what is emacs'),
        revealUp(sections[1]),
      ),
    ),
    delay(cue.oldSchool, all(showFixed(emacsBadge()), revealText(contextTitle()))),
    delay(cue.oldSchool + 0.28, contextSubtitle().opacity(1, 0.42, easeOutCubic)),
    delay(cue.normalEditor, staggerReveal([normalEditorCard()], 0.1, 0.34)),
    delay(
      cue.workspace,
      all(
        workspaceRule().opacity(1, 0.2, easeOutCubic),
        workspaceRule().end(1, 0.58, easeOutCubic),
        delay(0.22, staggerReveal(workspaceCards, 0.12, 0.34)),
      ),
    ),
    delay(cue.doom - 0.32, hideUp(sections[1], 0.32, 28)),

    delay(
      cue.doom,
      all(
        setChapter(chapterText(), chapterRule(), 'part 02 / doom emacs'),
        revealUp(sections[2]),
        showFixed(doomBadge()),
        revealText(doomTitle()),
      ),
    ),
    delay(
      cue.doom + 0.64,
      all(
        showFixed(doomPipeline()),
        doomPipelineProgress().end(1, 1.4, easeInOutCubic),
      ),
    ),
    delay(
      cue.preconfigured,
      all(
        staggerReveal(doomCards, 0.1, 0.34),
        showFixed(doomTerminal()),
        typeText(doomProgress, doomCommand.length, 1.0),
        delay(0.34, sweepAcross(doomSweep(), -1000, 1000, 1.0)),
      ),
    ),
    delay(cue.org - 0.34, hideUp(sections[2], 0.34, 28)),

    delay(
      cue.org,
      all(
        setChapter(chapterText(), chapterRule(), 'part 03 / org mode'),
        revealUp(sections[3]),
        revealText(orgTitle()),
        showFixed(orgTerminal()),
        delay(0.28, sweepAcross(orgSweep(), -1010, 1010, 1.1)),
      ),
    ),
    delay(cue.obsidianLogseq, staggerReveal(compareCards, 0.12, 0.34)),
    delay(cue.obsidianLogseq + 4.8, staggerReveal(orgDetailCards, 0.14, 0.36)),
    delay(
      cue.orgFiles,
      all(
        showFixed(orgFileBadge()),
        delay(
          0.34,
          sequence(
            0.1,
            ...orgDetailCards.map(card => softPulse(card, 1.04, 0.14, 0.18)),
          ),
        ),
      ),
    ),
    delay(cue.evil - 0.24, hideUp(sections[3], 0.28, 24)),

    delay(
      cue.evil,
      all(
        setChapter(chapterText(), chapterRule(), 'part 04 / evil mode'),
        revealUp(sections[4]),
        revealText(evilTitle()),
        showFixed(evilTerminal()),
      ),
    ),
    delay(
      cue.vim,
      all(
        showFixed(nvimBadge()),
        showFixed(evilBadge()),
        bridgeLine().opacity(1, 0.2, easeOutCubic),
        bridgeLine().end(1, 0.64, easeOutCubic),
      ),
    ),
    delay(cue.modal, staggerReveal(modalCards, 0.1, 0.34)),
    delay(cue.question - 0.32, hideUp(sections[4], 0.32, 28)),

    delay(
      cue.question,
      all(
        setChapter(chapterText(), chapterRule(), 'part 05 / the test'),
        revealUp(sections[5]),
        revealText(finalQuestion()),
        finalRule().end(1, 0.64, easeOutCubic),
      ),
    ),
    delay(cue.question + 0.8, staggerReveal(finalStackCards, 0.12, 0.34)),
    delay(
      cue.serious,
      sequence(
        0.08,
        ...finalChoices.slice(0, 1).map(card =>
          all(
            card.opacity(1, 0.34, easeOutCubic),
            card.y(0, 0.34, easeOutBack),
            card.scale(1, 0.34, easeOutBack),
          ),
        ),
      ),
    ),
    delay(
      cue.tooMuch,
      all(
        finalChoices[1].opacity(1, 0.34, easeOutCubic),
        finalChoices[1].y(0, 0.34, easeOutBack),
        finalChoices[1].scale(1, 0.34, easeOutBack),
        delay(0.54, softPulse(finalChoices[1], 1.04, 0.14, 0.18)),
      ),
    ),
    delay(
      endTime - 1.2,
      all(
        scanLine().y(sceneSize.height / 2 - 134, 1.1, easeInOutSine),
        scanLine().opacity(0, 1.1, easeOutCubic),
      ),
    ),
    waitFor(endTime),
  );
});
