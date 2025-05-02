import { choicePaneConfig } from "../../config/game.js";
import { normalFontConfig } from "../../config/text.js";
import { DIRECTION } from "../utilities/direction.js";
import { styleSelectedChoice } from "../utilities/menu.js";

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

  /**
   *
   * @param {Phaser.Scene} scene
   * @param {string[]} choices
   */
  constructor(scene, choices) {
    this.#scene = scene;
    this.#choices = choices;

    console.log("constructor");
  }

  create() {
    this.#cursorKeys = this.#scene.input.keyboard.createCursorKeys();
    console.log("create");
    this.#createChoicePane();
  }

  update() {}

  #createChoicePane() {
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
    this.#choices.slice(0, 4).forEach((text, index) => {
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

  /**
   *
   * @param {number} index
   */
  #highlightChoice(index) {
    this.#container.iterate((item, i) => {
      if (item instanceof Phaser.GameObjects.Text) {
        styleSelectedChoice(item, i === index);
      }
    });
  }

  /**
   *
   * @param {''} input
   */
  handleInput(input) {
    /** @type {import("../utilities/direction.js").Direction} */
    let direction = DIRECTION.NONE;

    if (this.#cursorKeys.left.isDown) {
      direction = DIRECTION.LEFT;
    } else if (this.#cursorKeys.right.isDown) {
    } else if (this.#cursorKeys.up.isDown) {
    } else if (this.#cursorKeys.down.isDown) {
    }

    if (direction !== DIRECTION.NONE) {
      // handle input
    }
  }
}
