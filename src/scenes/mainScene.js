import Phaser from "../../lib/phaser.js";
import { initEditor, runEditorCode } from "../../lib/codeMirror.js";
import { normalFontConfig } from "../../config/text.js";
import {
  smallDialoguePaneConfig,
  choicePaneConfig,
} from "../../config/game.js";

export class MainScene extends Phaser.Scene {
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

    this.#createSmallDialoguePane();

    const testChoices = ["option1", "option2", "option3", "option4"];
    this.#createChoicePane(testChoices);
  }

  update() {}

  #createSmallDialoguePane() {
    const { height, padding, bgColour, borderWidth, borderColour } =
      smallDialoguePaneConfig;
    this.add
      .rectangle(
        padding,
        this.scale.height - height - padding,
        this.scale.width - padding * 2,
        height,
        bgColour,
        1
      )
      .setOrigin(0)
      .setStrokeStyle(borderWidth, borderColour, 1);
  }

  #createChoicePane(choices = []) {
    const {
      height,
      rectPadding,
      bgColour,
      borderWidth,
      borderColour,
      columnSpacing,
      rowSpacing,
    } = choicePaneConfig;

    const width = this.scale.width * 0.4;
    const baseX = this.scale.width - width - rectPadding;
    const baseY = this.scale.height - height - rectPadding;

    const container = this.add.container(baseX, baseY);

    const background = this.add
      .rectangle(0, 0, width, height, bgColour, 1)
      .setOrigin(0, 0)
      .setStrokeStyle(borderWidth, borderColour, 1);
    container.add(background);

    const textPaddingX = width * 0.2;
    const textPaddingY = height * 0.3;

    // slice to cap choices at 4
    choices.slice(0, 4).forEach((text, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);

      const choiceText = this.add.text(
        textPaddingX + col * columnSpacing,
        textPaddingY + row * rowSpacing,
        text,
        normalFontConfig
      );

      container.add(choiceText);
    });
  }
}
