import {
  Circle,
  Gradient,
  Img,
  Layout,
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

const uiFont = 'Hurmit Nerd Font Mono';

export default makeScene2D(function* (view) {
  const palette = {
    bgA: '#0b0f12',
    bgB: '#15191e',
    bgC: '#20211d',
    panel: 'rgba(18, 23, 29, 0.92)',
    panelDeep: 'rgba(8, 12, 16, 0.88)',
    text: '#f6f1df',
    muted: 'rgba(246, 241, 223, 0.68)',
    dim: 'rgba(246, 241, 223, 0.32)',
    purple: '#9b7cff',
    blue: '#3fb7e6',
    green: '#68d391',
    amber: '#f4b860',
    red: '#ff6d7a',
    line: 'rgba(246, 241, 223, 0.12)',
  };

  const bgFill = new Gradient({
    type: 'linear',
    from: [-1720, -720],
    to: [1720, 720],
    stops: [
      {offset: 0, color: palette.bgA},
      {offset: 0.54, color: palette.bgB},
      {offset: 1, color: palette.bgC},
    ],
  });

  const accentFill = new Gradient({
    type: 'linear',
    from: [-240, 0],
    to: [240, 0],
    stops: [
      {offset: 0, color: palette.blue},
      {offset: 0.48, color: palette.green},
      {offset: 1, color: palette.amber},
    ],
  });

  const obsidianFill = new Gradient({
    type: 'linear',
    from: [-180, -180],
    to: [180, 180],
    stops: [
      {offset: 0, color: 'rgba(155, 124, 255, 0.26)'},
      {offset: 1, color: 'rgba(63, 183, 230, 0.12)'},
    ],
  });

  const neorgFill = new Gradient({
    type: 'linear',
    from: [-180, -180],
    to: [180, 180],
    stops: [
      {offset: 0, color: 'rgba(63, 183, 230, 0.24)'},
      {offset: 0.62, color: 'rgba(104, 211, 145, 0.16)'},
      {offset: 1, color: 'rgba(155, 124, 255, 0.12)'},
    ],
  });

  const sections = createRefArray<Node>();
  const gridLines = createRefArray<Line>();
  const introCards = createRefArray<Node>();
  const featureCards = createRefArray<Node>();
  const candidateCards = createRefArray<Node>();
  const warningCards = createRefArray<Node>();
  const finalKeywords = createRefArray<Node>();
  const finalLines = createRefArray<Line>();

  const chapterText = createRef<Txt>();
  const chapterRule = createRef<Line>();
  const mainTitle = createRef<Txt>();
  const mainRule = createRef<Line>();
  const obsidianLogo = createRef<Node>();
  const obsidianPulse = createRef<Circle>();
  const pluginRing = createRef<Circle>();
  const neorgLogo = createRef<Node>();
  const terminalPanel = createRef<Node>();
  const terminalSweep = createRef<Rect>();
  const terminalProgress = createSignal(0);
  const warningPulse = createRef<Line>();
  const finalPanel = createRef<Node>();
  const finalLogo = createRef<Node>();
  const finalLogoPulse = createRef<Circle>();
  const scanLine = createRef<Line>();

  const command = 'nvim ~/notes/opensource/neorg-test.norg';

  function* setChapter(text: string) {
    chapterText().text(text);
    chapterRule().end(0);
    yield* chapterRule().end(1, 0.44, easeOutCubic);
  }

  function* showSection(node: Node) {
    node.opacity(0);
    node.y(48);
    node.scale(0.97);
    yield* all(
      node.opacity(1, 0.46, easeOutCubic),
      node.y(0, 0.46, easeOutCubic),
      node.scale(1, 0.46, easeOutBack),
    );
  }

  function* hideSection(node: Node) {
    yield* all(
      node.opacity(0, 0.34, easeOutCubic),
      node.y(-36, 0.34, easeOutCubic),
      node.scale(0.985, 0.34, easeOutCubic),
    );
  }

  view.add(
    <>
      <Rect width={'100%'} height={'100%'} fill={bgFill} />

      {[-1548, -1032, -516, 0, 516, 1032, 1548].map(x => (
        <Line
          ref={gridLines}
          points={[
            [x, -720],
            [x, 720],
          ]}
          stroke={palette.line}
          lineWidth={2}
          opacity={0}
          end={0}
        />
      ))}
      {[-560, -320, -80, 160, 400, 640].map(y => (
        <Line
          ref={gridLines}
          points={[
            [-1720, y],
            [1720, y],
          ]}
          stroke={palette.line}
          lineWidth={2}
          opacity={0}
          end={0}
        />
      ))}

      <Line
        ref={scanLine}
        points={[
          [-1500, 0],
          [1500, 0],
        ]}
        y={-586}
        stroke={accentFill}
        lineWidth={5}
        opacity={0}
        end={0}
      />

      <Layout
        layout
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        width={3040}
        y={-642}
      >
        <Layout layout direction={'row'} alignItems={'center'} gap={22}>
          <Rect
            width={22}
            height={22}
            radius={5}
            fill={palette.green}
            rotation={45}
          />
          <Txt
            text={'open-source alternatives'}
            fontFamily={uiFont}
            fontSize={34}
            fontWeight={700}
            fill={palette.text}
          />
        </Layout>
        <Txt
          text={'episode://neorg'}
          fontFamily={uiFont}
          fontSize={28}
          fill={palette.muted}
          letterSpacing={3}
        />
      </Layout>

      <Layout
        layout
        direction={'column'}
        alignItems={'start'}
        gap={18}
        width={3040}
        y={-520}
      >
        <Txt
          ref={chapterText}
          text={'part 00 / boot'}
          fontFamily={uiFont}
          fontSize={30}
          fontWeight={700}
          fill={palette.amber}
          letterSpacing={4}
        />
        <Line
          ref={chapterRule}
          points={[
            [-1520, 0],
            [-1040, 0],
          ]}
          stroke={accentFill}
          lineWidth={7}
          end={0}
        />
      </Layout>

      <Node ref={sections} opacity={0}>
        <Node>
          <Txt
            ref={mainTitle}
            text={'REPLACING SOFTWARE\nWITH OPEN SOURCE'}
            y={-160}
            width={2100}
            textWrap
            textAlign={'center'}
            fontFamily={uiFont}
            fontSize={116}
            lineHeight={126}
            fontWeight={800}
            fill={palette.text}
            letterSpacing={8}
            opacity={0}
          />
          <Line
            ref={mainRule}
            points={[
              [-520, 0],
              [520, 0],
            ]}
            y={22}
            stroke={accentFill}
            lineWidth={12}
            end={0}
          />
          {([
            ['notes', palette.purple, -510],
            ['editor', palette.blue, -170],
            ['plugins', palette.green, 170],
            ['workflow', palette.amber, 510],
          ] as const).map(([label, color, x]) => (
            <Node ref={introCards} opacity={0} y={42} scale={0.86}>
              <Rect
                layout
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={10}
                width={302}
                height={116}
                x={x}
                y={190}
                radius={14}
                fill={palette.panel}
                stroke={color}
                lineWidth={3}
              >
                <Txt
                  text={label}
                  fontFamily={uiFont}
                  fontSize={34}
                  fontWeight={700}
                  fill={palette.text}
                />
                <Rect
                  width={34}
                  height={7}
                  radius={6}
                  fill={color}
                />
              </Rect>
            </Node>
          ))}
        </Node>
      </Node>

      <Node ref={sections} opacity={0}>
        <Node y={-8}>
          <Node ref={obsidianLogo} opacity={0} scale={0.72} x={-1160} y={20}>
            <Circle
              ref={obsidianPulse}
              size={610}
              fill={'rgba(155, 124, 255, 0.08)'}
              stroke={'rgba(155, 124, 255, 0.28)'}
              lineWidth={4}
            />
            <Circle
              ref={pluginRing}
              size={770}
              stroke={'rgba(246, 241, 223, 0.12)'}
              lineWidth={3}
              start={0}
              end={0.68}
              rotation={-26}
            />
            <Rect
              width={500}
              height={500}
              radius={28}
              fill={obsidianFill}
              stroke={'rgba(155, 124, 255, 0.38)'}
              lineWidth={3}
            />
            <Img src={'/icons/obsidian.png'} width={340} height={340} />
            <Txt
              text={'Obsidian'}
              y={332}
              fontFamily={uiFont}
              fontSize={42}
              fontWeight={800}
              fill={palette.text}
            />
          </Node>

          <Txt
            text={'why it is hard to beat'}
            x={540}
            y={-334}
            width={1520}
            textAlign={'left'}
            fontFamily={uiFont}
            fontSize={66}
            fontWeight={800}
            fill={palette.text}
          />
          <Txt
            text={'simple core, huge ecosystem, many note-taking styles'}
            x={540}
            y={-260}
            width={1520}
            textAlign={'left'}
            fontFamily={uiFont}
            fontSize={32}
            fill={palette.muted}
          />

          {([
            ['simplicity', 'clean writing surface', palette.purple, '*', 170, -80],
            ['plugins', 'wide extension range', palette.green, '+', 930, -80],
            ['workflows', 'configure it around you', palette.blue, '#', 170, 142],
            ['styles', 'journals, zettels, docs', palette.amber, '~', 930, 142],
          ] as const).map(([title, detail, color, symbol, x, y]) => (
            <Node ref={featureCards} opacity={0} x={70} scale={0.9}>
              <Rect
                layout
                direction={'row'}
                alignItems={'center'}
                gap={26}
                padding={28}
                width={720}
                height={172}
                x={x}
                y={y}
                radius={14}
                fill={palette.panel}
                stroke={color}
                lineWidth={3}
              >
                <Rect
                  layout
                  width={66}
                  height={66}
                  radius={14}
                  fill={color}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <Txt
                    text={symbol}
                    fontFamily={uiFont}
                    fontSize={36}
                    fontWeight={800}
                    fill={palette.bgA}
                  />
                </Rect>
                <Layout layout direction={'column'} gap={8} width={560}>
                  <Txt
                    text={title}
                    width={560}
                    textWrap
                    textAlign={'left'}
                    fontFamily={uiFont}
                    fontSize={36}
                    lineHeight={42}
                    fontWeight={800}
                    fill={palette.text}
                  />
                  <Txt
                    text={detail}
                    width={560}
                    textWrap
                    textAlign={'left'}
                    fontFamily={uiFont}
                    fontSize={25}
                    lineHeight={34}
                    fill={palette.muted}
                  />
                </Layout>
              </Rect>
            </Node>
          ))}
        </Node>

      </Node>

      <Node ref={sections} opacity={0}>
        <Node y={-8}>
          <Txt
            text={'candidate://neorg'}
            x={-1160}
            y={-372}
            width={820}
            textAlign={'left'}
            fontFamily={uiFont}
            fontSize={34}
            fontWeight={700}
            fill={palette.green}
            letterSpacing={4}
          />
          <Txt
            text={'Neorg lives\ninside Neovim'}
            x={-1160}
            y={-270}
            width={820}
            textWrap
            textAlign={'left'}
            fontFamily={uiFont}
            fontSize={72}
            lineHeight={82}
            fontWeight={800}
            fill={palette.text}
          />
          <Txt
            text={'structured notes, tasks, project writing, all as plaintext'}
            x={-1160}
            y={-112}
            width={820}
            textWrap
            textAlign={'left'}
            fontFamily={uiFont}
            fontSize={30}
            lineHeight={40}
            fill={palette.muted}
          />

          {([
            ['.norg', 'single file format', palette.green, -8],
            ['nvim', 'editor-native notes', palette.blue, 118],
            ['lua', 'plugin ecosystem', palette.purple, 244],
          ] as const).map(([title, detail, color, y]) => (
            <Node ref={candidateCards} opacity={0} y={40} scale={0.86}>
              <Rect
                layout
                direction={'row'}
                alignItems={'center'}
                gap={24}
                padding={26}
                width={820}
                height={104}
                x={-1160}
                y={y}
                radius={14}
                fill={palette.panel}
                stroke={color}
                lineWidth={3}
              >
                <Txt
                  text={title}
                  width={160}
                  textAlign={'left'}
                  fontFamily={uiFont}
                  fontSize={36}
                  lineHeight={42}
                  fontWeight={800}
                  fill={color}
                />
                <Txt
                  text={detail}
                  width={560}
                  textWrap
                  textAlign={'left'}
                  fontFamily={uiFont}
                  fontSize={26}
                  lineHeight={34}
                  fill={palette.muted}
                />
              </Rect>
            </Node>
          ))}

          <Layout
            ref={terminalPanel}
            width={1280}
            height={660}
            clip
            opacity={0}
            scale={0.94}
            x={250}
            y={58}
          >
            <Rect
              width={1280}
              height={660}
              radius={18}
              fill={palette.panelDeep}
              stroke={'rgba(63, 183, 230, 0.36)'}
              lineWidth={3}
              shadowColor={'rgba(0, 0, 0, 0.52)'}
              shadowBlur={70}
            />
            <Layout layout direction={'row'} gap={16} x={-548} y={-288}>
              <Circle size={20} fill={palette.red} />
              <Circle size={20} fill={palette.amber} />
              <Circle size={20} fill={palette.green} />
            </Layout>
            <Txt
              text={'~/notes/opensource'}
              x={270}
              y={-288}
              width={760}
              textAlign={'right'}
              fontFamily={uiFont}
              fontSize={26}
              fill={palette.dim}
              letterSpacing={2}
            />
            <Rect
              ref={terminalSweep}
              width={270}
              height={660}
              x={-820}
              fill={'rgba(63, 183, 230, 0.09)'}
              opacity={0.42}
            />
            <Txt
              text={() =>
                `$ ${command.slice(
                  0,
                  Math.floor(terminalProgress()),
                )}${terminalProgress() < command.length ? '|' : ''}`
              }
              x={0}
              y={-210}
              width={1100}
              textAlign={'left'}
              fontFamily={uiFont}
              fontSize={30}
              lineHeight={40}
              fill={palette.green}
            />
            <Txt
              text={
                '* test notes\n  - Obsidian replacement?\n  - Neorg workspace\n  - direct editor workflow\n\n@code\n  core.defaults\n  core.concealer\n  core.dirman'
              }
              x={0}
              y={92}
              width={1100}
              textAlign={'left'}
              fontFamily={uiFont}
              fontSize={28}
              lineHeight={40}
              fill={palette.text}
            />
          </Layout>

          <Node ref={neorgLogo} opacity={0} scale={0.58} x={1280} y={40}>
            <Circle
              size={610}
              fill={'rgba(63, 183, 230, 0.08)'}
              stroke={'rgba(104, 211, 145, 0.28)'}
              lineWidth={4}
            />
            <Circle
              size={770}
              stroke={'rgba(246, 241, 223, 0.12)'}
              lineWidth={3}
              start={0}
              end={0.68}
              rotation={-26}
            />
            <Rect
              width={500}
              height={500}
              radius={28}
              fill={neorgFill}
              stroke={'rgba(104, 211, 145, 0.38)'}
              lineWidth={3}
            />
            <Img src={'/icons/neorg.png'} width={340} height={340} />
            <Txt
              text={'Neorg'}
              y={332}
              fontFamily={uiFont}
              fontSize={42}
              fontWeight={800}
              fill={palette.text}
            />
          </Node>
        </Node>
      </Node>

      <Node ref={sections} opacity={0}>
        <Node y={-10}>
          <Layout
            layout
            direction={'column'}
            alignItems={'start'}
            gap={28}
            width={1020}
            x={-900}
            y={-96}
          >
            <Txt
              text={'quick warning'}
              fontFamily={uiFont}
              fontSize={92}
              fontWeight={800}
              fill={palette.text}
            />
            <Txt
              text={'This is a promising path, but it assumes you are happy in the editor.'}
              width={940}
              textWrap
              fontFamily={uiFont}
              fontSize={36}
              lineHeight={48}
              fill={palette.muted}
            />
            <Line
              ref={warningPulse}
              points={[
                [-460, 0],
                [460, 0],
              ]}
              stroke={accentFill}
              lineWidth={9}
              end={0}
            />
          </Layout>

          {([
            ['if you use Neovim', 'interesting to try', palette.green, '>', 760, -176],
            ['if you avoid terminals', 'steeper first day', palette.amber, '!', 760, 8],
            ['if you want a GUI twin', 'probably not this one', palette.red, 'x', 760, 192],
          ] as const).map(([title, detail, color, symbol, x, y]) => (
            <Node ref={warningCards} opacity={0} x={88} scale={0.88}>
              <Rect
                layout
                direction={'row'}
                alignItems={'center'}
                gap={28}
                padding={30}
                width={980}
                height={158}
                x={x}
                y={y}
                radius={14}
                fill={palette.panel}
                stroke={color}
                lineWidth={3}
              >
                <Rect
                  layout
                  width={70}
                  height={70}
                  radius={999}
                  fill={color}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <Txt
                    text={symbol}
                    fontFamily={uiFont}
                    fontSize={40}
                    fontWeight={800}
                    fill={palette.bgA}
                  />
                </Rect>
                <Layout layout direction={'column'} gap={8} width={770}>
                  <Txt
                    text={title}
                    width={770}
                    textWrap
                    textAlign={'left'}
                    fontFamily={uiFont}
                    fontSize={32}
                    lineHeight={38}
                    fontWeight={800}
                    fill={palette.text}
                  />
                  <Txt
                    text={detail}
                    width={770}
                    textWrap
                    textAlign={'left'}
                    fontFamily={uiFont}
                    fontSize={25}
                    lineHeight={33}
                    fill={palette.muted}
                  />
                </Layout>
              </Rect>
            </Node>
          ))}
        </Node>
      </Node>

      <Node ref={sections} opacity={0}>
        <Node ref={finalPanel} opacity={0} y={42} scale={0.94}>
          <Rect
            width={2680}
            height={520}
            radius={18}
            fill={palette.panel}
            stroke={'rgba(104, 211, 145, 0.44)'}
            lineWidth={3}
            shadowColor={'rgba(0, 0, 0, 0.5)'}
            shadowBlur={70}
          />
          <Line
            ref={finalLines}
            points={[
              [-1180, -204],
              [1180, -204],
            ]}
            stroke={accentFill}
            lineWidth={7}
            end={0}
          />
          <Line
            ref={finalLines}
            points={[
              [-1180, 204],
              [1180, 204],
            ]}
            stroke={'rgba(246, 241, 223, 0.18)'}
            lineWidth={4}
            end={0}
          />
          <Line
            ref={finalLines}
            points={[
              [-520, -154],
              [-520, 154],
            ]}
            stroke={'rgba(104, 211, 145, 0.34)'}
            lineWidth={4}
            end={0}
          />
          <Node
            ref={finalLogo}
            x={-940}
            opacity={0}
            scale={0.78}
            rotation={-8}
          >
            <Circle
              ref={finalLogoPulse}
              size={410}
              fill={'rgba(104, 211, 145, 0.08)'}
              stroke={'rgba(104, 211, 145, 0.24)'}
              lineWidth={4}
            />
            <Rect
              layout
              width={360}
              height={360}
              radius={28}
              fill={neorgFill}
              stroke={'rgba(104, 211, 145, 0.42)'}
              lineWidth={3}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Img src={'/icons/neorg.png'} width={238} height={238} />
            </Rect>
            <Txt
              text={'NEORG'}
              y={258}
              fontFamily={uiFont}
              fontSize={52}
              fontWeight={800}
              fill={palette.text}
              letterSpacing={8}
            />
          </Node>
          {([
            ['NEOVIM', palette.green, -88, -118, 500],
            ['EDITOR', palette.blue, 486, -118, 500],
            ['NOTES', palette.purple, 1060, -118, 500],
            ['TERMINAL', palette.amber, -88, 118, 500],
            ['PLAINTEXT', palette.green, 486, 118, 500],
            ['TRY IT', palette.text, 1060, 118, 500],
          ] as const).map(([label, color, x, y, width]) => (
            <Node ref={finalKeywords} opacity={0} y={40} scale={0.84}>
              <Rect
                layout
                width={width}
                height={150}
                x={x}
                y={y}
                radius={16}
                fill={'rgba(8, 12, 16, 0.72)'}
                stroke={color}
                lineWidth={3}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Txt
                  text={label}
                  fontFamily={uiFont}
                  fontSize={44}
                  fontWeight={800}
                  fill={color}
                  letterSpacing={4}
                />
              </Rect>
            </Node>
          ))}
        </Node>
      </Node>
    </>,
  );

  yield* all(
    sequence(
      0.04,
      ...gridLines.map(line =>
        all(line.opacity(1, 0.36, easeOutCubic), line.end(1, 0.5, easeOutCubic)),
      ),
    ),
    scanLine().opacity(0.86, 0.5, easeOutCubic),
    scanLine().end(1, 0.8, easeInOutCubic),
  );

  yield* setChapter('part 01 / open source series');
  yield* all(
    showSection(sections[0]),
    delay(
      0.1,
      all(
        mainTitle().opacity(1, 0.62, easeOutCubic),
        mainTitle().letterSpacing(0, 0.62, easeOutCubic),
        mainRule().end(1, 0.72, easeOutCubic),
      ),
    ),
    delay(
      0.54,
      sequence(
        0.1,
        ...introCards.map(card =>
          all(
            card.opacity(1, 0.34, easeOutCubic),
            card.y(0, 0.34, easeOutBack),
            card.scale(1, 0.34, easeOutBack),
          ),
        ),
      ),
    ),
    waitFor(6.24),
  );
  yield* hideSection(sections[0]);

  yield* setChapter('part 02 / the Obsidian problem');
  yield* all(
    showSection(sections[1]),
    delay(
      0.2,
      all(
        obsidianLogo().opacity(1, 0.48, easeOutCubic),
        obsidianLogo().scale(1, 0.58, easeOutBack),
        obsidianLogo().rotation(0, 0.58, easeOutCubic),
        pluginRing().rotation(28, 4.6, easeInOutSine),
      ),
    ),
    delay(
      0.76,
      sequence(
        0.12,
        ...featureCards.map(card =>
          all(
            card.opacity(1, 0.34, easeOutCubic),
            card.x(0, 0.34, easeOutBack),
            card.scale(1, 0.34, easeOutBack),
          ),
        ),
      ),
    ),
    waitFor(2.45),
  );

  yield* all(
    obsidianPulse().scale(1.1, 4.42, easeInOutSine),
    obsidianLogo().y(-8, 2.21, easeInOutSine).to(0, 2.21, easeInOutSine),
    sequence(
      0.14,
      ...featureCards.map(card =>
        card.scale(1.04, 0.16, easeOutCubic).to(1, 0.18, easeOutCubic),
      ),
    ),
    waitFor(4.42),
  );
  yield* hideSection(sections[1]);

  yield* setChapter('part 03 / testing Neorg');
  terminalProgress(0);
  yield* all(
    showSection(sections[2]),
    delay(
      0.15,
      all(
        terminalPanel().opacity(1, 0.48, easeOutCubic),
        terminalPanel().x(180, 0.48, easeOutBack),
        terminalPanel().scale(1, 0.48, easeOutBack),
      ),
    ),
    delay(
      0.34,
      all(
        neorgLogo().opacity(1, 0.38, easeOutCubic),
        neorgLogo().scale(0.72, 0.46, easeOutBack),
      ),
    ),
    delay(
      0.58,
      sequence(
        0.1,
        ...candidateCards.map(card =>
          all(
            card.opacity(1, 0.3, easeOutCubic),
            card.y(0, 0.3, easeOutBack),
            card.scale(1, 0.3, easeOutBack),
          ),
        ),
      ),
    ),
    delay(0.78, terminalProgress(command.length, 1.45, easeOutCubic)),
    delay(1.0, terminalSweep().x(820, 1.2, easeInOutCubic)),
    waitFor(5.22),
  );
  yield* hideSection(sections[2]);

  yield* setChapter('part 04 / before you try it');
  yield* all(
    showSection(sections[3]),
    delay(0.2, warningPulse().end(1, 0.62, easeOutCubic)),
    delay(
      0.42,
      sequence(
        0.12,
        ...warningCards.map(card =>
          all(
            card.opacity(1, 0.32, easeOutCubic),
            card.x(0, 0.32, easeOutBack),
            card.scale(1, 0.32, easeOutBack),
          ),
        ),
      ),
    ),
    waitFor(4.35),
  );

  yield* all(
    warningCards[1].scale(1.04, 0.18, easeOutCubic).to(1, 0.22, easeOutCubic),
    warningCards[2].scale(1.04, 0.18, easeOutCubic).to(1, 0.22, easeOutCubic),
    waitFor(4.4),
  );

  yield* waitFor(2.47);
  yield* hideSection(sections[3]);

  yield* setChapter('part 05 / verdict');
  yield* all(
    showSection(sections[4]),
    delay(
      0.12,
      all(
        finalPanel().opacity(1, 0.48, easeOutCubic),
        finalPanel().y(0, 0.48, easeOutBack),
        finalPanel().scale(1, 0.48, easeOutBack),
      ),
    ),
    delay(
      0.22,
      all(
        finalLogo().opacity(1, 0.42, easeOutCubic),
        finalLogo().scale(1, 0.52, easeOutBack),
        finalLogo().rotation(0, 0.52, easeOutCubic),
      ),
    ),
    delay(
      0.34,
      sequence(
        0.12,
        ...finalLines.map(line => line.end(1, 0.46, easeOutCubic)),
      ),
    ),
    delay(
      0.56,
      sequence(
        0.12,
        ...finalKeywords.map(keyword =>
          all(
            keyword.opacity(1, 0.34, easeOutCubic),
            keyword.y(0, 0.34, easeOutBack),
            keyword.scale(1, 0.34, easeOutBack),
          ),
        ),
      ),
    ),
    delay(
      2.1,
      sequence(
        0.08,
        ...finalKeywords.map(keyword =>
          keyword.scale(1.06, 0.16, easeOutCubic).to(1, 0.2, easeOutCubic),
        ),
      ),
    ),
    finalLogoPulse().scale(1.12, 6.2, easeInOutSine),
    finalLogo().y(-10, 3.1, easeInOutSine).to(0, 3.1, easeInOutSine),
    waitFor(6.41),
  );

  yield* all(
    scanLine().y(586, 1.15, easeInOutCubic),
    scanLine().opacity(0, 1.15, easeOutCubic),
    waitFor(1.1),
  );
});
