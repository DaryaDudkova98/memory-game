import { initHeader } from "./header.js";
import { initMain } from "./main.js";
import { initGrid } from "./grid.js";
import { initAudio, playMusic } from "./audio.js";
import { initSounds } from "./sounds.js";

export async function initApp() {
  initHeader();
  const wrapper = initMain();
  await initGrid(wrapper);
  initSounds();

  initAudio();

  const startMusic = () => {
    playMusic();
    document.removeEventListener("click", startMusic);
  };
  document.addEventListener("click", startMusic);
}

initApp();