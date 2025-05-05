import { menuConfig } from "../../config/game.js";

/**
 * Converts a numeric hex color (e.g. 0x000000) to a hex string (e.g. "#000000").
 * This is required because Phaser will only accept hex strings for text styles
 * @param {number} color - The numeric color value.
 * @returns {string} - The hex string representation.
 */
export function toHexString(color) {
  return "#" + color.toString(16).padStart(6, "0");
}

/**
 * Apply style to text based on selection state.
 * @param {Phaser.GameObjects.Text} text - The text object to style.
 * @param {boolean} isSelected - Whether the text is selected.
 */
export function styleSelectedChoice(text, isSelected) {
  text.setStyle({
    backgroundColor: isSelected
      ? toHexString(menuConfig.selectedBgColour)
      : "transparent",
    color: isSelected
      ? toHexString(menuConfig.selectedFontColour)
      : toHexString(menuConfig.unselectedFontColour),
  });
}
