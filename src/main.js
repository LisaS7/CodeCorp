import { loadPyodidePlugin } from "./pyodideRunner.js";
import { initEditor, runEditorCode } from "./codeEditor.js";

// Game configuration
const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 800,
  height: 600,
  backgroundColor: 0xeeeeee,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let codeText;
let outputText;
let editor = null;

const game = new Phaser.Game(config);

// Load pyodide
await loadPyodidePlugin();

// Preload assets
function preload() {
  this.load.image("logo", "https://phaser.io/images/logo.png");
}

// Create initial game elements
function create() {
  // font config
  const fontConfig = {
    font: "16px Courier",
    fill: "#000000",
    wordWrap: { width: 760, useAdvancedWrap: true },
  };

  // Initialize CodeMirror for the code editor
  editor = initEditor();

  codeText = this.add.text(20, 400, "Hi", fontConfig);
  outputText = this.add.text(20, 500, "Output: ", fontConfig);

  const logo = this.add.image(400, 300, "logo");
  logo.setOrigin(0.5, 0.5);

  document.getElementById("run-button").addEventListener("click", async () => {
    const result = await runEditorCode(editor);
    outputText.text = result.output;
    codeText.text = result.code;
  });
}

// Game loop
function update() {}
