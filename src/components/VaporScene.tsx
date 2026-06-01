import {
  Layout,
  Line,
  Node,
  Rect,
  Txt,
  type NodeProps,
} from '@motion-canvas/2d';
import type {ReferenceReceiver} from '@motion-canvas/core';
import {
  vaporAccentGradient,
  vaporAlpha,
  vaporBackgroundGradient,
  vaporColor,
  vaporFont,
  vaporPalette,
  vaporSize,
  type VaporAccent,
} from '../theme/vaporwave';

export interface VaporSceneProps extends NodeProps {
  sceneWidth?: number;
  sceneHeight?: number;
  series?: string;
  episode?: string;
  chapter?: string;
  accent?: VaporAccent | string;
  secondaryAccent?: VaporAccent | string;
  showGrid?: boolean;
  showHeader?: boolean;
  showChapter?: boolean;
  scanLineRef?: ReferenceReceiver<Line>;
  chapterTextRef?: ReferenceReceiver<Txt>;
  chapterRuleRef?: ReferenceReceiver<Line>;
}

function gridPositions(limit: number, spacing: number) {
  const positions: number[] = [];
  for (let value = -limit + spacing; value < limit; value += spacing) {
    positions.push(value);
  }
  return positions;
}

export function VaporScene({
  ref,
  children,
  sceneWidth = vaporSize.width,
  sceneHeight = vaporSize.height,
  series = 'open-source alternatives',
  episode = 'episode://next',
  chapter = 'part 00 / boot',
  accent = 'pink',
  secondaryAccent = 'cyan',
  showGrid = true,
  showHeader = true,
  showChapter = true,
  scanLineRef,
  chapterTextRef,
  chapterRuleRef,
  ...nodeProps
}: VaporSceneProps) {
  const halfWidth = sceneWidth / 2;
  const halfHeight = sceneHeight / 2;
  const safeWidth = Math.min(vaporSize.safeWidth, sceneWidth - 400);
  const accentFill = vaporAccentGradient(accent, secondaryAccent);

  return (
    <Node ref={ref} {...nodeProps}>
      <Rect width={'100%'} height={'100%'} fill={vaporBackgroundGradient()} />

      {showGrid && (
        <Node opacity={0.92}>
          {gridPositions(halfWidth, 516).map(x => (
            <Line
              points={[
                [x, -halfHeight],
                [x, halfHeight],
              ]}
              stroke={vaporPalette.line}
              lineWidth={2}
            />
          ))}
          {gridPositions(halfHeight, 240).map(y => (
            <Line
              points={[
                [-halfWidth, y],
                [halfWidth, y],
              ]}
              stroke={vaporPalette.line}
              lineWidth={2}
            />
          ))}
          <Line
            points={[
              [-halfWidth, 420],
              [halfWidth, 420],
            ]}
            stroke={vaporAlpha(accent, '2f')}
            lineWidth={5}
          />
        </Node>
      )}

      <Line
        ref={scanLineRef}
        points={[
          [-safeWidth / 2, 0],
          [safeWidth / 2, 0],
        ]}
        y={-halfHeight + 134}
        stroke={accentFill}
        lineWidth={5}
        opacity={0}
        end={0}
      />

      {showHeader && (
        <Layout
          layout
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={safeWidth}
          y={-halfHeight + 78}
        >
          <Layout layout direction={'row'} alignItems={'center'} gap={22}>
            <Rect
              width={22}
              height={22}
              radius={5}
              fill={vaporColor(accent)}
              rotation={45}
            />
            <Txt
              text={series}
              fontFamily={vaporFont}
              fontSize={34}
              fontWeight={700}
              fill={vaporPalette.text}
            />
          </Layout>
          <Txt
            text={episode}
            fontFamily={vaporFont}
            fontSize={28}
            fill={vaporPalette.muted}
            letterSpacing={3}
          />
        </Layout>
      )}

      {showChapter && (
        <Layout
          layout
          direction={'column'}
          alignItems={'start'}
          gap={18}
          width={safeWidth}
          y={-halfHeight + 200}
        >
          <Txt
            ref={chapterTextRef}
            text={chapter}
            fontFamily={vaporFont}
            fontSize={30}
            fontWeight={700}
            fill={vaporColor(secondaryAccent)}
            letterSpacing={4}
          />
          <Line
            ref={chapterRuleRef}
            points={[
              [-safeWidth / 2, 0],
              [-safeWidth / 2 + 480, 0],
            ]}
            stroke={accentFill}
            lineWidth={7}
            end={0}
          />
        </Layout>
      )}

      {children}
    </Node>
  );
}
