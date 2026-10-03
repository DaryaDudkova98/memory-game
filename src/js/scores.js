const STORAGE_KEY = "memory-game-scores";
const MAX_SCORES = 10;

export function getScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveScore({ moves, date = Date.now() }) {
  const scores = getScores();
  scores.push({ moves, date });

  scores.sort((a, b) => {
    if (a.moves !== b.moves) return a.moves - b.moves;
    return a.date - b.date;
  });

  const top = scores.slice(0, MAX_SCORES);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(top));
  } catch {

  }

  return top;
}

export function clearScores() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}