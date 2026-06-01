import {
  Layout,
  Node,
  Rect,
  Txt,
  type NodeProps,
} from '@motion-canvas/2d';
import {
  vaporColor,
  vaporFont,
  vaporPalette,
  vaporRadii,
  vaporShadow,
  type VaporAccent,
} from '../theme/vaporwave';

export type NeonCardVariant = 'feature' | 'warning' | 'compact' | 'verdict';

export interface NeonCardProps extends NodeProps {
  title: string;
  detail?: string;
  symbol?: string;
  accent?: VaporAccent | string;
  variant?: NeonCardVariant;
  width?: number;
  height?: number;
  iconShape?: 'square' | 'circle';
  titleFontSize?: number;
  titleLineHeight?: number;
  detailFontSize?: number;
  detailLineHeight?: number;
  symbolFontSize?: number;
}

const variantSize: Record<NeonCardVariant, {width: number; height: number}> = {
  feature: {width: 720, height: 172},
  warning: {width: 980, height: 158},
  compact: {width: 820, height: 104},
  verdict: {width: 500, height: 150},
};

export function NeonCard({
  ref,
  title,
  detail,
  symbol,
  accent = 'cyan',
  variant = 'feature',
  width = variantSize[variant].width,
  height = variantSize[variant].height,
  iconShape = variant === 'warning' ? 'circle' : 'square',
  titleFontSize,
  titleLineHeight,
  detailFontSize,
  detailLineHeight,
  symbolFontSize,
  ...nodeProps
}: NeonCardProps) {
  const color = vaporColor(accent);
  const compact = variant === 'compact';
  const verdict = variant === 'verdict';
  const padding = compact ? 24 : verdict ? 0 : 28;
  const iconSize = compact ? 54 : verdict ? 0 : 68;
  const copyWidth = symbol ? width - iconSize - padding * 3 : width - padding * 2;
  const resolvedTitleFontSize =
    titleFontSize ?? (verdict ? 44 : compact ? 34 : 36);
  const resolvedTitleLineHeight =
    titleLineHeight ?? (verdict ? 52 : compact ? 40 : 42);
  const resolvedDetailFontSize = detailFontSize ?? (compact ? 24 : 25);
  const resolvedDetailLineHeight = detailLineHeight ?? (compact ? 32 : 34);

  return (
    <Node ref={ref} {...nodeProps}>
      <Rect
        layout
        direction={'row'}
        alignItems={'center'}
        justifyContent={verdict ? 'center' : 'start'}
        gap={symbol ? 26 : 0}
        padding={padding}
        width={width}
        height={height}
        radius={verdict ? vaporRadii.md : vaporRadii.lg}
        fill={verdict ? vaporPalette.panelDeep : vaporPalette.panel}
        stroke={color}
        lineWidth={3}
        shadowColor={vaporShadow.panel}
        shadowBlur={verdict ? 36 : 52}
      >
        {symbol && !verdict && (
          <Rect
            layout
            width={iconSize}
            height={iconSize}
            radius={iconShape === 'circle' ? vaporRadii.pill : vaporRadii.md}
            fill={color}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Txt
              text={symbol}
              fontFamily={vaporFont}
              fontSize={symbolFontSize ?? (compact ? 30 : 38)}
              fontWeight={800}
              fill={vaporPalette.bgA}
            />
          </Rect>
        )}

        <Layout
          layout
          direction={'column'}
          gap={detail ? 8 : 0}
          width={verdict ? width : copyWidth}
          alignItems={verdict ? 'center' : 'start'}
        >
          <Txt
            text={title}
            width={verdict ? width : copyWidth}
            textWrap
            textAlign={verdict ? 'center' : 'left'}
            fontFamily={vaporFont}
            fontSize={resolvedTitleFontSize}
            lineHeight={resolvedTitleLineHeight}
            fontWeight={800}
            fill={verdict ? color : vaporPalette.text}
            letterSpacing={verdict ? 4 : 0}
          />
          {detail && !verdict && (
            <Txt
              text={detail}
              width={copyWidth}
              textWrap
              textAlign={'left'}
              fontFamily={vaporFont}
              fontSize={resolvedDetailFontSize}
              lineHeight={resolvedDetailLineHeight}
              fill={vaporPalette.muted}
            />
          )}
        </Layout>
      </Rect>
    </Node>
  );
}
