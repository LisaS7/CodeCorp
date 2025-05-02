import Phaser from "../../lib/phaser.js";
import { initEditor, runEditorCode } from "../../lib/codeMirror.js";
import { normalFontConfig } from "../../config/text.js";
import { Dialogue } from "../ui/dialogue.js";
import { Choices } from "../ui/choices.js";

export class MainScene extends Phaser.Scene {
  /** @type Dialogue */
  #dialogue;
  /** @type Choices */
  #choices;

  constructor() {
    super("MainScene");
    this.codeText = null;
    this.outputText = null;
    this.editor = null;
  }

  // Preload assets
  preload() {}

  create() {
    // Initialize CodeMirror for the code editor
    this.editor = initEditor();

    // Output test variables on game screen
    this.codeText = this.add.text(20, 200, "Hi", normalFontConfig);
    this.outputText = this.add.text(20, 300, "Output: ", normalFontConfig);
    const logo = this.add.image(400, 300, "logo");
    logo.setOrigin(0.5, 0.5);

    // Connect up UI Elements
    document
      .getElementById("run-button")
      .addEventListener("click", async () => {
        const result = await runEditorCode(this.editor);
        this.outputText.text = result.output;
        this.codeText.text = result.code;
      });

    this.#dialogue = new Dialogue(this);
    this.#choices = new Choices(this);
  }

  update() {}
}
