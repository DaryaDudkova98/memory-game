import { openModal } from "./modal.js";
import { getStats } from "./stats.js";
import { saveScore } from "./scores.js";

export function showWinModal({ onRestart } = {}) {
  const { moves } = getStats();

  saveScore({ moves });

  openModal({
    title: "Victory!",
    content: `You found all pairs in ${moves} moves.`,
    actions: [
      {
        label: "Start over",
        variant: "primary",
        onClick: () => {
          if (typeof onRestart === "function") onRestart();
        },
      },
      { label: "Close", variant: "default" },
    ],
  });
}