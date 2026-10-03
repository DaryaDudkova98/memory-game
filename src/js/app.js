import { initHeader } from "./header.js";
import { initMain } from "./main.js";
import { initGrid } from "./grid.js";

export async function initApp() {
  initHeader();
  const wrapper = initMain();
  await initGrid(wrapper);
}

initApp();