import { initHeader } from './header.js';
import { initMain } from './main.js';

export function initApp() {
    initHeader();
    initMain();
}

initApp();