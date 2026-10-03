export function initGrid(wrapper) {
    const grid = document.createElement("div");
    grid.classList.add("grid");

    for (let i = 0; i < 16; i++) {
        const card = document.createElement('div');
        card.classList.add("card");
        card.dataset.index = i;
        grid.append(card);
    }

    wrapper.append(grid);
    return grid;
}