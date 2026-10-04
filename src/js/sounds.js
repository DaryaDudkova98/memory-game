const SOUNDS = {
  click: "src/sounds/click.mp3",
  match: "src/sounds/flipcard.mp3",
  win: "src/sounds/victory.mp3",
  shuffle: "src/sounds/card-flipping.mp3",
};

const STORAGE_KEY = "memory-game-sound-muted";

const cache = {};
let muted = false;

export function initSounds() {
  try {
    muted = localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    muted = false;
  }

  for (const [key, url] of Object.entries(SOUNDS)) {
    const audio = new Audio(url);
    audio.preload = "auto";
    cache[key] = audio;
  }
}

export function playSound(key, { volume = 0.5 } = {}) {
  if (muted) return;
  const audio = cache[key];
  if (!audio) return;

  audio.volume = volume;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

export function setMuted(value) {
  muted = value;
  try {
    localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
  } catch {}
}

export function isMuted() {
  return muted;
}