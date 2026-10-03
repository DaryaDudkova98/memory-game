import { initTilt } from "./tilt.js";
import { loadThemes } from "./themes.js";
import { buildDeck } from "./deck.js";
import { createCard } from "./card.js";
import { initGame } from "./game.js";


const DEFAULT_THEME = "zombie";

export async function initGrid(wrapper, themeKey = DEFAULT_THEME) {
  const themes = await loadThemes();
  const theme = themes[themeKey];

  if (!theme) throw new Error(`Theme "${themeKey}" not found`);

  const grid = document.createElement("div");
  grid.classList.add("grid");

  const deck = buildDeck(theme.cards);

  deck.forEach((item, index) => {
    grid.append(createCard(item, index));
  });

  wrapper.append(grid);
  initGame(grid);
  initTilt(grid.querySelectorAll(".card"));

  return grid;
}