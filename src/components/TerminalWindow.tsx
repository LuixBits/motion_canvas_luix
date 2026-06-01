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
  vaporAccentGradient,
  vaporAlpha,
  vaporColor,
  vaporFont,
  vaporPalette,
  vaporRadii,
  vaporShadow,
  vaporSweepGradient,
  type VaporAccent,
} from '../theme/vaporwave';

export interface TerminalWindowProps extends NodeProps {
  path?: string;
  command?: string;
  commandProgress?: () => number;
  output?: string | string[];
  prompt?: string;
  showCursor?: boolean;
  accent?: VaporAccent | string;
  secondaryAccent?: VaporAccent | string;
  width?: number;
  height?: number;
  pathFontSize?: number;
  commandFontSize?: number;
  commandLineHeight?: number;
  outputFontSize?: number;
  outputLineHeight?: number;
  sweepRef?: ReferenceReceiver<Rect>;
}

export function TerminalWindow({
  ref,
  path = '~/project',
  command = '',
  commandProgress,
  output,
  prompt = '$',
  showCursor = true,
  accent = 'cyan',
  secondaryAccent = 'pink',
  width = 1280,
  height = 660,
  pathFontSize = 26,
  commandFontSize = 30,
  commandLineHeight = 40,
  outputFontSize = 28,
  outputLineHeight = 40,
  sweepRef,
  ...nodeProps
}: TerminalWindowProps) {
  const outputText = Array.isArray(output) ? output.join('\n') : output;
  const color = vaporColor(accent);
  const promptText = () => {
    const progress = commandProgress
      ? Math.max(0, Math.min(command.length, Math.floor(commandProgress())))
      : command.length;
    const cursor = showCursor && progress < command.length ? '|' : '';
    return `${prompt} ${command.slice(0, progress)}${cursor}`;
  };

  return (
    <Node ref={ref} {...nodeProps}>
      <Layout width={width} height={height} clip>
        <Rect
          width={width}
          height={height}
          radius={vaporRadii.lg}
          fill={vaporPalette.panelDeep}
          stroke={vaporAlpha(accent, '66')}
          lineWidth={3}
          shadowColor={vaporShadow.panel}
          shadowBlur={70}
        />
        <Rect
          width={width}
          height={74}
          y={-height / 2 + 37}
          fill={'rgba(255, 255, 255, 0.035)'}
        />
        <Line
          points={[
            [-width / 2 + 28, -height / 2 + 74],
            [width / 2 - 28, -height / 2 + 74],
          ]}
          stroke={vaporPalette.lineStrong}
          lineWidth={2}
        />
        <Layout
          layout
          direction={'row'}
          gap={16}
          x={-width / 2 + 92}
          y={-height / 2 + 38}
        >
          <Circle size={20} fill={vaporPalette.red} />
          <Circle size={20} fill={vaporPalette.amber} />
          <Circle size={20} fill={vaporPalette.mint} />
        </Layout>
        <Txt
          text={path}
          x={width / 2 - 446}
          y={-height / 2 + 38}
          width={720}
          textAlign={'right'}
          fontFamily={vaporFont}
          fontSize={pathFontSize}
          fill={vaporPalette.dim}
          letterSpacing={2}
        />
        <Rect
          ref={sweepRef}
          width={300}
          height={height}
          x={-width / 2 - 300}
          fill={vaporSweepGradient(secondaryAccent, accent)}
          opacity={0.34}
          rotation={6}
        />
        <Line
          points={[
            [-width / 2 + 78, -height / 2 + 116],
            [width / 2 - 78, -height / 2 + 116],
          ]}
          stroke={vaporAccentGradient(secondaryAccent, accent)}
          lineWidth={5}
          opacity={0.72}
        />
        <Txt
          text={promptText}
          x={0}
          y={-height / 2 + 164}
          width={width - 180}
          textAlign={'left'}
          fontFamily={vaporFont}
          fontSize={commandFontSize}
          lineHeight={commandLineHeight}
          fill={color}
        />
        {outputText && (
          <Txt
            text={outputText}
            x={0}
            y={38}
            width={width - 180}
            textAlign={'left'}
            fontFamily={vaporFont}
            fontSize={outputFontSize}
            lineHeight={outputLineHeight}
            fill={vaporPalette.text}
          />
        )}
      </Layout>
    </Node>
  );
}
