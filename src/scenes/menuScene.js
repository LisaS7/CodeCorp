import Phaser from "../../lib/phaser.js";
import { titleFontConfig, menuItemFontConfig } from "../../config/text.js";
import { menuConfig } from "../../config/game.js";

export class MenuScene extends Phaser.Scene {
  constructor() {
    // call the parent class and register the scene key
    super("MenuScene");
  }

  create() {
    this.add.text(300, 100, "CodeCorp", titleFontConfig);

    const menuOptions = [
      { label: "Save Game" },
      { label: "Load Game" },
      { label: "Options" },
      { label: "Quit Game" },
    ];

    menuOptions.forEach((opt, i) => {
      const y = 180 + i * menuConfig.itemSpacing;
      const text = this.add.text(300, y, opt.label, menuItemFontConfig);
    });
  }
}
