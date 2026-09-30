export function initHeader() {
    const header = document.createElement("header");
    const inner = document.createElement("div");
    const btnNewGame = document.createElement("button");
    const logo = document.createElement("div");
    const btnLeaderBoard = document.createElement("button");

    header.classList.add("header");
    inner.classList.add("container");

    btnNewGame.classList.add("btn-new-game", "btn-header");
    logo.classList.add("logo");
    btnLeaderBoard.classList.add("btn-leader-board", "btn-header");

    btnNewGame.textContent = "Start over";
    logo.textContent = "Memo";
    btnLeaderBoard.textContent = "Leaderboard";

    inner.append(btnNewGame, logo, btnLeaderBoard);
    header.append(inner);
    document.body.append(header);
}