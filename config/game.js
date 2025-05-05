import Phaser from "../lib/phaser.js";

// Phaser expects color **strings** (e.g., "#000000") for text styles like `color` and `backgroundColor`,
//       but expects numeric hex (e.g., 0x000000) for graphics and rectangle fills.

const colours = {
  mediumBlue: 0x0077b6,
  lightestGrey: 0xfbfbfb,
  midGrey: 0xd3d3d3,
  midBrown: 0x4a3728,
  black: 0x000000,
};

export const gameConfig = {
  type: Phaser.CANVAS,
  backgroundColor: colours.midGrey,
  pixelArt: false,
  scale: {
    width: 900,
    height: 600,
    mode: Phaser.Scale.FIT,
    parent: "game-container",
  },
  fps: {
    target: 0.1, // Limiting the frame rate to 30 FPS (default is 60)
  },
};

export const menuConfig = {
  itemSpacing: 40,
  selectedBgColour: colours.mediumBlue,
  selectedFontColour: colours.black,
  unselectedFontColour: colours.black,
};

export const smallDialoguePaneConfig = {
  height: 124,
  width_proportion: 0.6,
  padding: 4,
  bgColour: colours.lightestGrey,
  borderWidth: 8,
  borderColour: colours.mediumBlue,
};

export const choicePaneConfig = {
  height: 124,
  width_proportion: 0.4,
  rectPadding: 4,
  bgColour: smallDialoguePaneConfig.bgColour,
  borderWidth: 8,
  borderColour: colours.midBrown,
  columnSpacing: 120,
  rowSpacing: 124 / 3,
};
