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

    const testDialogues = [
      "this is the first text. it is kinda long but whatever. It will wrap to a new line whenever we reach the limit of the dialogue box and it shouldn't hide anything under the choices pane.",
      "this is the second bit of text",
      "and now there's a third",
    ];
    const testChoices = ["option1", "option2", "option3", "option4"];

    // this.#choices = new Choices(this, testChoices);
    // this.#choices.create();
    this.#dialogue = new Dialogue(this);

    this.#dialogue.create();
    this.#dialogue.queueMessages(testDialogues);
    this.#dialogue.showNextMessage();
  }

  update() {
    // this.#choices.update();
    this.#dialogue.update();
  }
}
