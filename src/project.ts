import {makeProject} from '@motion-canvas/core';

import doomEmacsIntro from './scenes/doom-emacs-intro?scene';
import nixosBtw from './scenes/nixos-btw?scene';
import obsidianNeorg from './scenes/obsidian-neorg?scene';
import neorgWhatIs from './scenes/neorg-what-is?scene';

const scenes = {
  'doom-emacs-intro': doomEmacsIntro,
  'nixos-btw': nixosBtw,
  'obsidian-neorg': obsidianNeorg,
  'neorg-what-is': neorgWhatIs,
};

const activeScene = import.meta.env.VITE_SCENE ?? 'nixos-btw';

export default makeProject({
  name: activeScene,
  scenes: [scenes[activeScene as keyof typeof scenes] ?? nixosBtw],
});
