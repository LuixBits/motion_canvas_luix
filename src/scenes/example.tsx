import {
  Circle,
  Gradient,
  Layout,
  Line,
  Node,
  Rect,
  Txt,
  blur,
  makeScene2D,
} from '@motion-canvas/2d';
import {
  all,
  createRef,
  createSignal,
  delay,
  easeInOutCubic,
  easeInOutSine,
  easeOutBack,
  easeOutCubic,
  sequence,
} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const uiFont = 'Hurmit Nerd Font Mono';

  const palette = {
    bgTop: '#2b003f',
    bgMid: '#060012',
    bgBottom: '#030008',
    cardText: '#f8e9ff',
    cardMuted: 'rgba(248, 233, 255, 0.78)',
    prompt: '#a786ff',
    hotPink: '#ff5da2',
    neonPink: '#ff89ff',
    softPink: '#ffbdde',
    teal: '#8afff7',
  };

  const greetingText = 'hello && welcome';
  const missionText = 'replace(my_apps, open_source);';

  const greetingProgress = createSignal(0);
  const missionProgress = createSignal(0);

  const topGlow = createRef<Circle>();
  const traceTop = createRef<Line>();
  const traceBottom = createRef<Line>();
  const ambientLeft = createRef<Rect>();
  const ambientRight = createRef<Rect>();
  const shell = createRef<Layout>();
  const footerGlow = createRef<Line>();
  const welcome = createRef<Txt>();
  const title = createRef<Txt>();
  const titleUnderline = createRef<Line>();
  const terminalPanel = createRef<Node>();
  const terminalSweep = createRef<Rect>();
  const card1 = createRef<Node>();
  const card2 = createRef<Node>();
  const card3 = createRef<Node>();
  const badgeLinux = createRef<Node>();
  const badgeOpen = createRef<Node>();
  const badgeSwitch = createRef<Node>();
  const progressPanel = createRef<Node>();
  const progressFill = createRef<Line>();
  const progressDot = createRef<Circle>();
  const sweep = createRef<Rect>();

  const backgroundFill = new Gradient({
    type: 'linear',
    from: [-1440, -900],
    to: [1440, 900],
    stops: [
      {offset: 0, color: palette.bgTop},
      {offset: 0.62, color: palette.bgMid},
      {offset: 1, color: palette.bgBottom},
    ],
  });

  const terminalFill = new Gradient({
    type: 'linear',
    from: [-1100, -500],
    to: [1100, 500],
    stops: [
      {offset: 0, color: 'rgba(18, 8, 48, 0.96)'},
      {offset: 1, color: 'rgba(66, 16, 102, 0.9)'},
    ],
  });

  const sweepFill = new Gradient({
    type: 'linear',
    from: [-230, 0],
    to: [230, 0],
    stops: [
      {offset: 0, color: 'rgba(255, 137, 255, 0)'},
      {offset: 0.4, color: 'rgba(255, 137, 255, 0.28)'},
      {offset: 0.62, color: 'rgba(138, 255, 247, 0.22)'},
      {offset: 1, color: 'rgba(138, 255, 247, 0)'},
    ],
  });

  const titleFill = new Gradient({
    type: 'linear',
    from: [-580, 0],
    to: [580, 0],
    stops: [
      {offset: 0, color: palette.cardText},
      {offset: 0.45, color: palette.softPink},
      {offset: 1, color: palette.teal},
    ],
  });

  const accentFill = new Gradient({
    type: 'linear',
    from: [-220, 0],
    to: [220, 0],
    stops: [
      {offset: 0, color: palette.hotPink},
      {offset: 0.55, color: palette.softPink},
      {offset: 1, color: palette.teal},
    ],
  });

  const terminalFlash = new Gradient({
    type: 'linear',
    from: [-150, 0],
    to: [150, 0],
    stops: [
      {offset: 0, color: 'rgba(255, 137, 255, 0)'},
      {offset: 0.5, color: 'rgba(255, 137, 255, 0.22)'},
      {offset: 1, color: 'rgba(138, 255, 247, 0)'},
    ],
  });

  view.add(
    <>
      <Rect width={'100%'} height={'100%'} fill={backgroundFill} />
      <Circle
        ref={topGlow}
        size={840}
        y={-760}
        fill={palette.neonPink}
        opacity={0.18}
        filters={[blur(260)]}
      />
      <Rect
        ref={ambientLeft}
        size={760}
        x={-1080}
        y={-480}
        radius={999}
        fill={palette.hotPink}
        opacity={0.24}
        filters={[blur(240)]}
      />
      <Rect
        ref={ambientRight}
        size={900}
        x={980}
        y={540}
        radius={999}
        fill={palette.teal}
        opacity={0.16}
        filters={[blur(280)]}
      />
      <Line
        ref={traceTop}
        points={[
          [-1300, -700],
          [1250, -780],
        ]}
        stroke={'rgba(255, 137, 255, 0.36)'}
        lineWidth={6}
        end={0}
      />
      <Line
        ref={traceBottom}
        points={[
          [-1180, 760],
          [1180, 690],
        ]}
        stroke={'rgba(138, 255, 247, 0.3)'}
        lineWidth={6}
        end={0}
      />
      <Layout
        ref={shell}
        width={2200}
        height={980}
        clip
        y={58}
        rotation={-1.5}
        opacity={0}
        scale={0.9}
      >
        <Rect
          width={'100%'}
          height={'100%'}
          radius={48}
          fill={terminalFill}
          stroke={'rgba(255, 137, 255, 0.25)'}
          lineWidth={4}
          shadowColor={'rgba(8, 0, 24, 0.8)'}
          shadowBlur={120}
        />
        <Rect
          width={'100%'}
          height={'100%'}
          radius={48}
          lineWidth={2}
          stroke={'rgba(255, 255, 255, 0.06)'}
        />
        <Rect
          ref={sweep}
          width={520}
          height={1240}
          rotation={16}
          x={-1660}
          opacity={0.22}
          fill={sweepFill}
        />
        <Line
          ref={footerGlow}
          points={[
            [-960, 0],
            [960, 0],
          ]}
          y={426}
          lineWidth={8}
          stroke={accentFill}
          end={0}
          opacity={0.78}
        />
        <Layout
          layout
          direction={'column'}
          alignItems={'start'}
          justifyContent={'space-between'}
          width={1880}
          height={780}
        >
          <Layout
            layout
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'100%'}
          >
            <Layout layout direction={'row'} gap={20} alignItems={'center'}>
              <Circle size={18} fill={palette.hotPink} />
              <Circle size={18} fill={palette.softPink} />
              <Circle size={18} fill={palette.teal} />
            </Layout>
            <Txt
              text={'trace://open_source'}
              fontFamily={uiFont}
              fontSize={30}
              letterSpacing={6}
              fill={palette.prompt}
            />
          </Layout>

          <Layout
            layout
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'start'}
            width={'100%'}
          >
            <Layout
              layout
              direction={'column'}
              alignItems={'start'}
              gap={28}
              width={1180}
            >
              <Txt
                ref={welcome}
                text={'series://01'}
                fontFamily={uiFont}
                fontSize={34}
                fontWeight={700}
                letterSpacing={5}
                fill={palette.prompt}
                opacity={0}
                y={8}
              />
              <Txt
                ref={title}
                width={1140}
                textWrap={true}
                text={'OPEN_SOURCE\nALTERNATIVES'}
                fontFamily={uiFont}
                fontSize={122}
                fontWeight={800}
                letterSpacing={10}
                lineHeight={130}
                fill={titleFill}
                shadowColor={'rgba(255, 137, 255, 0.35)'}
                shadowBlur={30}
                opacity={0}
                y={10}
              />
              <Line
                ref={titleUnderline}
                points={[
                  [-540, 0],
                  [540, 0],
                ]}
                lineWidth={12}
                stroke={accentFill}
                end={0}
              />

              <Node ref={terminalPanel} opacity={0} y={18} scale={0.96}>
                <Rect
                  width={1160}
                  height={220}
                  radius={30}
                  fill={'rgba(7, 0, 24, 0.58)'}
                  stroke={'rgba(255,255,255,0.08)'}
                  lineWidth={2}
                />
                <Rect
                  ref={terminalSweep}
                  width={320}
                  height={220}
                  x={-760}
                  opacity={0.28}
                  fill={terminalFlash}
                />
                <Txt
                  text={'boot://intro'}
                  fontFamily={uiFont}
                  fontSize={24}
                  letterSpacing={6}
                  fill={palette.prompt}
                  y={-72}
                />
                <Layout
                  layout
                  direction={'column'}
                  alignItems={'start'}
                  gap={16}
                  width={1040}
                  y={12}
                >
                  <Layout layout direction={'row'} alignItems={'start'} gap={18}>
                    <Txt
                      text={'$'}
                      fontFamily={uiFont}
                      fontSize={34}
                      fill={palette.hotPink}
                    />
                    <Txt
                      width={950}
                      textWrap={true}
                      text={() =>
                        `${greetingText.slice(
                          0,
                          Math.floor(greetingProgress()),
                        )}${greetingProgress() < greetingText.length ? '█' : ''}`
                      }
                      fontFamily={uiFont}
                      fontSize={32}
                      lineHeight={42}
                      fill={palette.cardText}
                    />
                  </Layout>
                  <Layout layout direction={'row'} alignItems={'start'} gap={18}>
                    <Txt
                      text={'>'}
                      fontFamily={uiFont}
                      fontSize={34}
                      fill={palette.teal}
                    />
                    <Txt
                      width={950}
                      textWrap={true}
                      text={() =>
                        `${missionText.slice(
                          0,
                          Math.floor(missionProgress()),
                        )}${missionProgress() < missionText.length ? '█' : ''}`
                      }
                      fontFamily={uiFont}
                      fontSize={30}
                      lineHeight={40}
                      fill={palette.cardMuted}
                    />
                  </Layout>
                </Layout>
              </Node>
            </Layout>

            <Layout layout direction={'column'} gap={18} alignItems={'end'}>
              <Node
                ref={card1}
                opacity={0}
                x={60}
                scale={0.84}
                rotation={-6}
              >
                <Rect
                  width={520}
                  height={168}
                  radius={28}
                  fill={'rgba(12, 6, 40, 0.74)'}
                  stroke={'rgba(255, 93, 162, 0.36)'}
                  lineWidth={2}
                />
                <Rect
                  width={10}
                  height={92}
                  radius={999}
                  x={-222}
                  fill={palette.hotPink}
                  shadowColor={'rgba(255, 93, 162, 0.7)'}
                  shadowBlur={24}
                />
                <Txt
                  text={'cfg://targets'}
                  x={-36}
                  y={-50}
                  fontFamily={uiFont}
                  fontSize={24}
                  letterSpacing={4}
                  fill={palette.hotPink}
                />
                <Txt
                  text={'browser = open;\neditor  = open;\nnotes   = open;'}
                  width={360}
                  x={10}
                  y={18}
                  textAlign={'left'}
                  fontFamily={uiFont}
                  fontSize={28}
                  lineHeight={40}
                  fill={palette.cardText}
                />
                <Txt
                  text={'01'}
                  x={196}
                  y={-52}
                  fontFamily={uiFont}
                  fontSize={24}
                  letterSpacing={4}
                  fill={palette.hotPink}
                />
              </Node>

              <Node
                ref={card2}
                opacity={0}
                x={60}
                scale={0.84}
                rotation={4}
              >
                <Rect
                  width={500}
                  height={164}
                  radius={28}
                  fill={'rgba(10, 10, 36, 0.72)'}
                  stroke={'rgba(138, 255, 247, 0.34)'}
                  lineWidth={2}
                />
                <Rect
                  width={10}
                  height={88}
                  radius={999}
                  x={-212}
                  fill={palette.teal}
                  shadowColor={'rgba(138, 255, 247, 0.7)'}
                  shadowBlur={24}
                />
                <Txt
                  text={'ops://queue'}
                  x={-42}
                  y={-48}
                  fontFamily={uiFont}
                  fontSize={24}
                  letterSpacing={4}
                  fill={palette.teal}
                />
                <Txt
                  text={'audit();\nreplace();\nverify();'}
                  width={280}
                  x={0}
                  y={18}
                  textAlign={'left'}
                  fontFamily={uiFont}
                  fontSize={30}
                  lineHeight={42}
                  fill={palette.cardText}
                />
                <Txt
                  text={'02'}
                  x={184}
                  y={-50}
                  fontFamily={uiFont}
                  fontSize={24}
                  letterSpacing={4}
                  fill={palette.teal}
                />
              </Node>

              <Node
                ref={card3}
                opacity={0}
                x={60}
                scale={0.84}
                rotation={-5}
              >
                <Rect
                  width={540}
                  height={172}
                  radius={28}
                  fill={'rgba(14, 8, 44, 0.74)'}
                  stroke={'rgba(255, 189, 222, 0.34)'}
                  lineWidth={2}
                />
                <Rect
                  width={10}
                  height={96}
                  radius={999}
                  x={-232}
                  fill={palette.softPink}
                  shadowColor={'rgba(255, 189, 222, 0.7)'}
                  shadowBlur={24}
                />
                <Txt
                  text={'stack://next'}
                  x={-54}
                  y={-50}
                  fontFamily={uiFont}
                  fontSize={24}
                  letterSpacing={4}
                  fill={palette.softPink}
                />
                <Txt
                  text={'mail    -> ?\nmedia   -> ?\npassword-> ?'}
                  width={320}
                  x={0}
                  y={22}
                  textAlign={'left'}
                  fontFamily={uiFont}
                  fontSize={28}
                  lineHeight={40}
                  fill={palette.cardText}
                />
                <Txt
                  text={'03'}
                  x={206}
                  y={-52}
                  fontFamily={uiFont}
                  fontSize={24}
                  letterSpacing={4}
                  fill={palette.softPink}
                />
              </Node>
            </Layout>
          </Layout>

          <Layout
            layout
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'100%'}
          >
            <Layout layout direction={'row'} gap={18} alignItems={'center'}>
              <Node ref={badgeLinux} opacity={0} y={18} scale={0.72}>
                <Rect
                  width={220}
                  height={82}
                  radius={999}
                  fill={'rgba(138, 255, 247, 0.14)'}
                  stroke={'rgba(138, 255, 247, 0.45)'}
                  lineWidth={2}
                />
                <Txt
                  text={'linux'}
                  fontFamily={uiFont}
                  fontSize={30}
                  letterSpacing={6}
                  fill={palette.teal}
                />
              </Node>

              <Node ref={badgeOpen} opacity={0} y={18} scale={0.72}>
                <Rect
                  width={220}
                  height={82}
                  radius={999}
                  fill={'rgba(255, 137, 255, 0.12)'}
                  stroke={'rgba(255, 137, 255, 0.38)'}
                  lineWidth={2}
                />
                <Txt
                  text={'oss'}
                  fontFamily={uiFont}
                  fontSize={30}
                  letterSpacing={5}
                  fill={palette.softPink}
                />
              </Node>

              <Node ref={badgeSwitch} opacity={0} y={18} scale={0.72}>
                <Rect
                  width={220}
                  height={82}
                  radius={999}
                  fill={'rgba(255, 255, 255, 0.08)'}
                  stroke={'rgba(255, 255, 255, 0.14)'}
                  lineWidth={2}
                />
                <Txt
                  text={'swap'}
                  fontFamily={uiFont}
                  fontSize={30}
                  letterSpacing={5}
                  fill={palette.cardText}
                />
              </Node>
            </Layout>

            <Node ref={progressPanel} opacity={0} x={40} scale={0.92}>
              <Rect
                width={560}
                height={104}
                radius={999}
                fill={'rgba(8, 0, 26, 0.62)'}
                stroke={'rgba(255,255,255,0.08)'}
                lineWidth={2}
              />
              <Txt
                text={'scan://87%'}
                y={-22}
                fontFamily={uiFont}
                fontSize={24}
                letterSpacing={5}
                fill={palette.prompt}
              />
              <Line
                points={[
                  [-170, 20],
                  [170, 20],
                ]}
                stroke={'rgba(255, 255, 255, 0.16)'}
                lineWidth={12}
              />
              <Line
                ref={progressFill}
                points={[
                  [-170, 20],
                  [170, 20],
                ]}
                stroke={accentFill}
                lineWidth={12}
                end={0}
              />
              <Circle
                ref={progressDot}
                size={20}
                x={-170}
                y={20}
                fill={palette.cardText}
                opacity={0}
              />
            </Node>
          </Layout>
        </Layout>
      </Layout>
    </>,
  );

  yield* all(
    ambientLeft().x(-820, 6, easeInOutSine),
    ambientRight().x(720, 6, easeInOutSine),
    topGlow().scale(1.08, 6, easeInOutSine),
    all(
      shell().opacity(1, 0.7, easeOutCubic),
      shell().scale(1, 0.7, easeOutBack),
      shell().rotation(0, 0.7, easeOutCubic),
      shell().y(0, 0.7, easeOutCubic),
      delay(0.1, traceTop().end(1, 0.8, easeInOutCubic)),
      delay(0.16, traceBottom().end(1, 0.8, easeInOutCubic)),
      delay(0.32, footerGlow().end(1, 0.65, easeOutCubic)),
      delay(
        0.42,
        all(
          welcome().opacity(1, 0.45, easeOutCubic),
          welcome().y(0, 0.45, easeOutCubic),
        ),
      ),
      delay(
        0.54,
        all(
          title().opacity(1, 0.7, easeOutCubic),
          title().y(0, 0.7, easeOutCubic),
          title().letterSpacing(0, 0.7, easeOutCubic),
          titleUnderline().end(1, 0.75, easeOutCubic),
        ),
      ),
      delay(
        0.78,
        all(
          terminalPanel().opacity(1, 0.5, easeOutCubic),
          terminalPanel().scale(1, 0.55, easeOutBack),
          terminalPanel().y(0, 0.55, easeOutCubic),
        ),
      ),
      delay(0.94, terminalSweep().x(760, 1.1, easeInOutCubic)),
      delay(1.0, greetingProgress(greetingText.length, 0.9, easeOutCubic)),
      delay(1.56, missionProgress(missionText.length, 1.35, easeOutCubic)),
      delay(
        0.98,
        sequence(
          0.12,
          all(
            card1().opacity(1, 0.42, easeOutCubic),
            card1().x(0, 0.42, easeOutBack),
            card1().rotation(0, 0.42, easeOutCubic),
            card1().scale(1, 0.42, easeOutBack),
          ),
          all(
            card2().opacity(1, 0.42, easeOutCubic),
            card2().x(0, 0.42, easeOutBack),
            card2().rotation(0, 0.42, easeOutCubic),
            card2().scale(1, 0.42, easeOutBack),
          ),
          all(
            card3().opacity(1, 0.42, easeOutCubic),
            card3().x(0, 0.42, easeOutBack),
            card3().rotation(0, 0.42, easeOutCubic),
            card3().scale(1, 0.42, easeOutBack),
          ),
        ),
      ),
      delay(
        1.72,
        sequence(
          0.1,
          all(
            badgeLinux().opacity(1, 0.35, easeOutCubic),
            badgeLinux().y(0, 0.35, easeOutBack),
            badgeLinux().scale(1, 0.35, easeOutBack),
          ),
          all(
            badgeOpen().opacity(1, 0.35, easeOutCubic),
            badgeOpen().y(0, 0.35, easeOutBack),
            badgeOpen().scale(1, 0.35, easeOutBack),
          ),
          all(
            badgeSwitch().opacity(1, 0.35, easeOutCubic),
            badgeSwitch().y(0, 0.35, easeOutBack),
            badgeSwitch().scale(1, 0.35, easeOutBack),
          ),
        ),
      ),
      delay(
        1.86,
        all(
          progressPanel().opacity(1, 0.45, easeOutCubic),
          progressPanel().x(0, 0.45, easeOutBack),
          progressPanel().scale(1, 0.45, easeOutBack),
        ),
      ),
      delay(
        2.02,
        all(
          progressFill().end(0.88, 1.5, easeInOutCubic),
          progressDot().opacity(1, 0.2, easeOutCubic),
          progressDot().x(129, 1.5, easeInOutCubic),
        ),
      ),
      delay(2.18, sweep().x(1600, 1.05, easeInOutCubic)),
      delay(
        3.46,
        sequence(
          0.08,
          card1().scale(1.05, 0.16, easeOutCubic).to(1, 0.16, easeOutCubic),
          card2().scale(1.05, 0.16, easeOutCubic).to(1, 0.16, easeOutCubic),
          card3().scale(1.05, 0.16, easeOutCubic).to(1, 0.16, easeOutCubic),
        ),
      ),
      delay(
        3.92,
        sequence(
          0.06,
          badgeLinux().y(-4, 0.12, easeOutCubic).to(0, 0.12, easeOutCubic),
          badgeOpen().y(-4, 0.12, easeOutCubic).to(0, 0.12, easeOutCubic),
          badgeSwitch().y(-4, 0.12, easeOutCubic).to(0, 0.12, easeOutCubic),
        ),
      ),
    ),
  );
});
