import {
  Circle,
  Img,
  Node,
  Rect,
  Txt,
  type NodeProps,
} from '@motion-canvas/2d';
import type {ReferenceReceiver} from '@motion-canvas/core';
import {
  vaporAlpha,
  vaporColor,
  vaporFont,
  vaporPalette,
  vaporPanelGradient,
  vaporRadii,
  type VaporAccent,
} from '../theme/vaporwave';

export interface LogoBadgeProps extends NodeProps {
  src?: string;
  label: string;
  accent?: VaporAccent | string;
  secondaryAccent?: VaporAccent | string;
  size?: number;
  imageSize?: number;
  pulseRef?: ReferenceReceiver<Circle>;
  ringRef?: ReferenceReceiver<Circle>;
}

export function LogoBadge({
  ref,
  src,
  label,
  accent = 'cyan',
  secondaryAccent = 'purple',
  size = 500,
  imageSize = Math.round(size * 0.68),
  pulseRef,
  ringRef,
  ...nodeProps
}: LogoBadgeProps) {
  const color = vaporColor(accent);
  const secondary = vaporColor(secondaryAccent);

  return (
    <Node ref={ref} {...nodeProps}>
      <Circle
        ref={pulseRef}
        size={size * 1.22}
        fill={vaporAlpha(accent, '16')}
        stroke={vaporAlpha(accent, '44')}
        lineWidth={4}
      />
      <Circle
        ref={ringRef}
        size={size * 1.54}
        stroke={vaporPalette.lineStrong}
        lineWidth={3}
        start={0}
        end={0.68}
        rotation={-26}
      />
      <Rect
        layout
        width={size}
        height={size}
        radius={vaporRadii.xl}
        fill={vaporPanelGradient(accent, secondaryAccent)}
        stroke={vaporAlpha(secondaryAccent, '66')}
        lineWidth={3}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {src ? (
          <Img src={src} width={imageSize} height={imageSize} />
        ) : (
          <Txt
            text={label.slice(0, 2).toUpperCase()}
            fontFamily={vaporFont}
            fontSize={size * 0.22}
            fontWeight={800}
            fill={color}
            letterSpacing={6}
          />
        )}
      </Rect>
      <Txt
        text={label}
        y={size * 0.66}
        fontFamily={vaporFont}
        fontSize={Math.max(34, size * 0.084)}
        fontWeight={800}
        fill={vaporPalette.text}
      />
    </Node>
  );
}
