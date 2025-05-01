import Phaser from "../lib/phaser.js";

export const gameConfig = {
  type: Phaser.CANVAS,
  backgroundColor: 0xeeeeee,
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
