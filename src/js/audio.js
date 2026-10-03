const MUSIC_URL = "src/sounds/background.mp3";

let music = null;
let isPlaying = false;

export function initAudio() {
  music = new Audio(MUSIC_URL);
  music.loop = true;
  music.volume = 0.3;
  music.preload = "auto";
}

export function playMusic() {
  if (!music) return;
  music.play().then(() => {
    isPlaying = true;
  }).catch((err) => {
    console.warn("Music autoplay blocked:", err);
  });
}

export function pauseMusic() {
  if (!music) return;
  music.pause();
  isPlaying = false;
}

export function toggleMusic() {
  if (isPlaying) pauseMusic();
  else playMusic();
  return isPlaying;
}

export function isMusicPlaying() {
  return isPlaying;
}