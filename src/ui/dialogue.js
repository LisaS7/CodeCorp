import { smallDialoguePaneConfig } from "../../config/game.js";
import { normalFontConfig } from "../../config/text.js";

const text = "I am testing this component";

export class Dialogue {
  #scene;

  constructor(scene) {
    this.#scene = scene;
    this.#createSmallDialoguePane();
  }

  #createSmallDialoguePane() {
    const { height, padding, bgColour, borderWidth, borderColour } =
      smallDialoguePaneConfig;

    const baseX = 0;
    const baseY = this.#scene.scale.height - height - padding;

    const container = this.#scene.add.container(baseX, baseY);

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

    container.add(background);

    const dialogueText = this.#scene.add.text(20, 20, text, normalFontConfig);
    container.add(dialogueText);
  }
}
