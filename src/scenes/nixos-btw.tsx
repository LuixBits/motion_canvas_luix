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
  delay,
  easeInOutCubic,
  easeInOutSine,
  easeOutBack,
  easeOutCubic,
  sequence,
  waitFor,
} from '@motion-canvas/core';
const font = {
  terminal: 'Hurmit Nerd Font Mono',
  loud: 'Impact, Haettenschweiler, Arial Black, sans-serif',
  cursed: 'Comic Sans MS, Papyrus, Chalkboard SE, cursive',
  tiny: 'Courier New, monospace',
};

export default makeScene2D(function* (view) {
  const bg = createRef<Rect>();
  const logo = createRef<Node>();
  const logoGlow = createRef<Circle>();
  const title = createRef<Txt>();
  const subtitle = createRef<Txt>();
  const cards = createRefArray<Node>();
  const microTags = createRefArray<Node>();
  const confetti = createRefArray<Txt>();
  const bottomTicker = createRef<Txt>();

  const confettiItems = ['λ', '{}', 'flake.lock', '/nix/store', 'drv', 'sha256', 'home-manager', 'pure'];

  function* pop(node: Node, scale = 1) {
    node.opacity(0);
    node.scale(0.35);
    yield* all(
      node.opacity(1, 0.24, easeOutCubic),
      node.scale(scale, 0.42, easeOutBack),
    );
  }

  view.add(
    <>
      <Rect
        ref={bg}
        width={'100%'}
        height={'100%'}
        fill={
          new Gradient({
            type: 'linear',
            from: [-1440, -900],
            to: [1440, 900],
            stops: [
              {offset: 0, color: '#05070f'},
              {offset: 0.36, color: '#071c2e'},
              {offset: 0.68, color: '#2a0642'},
              {offset: 1, color: '#05070f'},
            ],
          })
        }
      />

      {[-1200, -800, -400, 0, 400, 800, 1200].map(x => (
        <Line
          points={[
            [x, -900],
            [x, 900],
          ]}
          stroke={'rgba(160, 230, 255, 0.12)'}
          lineWidth={3}
        />
      ))}
      {[-650, -390, -130, 130, 390, 650].map(y => (
        <Line
          points={[
            [-1440, y],
            [1440, y],
          ]}
          stroke={'rgba(255, 255, 255, 0.08)'}
          lineWidth={3}
        />
      ))}

      {confettiItems.map((item, index) => (
        <Txt
          ref={confetti}
          text={item}
          x={-1240 + (index % 4) * 820}
          y={index < 4 ? -720 : 720}
          rotation={index % 2 === 0 ? -12 : 14}
          fontFamily={index % 2 === 0 ? font.tiny : font.cursed}
          fontSize={index % 2 === 0 ? 54 : 62}
          fontWeight={800}
          fill={index % 3 === 0 ? '#78c7ff' : index % 3 === 1 ? '#f7e463' : '#ff6ad5'}
          opacity={0}
        />
      ))}

      <Node ref={logo} opacity={0} scale={0.25} rotation={-30}>
        <Circle
          ref={logoGlow}
          size={610}
          fill={'rgba(120, 199, 255, 0.12)'}
          stroke={'rgba(120, 199, 255, 0.34)'}
          lineWidth={5}
        />
        <Circle
          size={760}
          stroke={'rgba(255, 255, 255, 0.14)'}
          lineWidth={5}
          start={0}
          end={0.82}
          rotation={-18}
        />
        <Img src={'/icons/nixos.svg'} width={430} height={430} />
      </Node>

      <Txt
        ref={title}
        text={'I USE NIXOS'}
        y={-650}
        width={2600}
        textAlign={'center'}
        fontFamily={font.loud}
        fontSize={210}
        fontWeight={900}
        fill={'#f7e463'}
        stroke={'#0a1020'}
        lineWidth={10}
        letterSpacing={10}
        opacity={0}
      />

      <Txt
        ref={subtitle}
        text={'btw'}
        y={-405}
        fontFamily={font.cursed}
        fontSize={190}
        fontWeight={800}
        fill={'#ff6ad5'}
        stroke={'#0a1020'}
        lineWidth={8}
        rotation={-9}
        opacity={0}
      />

      {([
        ['flake.nix', 'one config to rule the laptop', -730, 420, '#78c7ff', -7],
        ['reproducible', 'same dotfiles, same smug aura', 0, 530, '#f7e463', 5],
        ['/nix/store', 'why is my path 91 chars long', 730, 420, '#ff6ad5', 8],
      ] as const).map(([label, detail, x, y, color, rotation]) => (
        <Node ref={cards} opacity={0} scale={0.2} rotation={rotation}>
          <Rect
            layout
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={14}
            width={650}
            height={210}
            x={x}
            y={y}
            radius={22}
            fill={'rgba(3, 9, 20, 0.86)'}
            stroke={color}
            lineWidth={5}
            shadowColor={'rgba(0, 0, 0, 0.55)'}
            shadowBlur={50}
          >
            <Txt
              text={label}
              width={590}
              textAlign={'center'}
              fontFamily={font.terminal}
              fontSize={54}
              lineHeight={62}
              fontWeight={800}
              fill={color}
            />
            <Txt
              text={detail}
              width={570}
              textWrap
              textAlign={'center'}
              fontFamily={font.cursed}
              fontSize={34}
              lineHeight={43}
              fontWeight={800}
              fill={'#fff8d8'}
            />
          </Rect>
        </Node>
      ))}

      {([
        ['--dry-run', 1045, -236, '#78c7ff', -12],
        ['gc roots', 1180, -22, '#f7e463', 9],
        ['overlays++', -1170, -40, '#ff6ad5', -8],
        ['rollback?', -1055, -260, '#78c7ff', 13],
        ['pure eval', 1105, 205, '#ff6ad5', -14],
        ['flake input', -1120, 205, '#f7e463', 8],
      ] as const).map(([label, x, y, color, rotation]) => (
        <Node ref={microTags} opacity={0} scale={0.24} rotation={rotation}>
          <Rect
            layout
            justifyContent={'center'}
            alignItems={'center'}
            width={label.length > 9 ? 340 : 270}
            height={82}
            x={x}
            y={y}
            radius={12}
            fill={'rgba(3, 9, 20, 0.74)'}
            stroke={color}
            lineWidth={4}
            shadowColor={'rgba(0, 0, 0, 0.48)'}
            shadowBlur={34}
          >
            <Txt
              text={label}
              width={label.length > 9 ? 300 : 232}
              textAlign={'center'}
              fontFamily={font.terminal}
              fontSize={36}
              fontWeight={900}
              fill={color}
            />
          </Rect>
        </Node>
      ))}

      <Layout
        layout
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={26}
        width={2480}
        height={96}
        y={800}
        opacity={0.95}
      >
        <Rect width={20} height={20} rotation={45} fill={'#78c7ff'} />
        <Txt
          ref={bottomTicker}
          text={'status: ego cached | conversation now impure | btw detected'}
          width={2260}
          textAlign={'center'}
          fontFamily={font.terminal}
          fontSize={40}
          fontWeight={800}
          fill={'rgba(255, 248, 216, 0.78)'}
          opacity={0}
        />
      </Layout>
    </>,
  );

  yield* all(
    pop(logo(), 1),
    logo().rotation(720, 0.82, easeInOutCubic),
    logoGlow().size(980, 0.3, easeOutCubic).to(650, 0.3, easeOutCubic),
    bg().fill('#140629', 0.28),
    delay(
      0.5,
      all(
        title().opacity(1, 0.14, easeOutCubic),
        title().y(-555, 0.3, easeOutBack),
        title().letterSpacing(0, 0.3, easeOutCubic),
        subtitle().opacity(1, 0.16, easeOutCubic),
        subtitle().scale(1.18, 0.16, easeOutBack).to(1, 0.14, easeOutCubic),
      ),
    ),
    delay(0.82, sequence(0.06, ...cards.map(card => pop(card, 1)))),
    delay(0.64, sequence(0.035, ...microTags.map(tag => pop(tag, 1)))),
    delay(
      0.72,
      sequence(
        0.025,
        ...confetti.map((piece, index) =>
          all(
            piece.opacity(0.9, 0.12, easeOutCubic),
            piece.y((index % 2 === 0 ? -1 : 1) * (360 + index * 18), 0.55, easeOutBack),
            piece.rotation(piece.rotation() + (index % 2 === 0 ? 24 : -24), 0.55, easeOutBack),
          ),
        ),
      ),
    ),
    delay(0.96, bottomTicker().opacity(1, 0.22, easeOutCubic)),
    delay(1.25, logo().rotation(1080, 1.65, easeInOutSine)),
    delay(1.36, title().scale(1.04, 0.13, easeOutCubic).to(1, 0.13, easeOutCubic).to(1.035, 0.13, easeOutCubic).to(1, 0.13, easeOutCubic)),
    delay(1.52, subtitle().rotation(-17, 0.16, easeOutCubic).to(-5, 0.16, easeOutCubic).to(-9, 0.12, easeOutCubic)),
    delay(
      1.68,
      sequence(
        0.04,
        ...microTags.map(tag =>
          tag.scale(1.12, 0.11, easeOutCubic).to(1, 0.12, easeOutCubic),
        ),
      ),
    ),
    delay(1.86, bottomTicker().fill('#f7e463', 0.18)),
    delay(
      1.92,
      sequence(
        0.08,
        ...cards.map(card =>
          card.rotation(card.rotation() * -0.6, 0.18, easeOutBack).to(card.rotation(), 0.18, easeOutBack),
        ),
      ),
    ),
    delay(2.24, logoGlow().size(1050, 0.18, easeOutCubic).to(670, 0.22, easeOutCubic)),
    waitFor(3),
  );
});
