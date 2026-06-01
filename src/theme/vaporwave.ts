import {Gradient} from '@motion-canvas/2d';
import type {PossibleColor} from '@motion-canvas/core';

export const vaporFont = 'Hurmit Nerd Font Mono';

export const vaporSize = {
  width: 3440,
  height: 1440,
  safeWidth: 3040,
  safeHeight: 1180,
};

export const vaporPalette = {
  bgA: '#070912',
  bgB: '#111123',
  bgC: '#190b24',
  bgD: '#061820',
  panel: 'rgba(15, 18, 32, 0.9)',
  panelDeep: 'rgba(6, 9, 18, 0.92)',
  panelSoft: 'rgba(28, 22, 44, 0.72)',
  text: '#fff4e8',
  muted: 'rgba(255, 244, 232, 0.68)',
  dim: 'rgba(255, 244, 232, 0.34)',
  line: 'rgba(255, 244, 232, 0.11)',
  lineStrong: 'rgba(255, 244, 232, 0.22)',
  pink: '#ff4fb3',
  cyan: '#65f4ff',
  mint: '#77ffc8',
  purple: '#a77cff',
  amber: '#ffd166',
  red: '#ff6b7a',
};

export const vaporShadow = {
  panel: 'rgba(0, 0, 0, 0.56)',
  pink: 'rgba(255, 79, 179, 0.38)',
  cyan: 'rgba(101, 244, 255, 0.28)',
  mint: 'rgba(119, 255, 200, 0.26)',
};

export const vaporRadii = {
  sm: 6,
  md: 12,
  lg: 18,
  xl: 28,
  pill: 999,
};

export type VaporAccent =
  | 'pink'
  | 'cyan'
  | 'mint'
  | 'purple'
  | 'amber'
  | 'red'
  | 'text';

export function vaporColor(accent: VaporAccent | string = 'cyan'): PossibleColor {
  return accent in vaporPalette
    ? vaporPalette[accent as keyof typeof vaporPalette]
    : accent;
}

export function vaporAlpha(
  accent: VaporAccent | string,
  alpha: string,
): PossibleColor {
  const color = vaporColor(accent);

  if (typeof color === 'string' && /^#[0-9a-fA-F]{6}$/.test(color)) {
    return `${color}${alpha}`;
  }

  return color;
}

export function vaporBackgroundGradient() {
  return new Gradient({
    type: 'linear',
    from: [-1720, -720],
    to: [1720, 720],
    stops: [
      {offset: 0, color: vaporPalette.bgA},
      {offset: 0.48, color: vaporPalette.bgB},
      {offset: 0.78, color: vaporPalette.bgC},
      {offset: 1, color: vaporPalette.bgD},
    ],
  });
}

export function vaporAccentGradient(
  from: VaporAccent | string = 'pink',
  to: VaporAccent | string = 'cyan',
  middle: VaporAccent | string = 'purple',
) {
  return new Gradient({
    type: 'linear',
    from: [-260, 0],
    to: [260, 0],
    stops: [
      {offset: 0, color: vaporColor(from)},
      {offset: 0.52, color: vaporColor(middle)},
      {offset: 1, color: vaporColor(to)},
    ],
  });
}

export function vaporPanelGradient(
  from: VaporAccent | string = 'purple',
  to: VaporAccent | string = 'cyan',
) {
  return new Gradient({
    type: 'linear',
    from: [-260, -260],
    to: [260, 260],
    stops: [
      {offset: 0, color: vaporAlpha(from, '42')},
      {offset: 0.45, color: vaporPalette.panel},
      {offset: 1, color: vaporAlpha(to, '24')},
    ],
  });
}

export function vaporSweepGradient(
  from: VaporAccent | string = 'pink',
  to: VaporAccent | string = 'cyan',
) {
  return new Gradient({
    type: 'linear',
    from: [-230, 0],
    to: [230, 0],
    stops: [
      {offset: 0, color: 'rgba(255, 255, 255, 0)'},
      {offset: 0.42, color: vaporAlpha(from, '44')},
      {offset: 0.68, color: vaporAlpha(to, '36')},
      {offset: 1, color: 'rgba(255, 255, 255, 0)'},
    ],
  });
}
