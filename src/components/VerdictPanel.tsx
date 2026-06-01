import {
  Line,
  Node,
  Rect,
  Txt,
  type NodeProps,
} from '@motion-canvas/2d';
import type {ReferenceReceiver} from '@motion-canvas/core';
import {LogoBadge} from './LogoBadge';
import {NeonCard} from './NeonCard';
import {
  vaporAccentGradient,
  vaporAlpha,
  vaporColor,
  vaporFont,
  vaporPalette,
  vaporRadii,
  vaporShadow,
  type VaporAccent,
} from '../theme/vaporwave';

export interface VerdictChip {
  label: string;
  accent?: VaporAccent | string;
}

export interface VerdictPanelProps extends NodeProps {
  title?: string;
  logoSrc?: string;
  logoLabel?: string;
  chips: VerdictChip[];
  accent?: VaporAccent | string;
  secondaryAccent?: VaporAccent | string;
  width?: number;
  height?: number;
  lineRef?: ReferenceReceiver<Line>;
  chipRef?: ReferenceReceiver<Node>;
}

export function VerdictPanel({
  ref,
  title,
  logoSrc,
  logoLabel = 'VERDICT',
  chips,
  accent = 'mint',
  secondaryAccent = 'cyan',
  width = 2680,
  height = 520,
  lineRef,
  chipRef,
  ...nodeProps
}: VerdictPanelProps) {
  const leftX = -width / 2 + 420;
  const chipStartX = -width / 2 + 940;
  const chipWidth = 500;
  const chipGap = 74;

  return (
    <Node ref={ref} {...nodeProps}>
      <Rect
        width={width}
        height={height}
        radius={vaporRadii.lg}
        fill={vaporPalette.panel}
        stroke={vaporAlpha(accent, '70')}
        lineWidth={3}
        shadowColor={vaporShadow.panel}
        shadowBlur={70}
      />
      <Line
        ref={lineRef}
        points={[
          [-width / 2 + 180, -height / 2 + 56],
          [width / 2 - 180, -height / 2 + 56],
        ]}
        stroke={vaporAccentGradient(accent, secondaryAccent)}
        lineWidth={7}
        end={0}
      />
      <Line
        points={[
          [-width / 2 + 180, height / 2 - 56],
          [width / 2 - 180, height / 2 - 56],
        ]}
        stroke={vaporPalette.lineStrong}
        lineWidth={4}
      />
      <Line
        points={[
          [-width / 2 + 780, -height / 2 + 110],
          [-width / 2 + 780, height / 2 - 110],
        ]}
        stroke={vaporAlpha(accent, '55')}
        lineWidth={4}
      />

      {logoSrc ? (
        <LogoBadge
          src={logoSrc}
          label={logoLabel}
          accent={accent}
          secondaryAccent={secondaryAccent}
          size={360}
          imageSize={238}
          x={leftX}
          y={-18}
        />
      ) : (
        <Txt
          text={title ?? logoLabel}
          x={leftX}
          width={620}
          textWrap
          textAlign={'center'}
          fontFamily={vaporFont}
          fontSize={64}
          lineHeight={74}
          fontWeight={800}
          fill={vaporPalette.text}
        />
      )}

      {chips.map((chip, index) => {
        const column = index % 3;
        const row = Math.floor(index / 3);

        return (
          <NeonCard
            ref={chipRef}
            title={chip.label}
            accent={chip.accent ?? (index % 2 === 0 ? accent : secondaryAccent)}
            variant={'verdict'}
            x={chipStartX + column * (chipWidth + chipGap)}
            y={row === 0 ? -118 : 118}
            opacity={0}
            scale={0.84}
          />
        );
      })}
    </Node>
  );
}
