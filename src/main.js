import { loadPyodidePlugin, runUserCode } from "./pyodideRunner.js";

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

const game = new Phaser.Game(config);

// Initialize CodeMirror for the code editor
const editor = CodeMirror(document.getElementById("editor"), {
  value: 'print("Hello, World!")',
  mode: "python",
  lineNumbers: true,
  matchBrackets: true,
  theme: "default",
  extraKeys: {
    "Ctrl-Space": "autocomplete",
  },
});

// Load pyodide
await loadPyodidePlugin();

// Link up the button
document.getElementById("run-button").addEventListener("click", async () => {
  console.log("button clicked");
  const userCode = editor.getValue();

  try {
    const output = await runUserCode(userCode);
    console.log(output); // or display in-game / UI
    outputText.text = "Output: " + output;
  } catch (err) {
    console.error(err);
  }
});

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

  codeText = this.add.text(20, 400, "Hi", fontConfig);
  outputText = this.add.text(20, 500, "Output: ", fontConfig);

  const logo = this.add.image(400, 300, "logo");
  logo.setOrigin(0.5, 0.5);
}

// Game loop
function update() {
  const code = editor.getValue();
  codeText.text = code;
}
