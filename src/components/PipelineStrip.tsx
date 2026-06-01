import {
  Circle,
  Layout,
  Line,
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
  vaporRadii,
  type VaporAccent,
} from '../theme/vaporwave';

export interface PipelineStep {
  label: string;
  detail?: string;
  accent?: VaporAccent | string;
}

export interface PipelineStripProps extends NodeProps {
  steps: PipelineStep[];
  activeIndex?: number;
  width?: number;
  cardHeight?: number;
  labelFontSize?: number;
  labelLineHeight?: number;
  detailFontSize?: number;
  detailLineHeight?: number;
  progressRef?: ReferenceReceiver<Line>;
}

export function PipelineStrip({
  ref,
  steps,
  activeIndex = steps.length - 1,
  width = 2400,
  cardHeight = 142,
  labelFontSize = 30,
  labelLineHeight = 36,
  detailFontSize = 20,
  detailLineHeight = 26,
  progressRef,
  ...nodeProps
}: PipelineStripProps) {
  const count = Math.max(steps.length, 1);
  const spacing = count > 1 ? width / (count - 1) : 0;
  const startX = -width / 2;
  const cardWidth = Math.min(430, Math.max(280, width / count - 42));
  const progressEnd = count > 1 ? Math.max(0, Math.min(1, activeIndex / (count - 1))) : 1;

  return (
    <Node ref={ref} {...nodeProps}>
      <Line
        points={[
          [-width / 2, -8],
          [width / 2, -8],
        ]}
        stroke={vaporPalette.lineStrong}
        lineWidth={6}
      />
      <Line
        ref={progressRef}
        points={[
          [-width / 2, -8],
          [width / 2, -8],
        ]}
        stroke={vaporColor('cyan')}
        lineWidth={8}
        end={progressEnd}
      />
      {steps.map((step, index) => {
        const x = count > 1 ? startX + spacing * index : 0;
        const active = index <= activeIndex;
        const color = vaporColor(step.accent ?? (active ? 'cyan' : 'purple'));

        return (
          <Node x={x}>
            <Circle
              size={56}
              y={-8}
              fill={active ? color : vaporPalette.panelDeep}
              stroke={color}
              lineWidth={4}
            />
            <Txt
              text={String(index + 1).padStart(2, '0')}
              y={-8}
              fontFamily={vaporFont}
              fontSize={22}
              fontWeight={800}
              fill={active ? vaporPalette.bgA : color}
            />
            <Rect
              layout
              direction={'column'}
              alignItems={'center'}
              justifyContent={'center'}
              gap={8}
              width={cardWidth}
              height={cardHeight}
              y={112}
              padding={18}
              radius={vaporRadii.md}
              fill={active ? vaporPalette.panel : vaporPalette.panelDeep}
              stroke={vaporAlpha(step.accent ?? (active ? 'cyan' : 'purple'), '88')}
              lineWidth={3}
            >
              <Txt
                text={step.label}
                width={cardWidth - 40}
                textWrap
                textAlign={'center'}
                fontFamily={vaporFont}
                fontSize={labelFontSize}
                lineHeight={labelLineHeight}
                fontWeight={800}
                fill={active ? vaporPalette.text : vaporPalette.muted}
              />
              {step.detail && (
                <Txt
                  text={step.detail}
                  width={cardWidth - 40}
                  textWrap
                  textAlign={'center'}
                  fontFamily={vaporFont}
                  fontSize={detailFontSize}
                  lineHeight={detailLineHeight}
                  fill={vaporPalette.muted}
                />
              )}
            </Rect>
          </Node>
        );
      })}
    </Node>
  );
}
