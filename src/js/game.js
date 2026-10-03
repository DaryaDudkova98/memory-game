import { resetStats, incMoves, incMatches } from "./stats.js";
import { showWinModal } from "./modalWin.js";
import { initGrid } from "./grid.js";
import { playSound } from "./sounds.js";

const FLIP_BACK_DELAY = 1200;

export function initGame(grid) {
  resetStats();

  let firstCard = null;
  let lock = false;

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    if (lock) return;
    if (card.classList.contains("flipped")) return;
    if (card.classList.contains("matched")) return;

    card.classList.add("flipped");
    playSound("click");

    if (!firstCard) {
      firstCard = card;
      return;
    }

    incMoves();

    if (firstCard.dataset.pair === card.dataset.pair) {
      firstCard.classList.add("matched");
      card.classList.add("matched");
      incMatches();
      firstCard = null;

      checkWin(grid);
    } else {
      lock = true;

      setTimeout(() => {
        firstCard.classList.remove("flipped");
        card.classList.remove("flipped");
        firstCard = null;
        lock = false;
      }, FLIP_BACK_DELAY);
    }
  });

  grid.addEventListener("keydown", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.click();
    }
  });

  grid.addEventListener("game:win", () => {
    showWinModal({
      onRestart: () => restartGame(),
    });
  });
}

function checkWin(grid) {
  const total = grid.querySelectorAll(".card").length;
  const matched = grid.querySelectorAll(".card.matched").length;
  if (matched === total) {
    grid.dispatchEvent(new CustomEvent("game:win", { bubbles: true }));
  }
}

function restartGame() {
  const wrapper = document.querySelector(".wrapper");
  const oldGrid = document.querySelector(".grid");
  if (!wrapper || !oldGrid) return;

  oldGrid.remove();
  initGrid(wrapper);
}