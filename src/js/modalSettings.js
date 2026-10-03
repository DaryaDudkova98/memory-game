import { openModal } from "./modal.js";
import { setMuted, isMuted } from "./sounds.js";
import { playMusic, pauseMusic, shouldPlayMusic } from "./audio.js";

export function showSettingsModal() {
  const content = document.createElement("div");
  content.classList.add("settings");

  // ── звуки ──
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

  // ── музыка ──
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

  content.append(soundRow, musicRow);

  openModal({
    title: "Settings",
    content,
    actions: [{ label: "Close", variant: "default" }],
  });
}