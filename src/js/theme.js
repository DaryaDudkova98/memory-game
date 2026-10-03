const STORAGE_KEY = "memory-game-theme";
const DEFAULT_THEME = "zombie";

export function getCurrentTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function setCurrentTheme(key) {
  try {
    localStorage.setItem(STORAGE_KEY, key);
  } catch {}
}