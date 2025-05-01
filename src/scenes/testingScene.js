import { initEditor, runEditorCode } from "../../lib/codeMirror.js";
import { normalFontConfig } from "../../config/text.js";

export class TestingScene extends Phaser.Scene {
  constructor() {
    super("TestingScene");
    this.codeText = null;
    this.outputText = null;
    this.editor = null;
  }

  // Preload assets
  preload() {
    // this.load.image("logo", "https://phaser.io/images/logo.png");
  }

  create() {
    // Initialize CodeMirror for the code editor
    this.editor = initEditor();

    // Output test variables on game screen
    this.codeText = this.add.text(20, 400, "Hi", normalFontConfig);
    this.outputText = this.add.text(20, 500, "Output: ", normalFontConfig);
    const logo = this.add.image(400, 300, "logo");
    logo.setOrigin(0.5, 0.5);

    // UI Elements
    document
      .getElementById("run-button")
      .addEventListener("click", async () => {
        const result = await runEditorCode(this.editor);
        this.outputText.text = result.output;
        this.codeText.text = result.code;
      });
  }
}
