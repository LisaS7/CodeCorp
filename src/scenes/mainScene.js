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

    // Connect up UI Elements
    document
      .getElementById("run-button")
      .addEventListener("click", async () => {
        const result = await runEditorCode(this.editor);
        this.outputText.text = result.output;
        this.codeText.text = result.code;
      });

    const testChoices = ["option1", "option2", "option3", "option4"];

    this.#dialogue = new Dialogue(this);
    this.#choices = new Choices(this, testChoices);

    this.#dialogue.create();
    this.#choices.create();
  }

  update() {
    this.#choices.update();
  }
}
