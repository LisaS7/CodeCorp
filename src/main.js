import Phaser from "../lib/phaser.js";
import { loadPyodidePlugin } from "../lib/pyodide.js";
import { MenuScene } from "./scenes/menuScene.js";
import { gameConfig } from "../config/game.js";
import { TestingScene } from "./scenes/testingScene.js";

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  ...gameConfig,
  scene: [TestingScene],
};
const game = new Phaser.Game(config);

// Load pyodide
await loadPyodidePlugin();
