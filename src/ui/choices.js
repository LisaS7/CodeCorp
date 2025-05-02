import { choicePaneConfig } from "../../config/game.js";
import { normalFontConfig } from "../../config/text.js";

const testChoices = ["option1", "option2", "option3", "option4"];

export class Choices extends Phaser.Scene {
  /** @type Phaser.Scene */
  #scene;
  /** @type Phaser.GameObjects.Container */
  #container;
  /** @type Phaser.Types.Input.Keyboard.CursorKeys */
  #cursorKeys;

  /**
   *
   * @param {Phaser.Scene} scene
   */
  constructor(scene) {
    super("choicesScene");
    this.#scene = scene;
  }

  create() {
    this.#createChoicePane(testChoices);
    this.#cursorKeys = this.input.keyboard.createCursorKeys();
  }

  /**
   *
   * @param {string[]} choices
   */
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

    const width = this.#scene.scale.width * 0.4;
    const baseX = this.#scene.scale.width - width - rectPadding;
    const baseY = this.#scene.scale.height - height - rectPadding;

    this.#container = this.#scene.add.container(baseX, baseY);

    const background = this.#scene.add
      .rectangle(0, 0, width, height, bgColour, 1)
      .setOrigin(0, 0)
      .setStrokeStyle(borderWidth, borderColour, 1);
    this.#container.add(background);

    const textPaddingX = width * 0.2;
    const textPaddingY = height * 0.3;

    // slice to cap choices at 4
    choices.slice(0, 4).forEach((text, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);

      const choiceText = this.#scene.add.text(
        textPaddingX + col * columnSpacing,
        textPaddingY + row * rowSpacing,
        text,
        normalFontConfig
      );

      this.#container.add(choiceText);
    });
  }

  show() {
    this.#container.setVisible(true);
  }

  hide() {
    this.#container.setVisible(false);
  }
}
