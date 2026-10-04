import { subscribe, resetStats } from "./stats.js";
import { initGrid } from "./grid.js";
import { showLeaderboardModal } from "./modalLeaderboard.js";
import { showSettingsModal } from "./modalSettings.js";
import { playSound } from "./sounds.js";


export function initHeader() {
    const header = document.createElement("header");
    const inner = document.createElement("div");
    const stats = document.createElement("div");

    const btnNewGame = document.createElement("button");
    const logo = document.createElement("div");
    const btnLeaderBoard = document.createElement("button");
    const btnSettings = document.createElement("button");
    
    const movesEl = document.createElement("span");
    const matchesEl = document.createElement("span");
    
    const TOTAL_PAIRS = 8;

    subscribe(({ moves, matches }) => {
        movesEl.textContent = `moves: ${moves}`;
        matchesEl.textContent = `matches: ${matches} / ${TOTAL_PAIRS}`;
    });

    header.classList.add("header");
    inner.classList.add("container");
    stats.classList.add("stats");

    btnNewGame.classList.add("btn-new-game", "btn-header");
    logo.classList.add("logo");
    btnLeaderBoard.classList.add("btn-leader-board", "btn-header");
    btnSettings.classList.add("btn-settings", "btn-header");

    movesEl.classList.add("stats__moves");
    matchesEl.classList.add("stats__matches");

    btnNewGame.textContent = "Start over";
    logo.textContent = "Memo";
    btnLeaderBoard.textContent = "Leaderboard";

    const settingsIcon = document.createElement("iconify-icon");
    settingsIcon.setAttribute("icon", "mdi:cog");
    settingsIcon.setAttribute("width", "32");
    settingsIcon.setAttribute("height", "32");
    btnSettings.append(settingsIcon);
    btnSettings.setAttribute("aria-label", "Settings");

    btnNewGame.addEventListener("click", () => {
        playSound("shuffle");
        resetStats();

        const wrapper = document.querySelector(".wrapper");
        const oldGrid = document.querySelector(".grid");
        if (!wrapper || !oldGrid) return;

        oldGrid.remove();
        initGrid(wrapper);
    });

    btnLeaderBoard.addEventListener("click", () => {
        showLeaderboardModal();
    });

    btnSettings.addEventListener("click", showSettingsModal);

    stats.append(movesEl, matchesEl);
    inner.append(btnNewGame, logo, btnLeaderBoard, btnSettings);
    header.append(inner, stats);
    document.body.append(header);
}