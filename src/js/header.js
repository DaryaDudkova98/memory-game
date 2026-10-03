import { subscribe } from "./stats.js";

export function initHeader() {
    const header = document.createElement("header");
    const inner = document.createElement("div");
    const stats = document.createElement("div");

    const btnNewGame = document.createElement("button");
    const logo = document.createElement("div");
    const btnLeaderBoard = document.createElement("button");
    
    const movesEl = document.createElement("span");
    const matchesEl = document.createElement("span");
    

    subscribe(({ moves, matches }) => {
        movesEl.textContent = `moves: ${moves}`;
        matchesEl.textContent = `matches: ${matches}`;
    });

    header.classList.add("header");
    inner.classList.add("container");
    stats.classList.add("stats");

    btnNewGame.classList.add("btn-new-game", "btn-header");
    logo.classList.add("logo");
    btnLeaderBoard.classList.add("btn-leader-board", "btn-header");

    movesEl.classList.add("stats__moves");
    matchesEl.classList.add("stats__matches");

    btnNewGame.textContent = "Start over";
    logo.textContent = "Memo";
    btnLeaderBoard.textContent = "Leaderboard";

    stats.append(movesEl, matchesEl);
    inner.append(btnNewGame, logo, btnLeaderBoard);
    header.append(inner, stats);
    document.body.append(header);
}