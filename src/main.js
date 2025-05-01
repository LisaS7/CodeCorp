import Phaser from "../lib/phaser.js";
import { loadPyodidePlugin } from "../lib/pyodide.js";
import { MenuScene } from "./scenes/menuScene.js";
import { gameConfig } from "../config/game.js";
import { TestingScene } from "./scenes/testingScene.js";
import { MainScene } from "./scenes/mainScene.js";

const config = {
  ...gameConfig,
  scene: [MainScene],
};
const game = new Phaser.Game(config);

// Load pyodide
await loadPyodidePlugin();
