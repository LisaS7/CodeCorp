import { smallDialoguePaneConfig } from "../../config/game.js";

export class Dialogue {
  #scene;

  constructor(scene) {
    this.#scene = scene;
    this.#createSmallDialoguePane();
  }

  #createSmallDialoguePane() {
    const { height, padding, bgColour, borderWidth, borderColour } =
      smallDialoguePaneConfig;
    this.#scene.add
      .rectangle(
        padding,
        this.#scene.scale.height - height - padding,
        this.#scene.scale.width - padding * 2,
        height,
        bgColour,
        1
      )
      .setOrigin(0)
      .setStrokeStyle(borderWidth, borderColour, 1);
  }
}
