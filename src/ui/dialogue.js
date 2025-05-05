import Phaser from "../../lib/phaser.js";
import { smallDialoguePaneConfig } from "../../config/game.js";
import { normalFontConfig } from "../../config/text.js";
import { Choices } from "./choices.js";

export class Dialogue {
  /** @type Phaser.Scene */
  #scene;
  /** @type Phaser.GameObjects.Container */
  #container;
  /** @type Phaser.GameObjects.Rectangle */
  #background;
  /** @type string[] */
  #messageQueue = [];
  /** @type Phaser.GameObjects.Text */
  #dialogueText;
  /** @type Choices | undefined */
  #choices;

  /**
   *
   * @param {Phaser.Scene} scene
   * @param {Choices | undefined} choices - A related choices object if there is one for the current dialogue
   */
  constructor(scene, choices = undefined) {
    this.#scene = scene;
    this.#choices = choices;
  }

  create() {
    this.#createSmallDialoguePane();
  }

  update() {
    this.#scene.input.keyboard.on("keydown-SPACE", () => {
      this.showNextMessage();
    });
  }

  #createSmallDialoguePane() {
    const { height, padding, bgColour, borderWidth, borderColour } =
      smallDialoguePaneConfig;

    const baseX = 0;
    const baseY = this.#scene.scale.height - height - padding;

    this.#container = this.#scene.add.container(baseX, baseY);

    this.#background = this.#scene.add
      .rectangle(
        padding,
        0,
        this.#scene.scale.width - padding * 2,
        height,
        bgColour,
        1
      )
      .setOrigin(0)
      .setStrokeStyle(borderWidth, borderColour, 1);

    this.#container.add(this.#background);

    this.#dialogueText = this.#scene.add.text(20, 20, "", {
      ...normalFontConfig,
      wordWrap: {
        width: this.#scene.scale.width - 30,
      },
    });
    this.#container.add(this.#dialogueText);
  }

  show() {
    this.#container.setVisible(true);
  }

  hide() {
    this.#container.setVisible(false);
  }

  /**
   * @param {number} fraction - Value between 0 and 1, e.g. 1 for full width, 0.6 for partial.
   */
  setWidth(fraction) {
    const padding = smallDialoguePaneConfig.padding;
    const newWidth = this.#scene.scale.width * fraction;
    this.#background.width = newWidth - padding * 2;
    this.#dialogueText.setWordWrapWidth(newWidth - 40);
  }

  /**
   *
   * @param {string[]} messages
   */
  queueMessages(messages) {
    this.#messageQueue.push(...messages);
  }

  showNextMessage() {
    if (this.#messageQueue.length > 0) {
      const next = this.#messageQueue.shift();
      this.#dialogueText.setText(next);
      this.show();
    } else {
      this.#dialogueText.setText("");
      this.hide();
    }

    // adjust width if choices pane is visible
    const choicesVisible = this.#choices ? this.#choices.isVisible() : false;
    this.setWidth(choicesVisible ? 0.6 : 1);
  }
}
