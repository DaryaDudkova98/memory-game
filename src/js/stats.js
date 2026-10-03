let moves = 0;
let matches = 0;
const listeners = [];

export function subscribe(fn) {
  listeners.push(fn);
  fn({ moves, matches });
}

function emit() {
  listeners.forEach((fn) => fn({ moves, matches }));
}

export function resetStats() {
  moves = 0;
  matches = 0;
  emit();
}

export function incMoves() {
  moves++;
  emit();
}

export function incMatches() {
  matches++;
  emit();
}

export function getStats() {
  return { moves, matches };
}