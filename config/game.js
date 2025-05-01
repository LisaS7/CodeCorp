import Phaser from "../lib/phaser.js";

const colours = {
  mediumBlue: 0x0077b6,
  lightestGrey: 0xfbfbfb,
  midGrey: 0xd3d3d3,
  midBrown: 0x4a3728,
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
};

export const menuConfig = {
  itemSpacing: 40,
};

export const smallDialoguePaneConfig = {
  height: 124,
  padding: 4,
  bgColour: colours.lightestGrey,
  borderWidth: 8,
  borderColour: colours.mediumBlue,
};

export const choicePaneConfig = {
  height: 124,
  rectPadding: 4,
  bgColour: smallDialoguePaneConfig.bgColour,
  borderWidth: 8,
  borderColour: colours.midBrown,
  columnSpacing: 120,
  rowSpacing: 124 / 3,
};
