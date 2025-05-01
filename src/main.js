import { loadPyodidePlugin } from "./pyodideRunner.js";
import { initEditor, runEditorCode } from "./codeEditor.js";
import { gameConfig } from "../config/game.js";
import { fontConfig } from "../config/text.js";

let codeText;
let outputText;
let editor = null;

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  ...gameConfig,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
const game = new Phaser.Game(config);

// Load pyodide
await loadPyodidePlugin();

// Preload assets
function preload() {
  this.load.image("logo", "https://phaser.io/images/logo.png");
}

// Create initial game elements
function create() {
  // Initialize CodeMirror for the code editor
  editor = initEditor();

  // Test stuff, will remove later
  codeText = this.add.text(20, 400, "Hi", fontConfig);
  outputText = this.add.text(20, 500, "Output: ", fontConfig);
  const logo = this.add.image(400, 300, "logo");
  logo.setOrigin(0.5, 0.5);

  // UI Elements
  document.getElementById("run-button").addEventListener("click", async () => {
    const result = await runEditorCode(editor);
    outputText.text = result.output;
    codeText.text = result.code;
  });
}

// Game loop
function update() {}
