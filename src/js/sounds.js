const SOUNDS = {
  click: "src/sounds/click.mp3",
};

const cache = {};
let muted = false;

export function initSounds() {
  const audio = new Audio(SOUNDS.click);
  audio.preload = "auto";
  cache.click = audio;
}

export function playSound(key, { volume = 0.2 } = {}) {
  if (muted) return;
  const audio = cache[key];
  if (!audio) return;

  audio.volume = volume;
  audio.currentTime = 0;
  audio.play().catch(() => {
  });
}

export function setMuted(value) {
  muted = value;
}

export function isMuted() {
  return muted;
}