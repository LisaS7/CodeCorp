import Phaser from "../../lib/phaser.js";
import { smallDialoguePaneConfig } from "../../config/game.js";
import { normalFontConfig } from "../../config/text.js";

export class Dialogue {
  /** @type Phaser.Scene */
  #scene;
  /** @type Phaser.GameObjects.Container */
  #container;
  /** @type string[] */
  #messageQueue = [];
  /** @type Phaser.GameObjects.Text */
  #dialogueText;

  /**
   *
   * @param {Phaser.Scene} scene
   */
  constructor(scene) {
    this.#scene = scene;
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
    const {
      height,
      width_proportion,
      padding,
      bgColour,
      borderWidth,
      borderColour,
    } = smallDialoguePaneConfig;

    const baseX = 0;
    const baseY = this.#scene.scale.height - height - padding;

    this.#container = this.#scene.add.container(baseX, baseY);

    const background = this.#scene.add
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

    this.#container.add(background);

    this.#dialogueText = this.#scene.add.text(20, 20, "", {
      ...normalFontConfig,
      wordWrap: {
        width: this.#scene.scale.width * width_proportion - 30,
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
  }
}
