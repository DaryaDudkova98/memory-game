import { initTilt } from "./tilt.js";

export function initGrid(wrapper) {
  const grid = document.createElement("div");
  grid.classList.add("grid");

  for (let i = 0; i < 16; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = i;

    const back = document.createElement("div");
    back.classList.add("card-back");

    const front = document.createElement("div");
    front.classList.add("card-front");

    card.append(back, front);
    grid.append(card);
  }

  wrapper.append(grid);
  initTilt(grid.querySelectorAll(".card"));
  return grid;
}