let overlay = null;

function createModal() {
  const el = document.createElement("div");
  el.classList.add("modal");
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-modal", "true");
  el.hidden = true;

  const backdrop = document.createElement("div");
  backdrop.classList.add("modal__backdrop");

  const window = document.createElement("div");
  window.classList.add("modal__window");

  const title = document.createElement("h2");
  title.classList.add("modal__title");

  const body = document.createElement("div");
  body.classList.add("modal__body");

  const footer = document.createElement("div");
  footer.classList.add("modal__footer");

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("modal__close");
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.textContent = "×";

  window.append(title, body, footer, closeBtn);
  el.append(backdrop, window);

  backdrop.addEventListener("click", closeModal);
  closeBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !el.hidden) closeModal();
  });

  document.body.append(el);
  return el;
}

export function openModal({ title = "", content = "", actions = [] } = {}) {
  if (!overlay) overlay = createModal();

  const titleEl = overlay.querySelector(".modal__title");
  const bodyEl = overlay.querySelector(".modal__body");
  const footerEl = overlay.querySelector(".modal__footer");

  titleEl.textContent = title;
  titleEl.hidden = !title;

  bodyEl.replaceChildren();
  if (typeof content === "string") {
    bodyEl.textContent = content;
  } else if (content instanceof Node) {
    bodyEl.append(content);
  }

  footerEl.replaceChildren();
  actions.forEach(({ label, onClick, variant = "default" }) => {
    const btn = document.createElement("button");
    btn.classList.add("modal__btn", `modal__btn--${variant}`);
    btn.textContent = label;
    btn.addEventListener("click", () => {
      if (typeof onClick === "function") onClick();
      closeModal();
    });
    footerEl.append(btn);
  });

  overlay.hidden = false;
  document.body.classList.add("modal-open");
}

export function closeModal() {
  if (!overlay) return;
  overlay.hidden = true;
  document.body.classList.remove("modal-open");
}