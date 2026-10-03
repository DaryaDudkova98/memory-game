const THEMES_URL = "src/data/card-themes.json";

export async function loadThemes() {
  const res = await fetch(THEMES_URL);
  if (!res.ok) throw new Error(`Failed to load themes: ${res.status}`);
  return res.json();
}