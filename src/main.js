// Game configuration
const config = {
  type: Phaser.AUTO,
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
const game = new Phaser.Game(config);

// Initialize CodeMirror for the code editor
const editor = CodeMirror(document.getElementById("editor"), {
  value: '# Write your Python code here...\nprint("Hello, World!")',
  mode: "python",
  lineNumbers: true,
  matchBrackets: true,
  theme: "default",
  extraKeys: {
    "Ctrl-Space": "autocomplete",
  },
});

// Preload assets
function preload() {
  this.load.image("logo", "https://phaser.io/images/logo.png");
}

// Create initial game elements
function create() {
  codeText = this.add.text(20, 400, "Hi", {
    font: "16px Courier",
    fill: "#000000",
    wordWrap: { width: 760, useAdvancedWrap: true },
  });
  const logo = this.add.image(400, 300, "logo");
  logo.setOrigin(0.5, 0.5);
}

// Game loop
function update() {
  const code = editor.getValue();
  codeText.text = code;
  console.log(code);
  console.log("code text: " + codeText.text);
}
