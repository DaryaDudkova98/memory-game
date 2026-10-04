import { openModal } from "./modal.js";
import { setMuted, isMuted } from "./sounds.js";
import { playMusic, pauseMusic, shouldPlayMusic } from "./audio.js";
import { loadThemes } from "./themes.js";
import { getCurrentTheme, setCurrentTheme } from "./theme.js";
import { initGrid } from "./grid.js";

export async function showSettingsModal() {
  const content = document.createElement("div");
  content.classList.add("settings");

  const soundRow = document.createElement("label");
  soundRow.classList.add("settings__row");

  const soundCheckbox = document.createElement("input");
  soundCheckbox.type = "checkbox";
  soundCheckbox.classList.add("settings__checkbox");
  soundCheckbox.checked = !isMuted();
  soundCheckbox.addEventListener("change", (e) => {
    setMuted(!e.target.checked);
  });

  const soundLabel = document.createElement("span");
  soundLabel.classList.add("settings__label");
  soundLabel.textContent = "Sound effects";

  soundRow.append(soundCheckbox, soundLabel);

  const musicRow = document.createElement("label");
  musicRow.classList.add("settings__row");

  const musicCheckbox = document.createElement("input");
  musicCheckbox.type = "checkbox";
  musicCheckbox.classList.add("settings__checkbox");
  musicCheckbox.checked = shouldPlayMusic();
  musicCheckbox.addEventListener("change", (e) => {
    if (e.target.checked) playMusic();
    else pauseMusic();
  });

  const musicLabel = document.createElement("span");
  musicLabel.classList.add("settings__label");
  musicLabel.textContent = "Background music";

  musicRow.append(musicCheckbox, musicLabel);

  const themeRow = document.createElement("div");
  themeRow.classList.add("settings__row", "settings__row--column");

  const themeLabel = document.createElement("span");
  themeLabel.classList.add("settings__label");
  themeLabel.textContent = "Card theme";

  const themes = await loadThemes();
  const current = getCurrentTheme();

  const dropdown = document.createElement("div");
  dropdown.classList.add("settings__dropdown");

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("settings__select");
  button.textContent = themes[current]?.name ?? "Select theme";

  const list = document.createElement("ul");
  list.classList.add("settings__list");

  Object.entries(themes).forEach(([key, theme]) => {
    const item = document.createElement("li");
    item.classList.add("settings__option");
    item.dataset.value = key;
    item.textContent = theme.name;
    if (key === current) item.classList.add("settings__option--active");

    item.addEventListener("click", () => {
      setCurrentTheme(key);
      button.textContent = theme.name;

      list.querySelectorAll(".settings__option").forEach((el) => {
        el.classList.toggle("settings__option--active", el.dataset.value === key);
      });

      list.classList.remove("settings__list--open");

      const wrapper = document.querySelector(".wrapper");
      const oldGrid = document.querySelector(".grid");
      if (!wrapper || !oldGrid) return;

      oldGrid.remove();
      initGrid(wrapper, key);
    });

    list.append(item);
  });

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    list.classList.toggle("settings__list--open");
  });

  const closeOnOutside = (e) => {
    if (!dropdown.contains(e.target)) {
      list.classList.remove("settings__list--open");
    }
  };
  document.addEventListener("click", closeOnOutside);

  dropdown.append(button, list);
  themeRow.append(themeLabel, dropdown);

  content.append(soundRow, musicRow, themeRow);

  openModal({
    title: "Settings",
    content,
    actions: [{ label: "Close", variant: "default" }],
  });
}