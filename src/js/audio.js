const MUSIC_URL = "src/sounds/background.mp3";
const STORAGE_KEY = "memory-game-music-on";

let music = null;
let isPlaying = false;
let userWantsMusic = false;

export function initAudio() {
  try {
    userWantsMusic = localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    userWantsMusic = false;
  }

  music = new Audio(MUSIC_URL);
  music.loop = true;
  music.volume = 0.3;
  music.preload = "auto";

  if (userWantsMusic) {
    const tryPlay = () => {
      playMusic();
      document.removeEventListener("click", tryPlay);
    };
    document.addEventListener("click", tryPlay, { once: true });
  }
}

export function playMusic() {
  if (!music) return;
  music.play()
    .then(() => {
      isPlaying = true;
      userWantsMusic = true;
      try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
    })
    .catch(() => {});
}

export function pauseMusic() {
  if (!music) return;
  music.pause();
  isPlaying = false;
  userWantsMusic = false;
  try { localStorage.setItem(STORAGE_KEY, "0"); } catch {}
}

export function toggleMusic() {
  if (isPlaying) pauseMusic();
  else playMusic();
  return isPlaying;
}

export function isMusicPlaying() {
  return isPlaying;
}

export function shouldPlayMusic() {
  return userWantsMusic;
}