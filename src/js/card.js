export function createCard(item, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.index = index;
  card.dataset.pair = item.id;
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", "card");

  const back = document.createElement("div");
  back.classList.add("card-back");

  const front = document.createElement("div");
  front.classList.add("card-front");

  const img = document.createElement("img");
  img.src = item.src;
  img.alt = item.id;
  img.draggable = false;
  front.append(img);

  card.append(back, front);

  card.addEventListener("click", () => {
    if (card.classList.contains("flipped")) return;
    card.classList.add("flipped");
    card.dispatchEvent(new CustomEvent("card:flip", { bubbles: true }));
  });

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.click();
    }
  });

  return card;
}