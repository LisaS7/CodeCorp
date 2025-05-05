import { choicePaneConfig } from "../../config/game.js";
import { normalFontConfig } from "../../config/text.js";
import { styleSelectedChoice } from "../utilities/style.js";

export class Choices {
  /** @type Phaser.Scene */
  #scene;
  /** @type Phaser.GameObjects.Container */
  #container;
  /** @type Phaser.Types.Input.Keyboard.CursorKeys */
  #cursorKeys;
  /** @type {number} */
  #selectedIndex;
  /** @type {string[]} */
  #choices = [];
  /** @type {Phaser.GameObjects.Text[]} */
  #textObjects = [];

  /**
   *
   * @param {Phaser.Scene} scene
   * @param {string[]} choices
   */
  constructor(scene, choices) {
    this.#scene = scene;
    this.#choices = choices;
    this.#selectedIndex = 0;
  }

  create() {
    this.#cursorKeys = this.#scene.input.keyboard.createCursorKeys();
    this.#createChoicePane();
    this.#highlightChoice(0);
  }

  update() {
    this.handleInput();
  }

  #createChoicePane() {
    const {
      height,
      width_proportion,
      rectPadding,
      bgColour,
      borderWidth,
      borderColour,
      columnSpacing,
      rowSpacing,
    } = choicePaneConfig;

    const width = this.#scene.scale.width * width_proportion;
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
    this.#choices.slice(0, 4).forEach((text, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);

      const choiceText = this.#scene.add.text(
        textPaddingX + col * columnSpacing,
        textPaddingY + row * rowSpacing,
        text,
        normalFontConfig
      );

      this.#textObjects.push(choiceText);
      this.#container.add(choiceText);
    });
  }

  show() {
    this.#container.setVisible(true);
  }

  hide() {
    this.#container.setVisible(false);
  }

  /**
   *
   * @param {number} index
   */
  #highlightChoice(index) {
    this.#textObjects.forEach((item, i) => {
      styleSelectedChoice(item, i === index);
    });
  }

  handleInput() {
    let currentColumn = (this.#selectedIndex % 2) + 1;
    let currentRow = Math.floor(this.#selectedIndex / 2) + 1;
    let newIndex = this.#selectedIndex;

    if (this.#cursorKeys.left.isDown && currentColumn === 2) {
      newIndex -= 1;
    } else if (this.#cursorKeys.right.isDown && currentColumn === 1) {
      newIndex += 1;
    } else if (this.#cursorKeys.up.isDown && currentRow === 2) {
      newIndex -= 2;
    } else if (this.#cursorKeys.down.isDown && currentRow === 1) {
      newIndex += 2;
    }

    if (newIndex !== this.#selectedIndex && newIndex < this.#choices.length) {
      this.#selectedIndex = newIndex;
      this.#highlightChoice(newIndex);
    }
  }
}
