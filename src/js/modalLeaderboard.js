import { openModal } from "./modal.js";
import { getScores } from "./scores.js";

export function showLeaderboardModal() {
  const scores = getScores();

  const content = document.createElement("div");
  content.classList.add("leaderboard");

  if (scores.length === 0) {
    const empty = document.createElement("p");
    empty.classList.add("leaderboard__empty");
    empty.textContent = "No results yet. Play a game!";
    content.append(empty);
  } else {
    const latestIndex = scores.reduce(
      (best, s, i) => (s.date > scores[best].date ? i : best),
      0
    );

    const list = document.createElement("ol");
    list.classList.add("leaderboard__list");

    scores.forEach((score, index) => {
      const item = document.createElement("li");
      item.classList.add("leaderboard__item");
      if (index === latestIndex) {
        item.classList.add("leaderboard__item--latest");
      }

      const place = document.createElement("span");
      place.classList.add("leaderboard__place");
      place.textContent = `#${index + 1}`;

      const moves = document.createElement("span");
      moves.classList.add("leaderboard__moves");
      moves.textContent = `${score.moves} moves`;

      const date = document.createElement("span");
      date.classList.add("leaderboard__date");
      date.textContent = new Date(score.date).toLocaleDateString("ru-RU");

      item.append(place, moves, date);
      list.append(item);
    });

    content.append(list);
  }

  openModal({
    title: "Leaderboard",
    content,
    actions: [{ label: "Close", variant: "default" }],
  });
}