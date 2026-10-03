import { initHeader } from './header.js';
import { initMain } from './main.js';
import { initGrid } from './grid.js';

export function initApp() {
    initHeader();
     const wrapper = initMain();
    initGrid(wrapper);
}

initApp();