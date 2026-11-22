const statuses = {
  all: "全部",
  released: "已上线",
  beta: "Beta 公测",
  development: "开发中",
};

const filters = document.querySelector(".filters");
const grid = document.querySelector("#game-grid");
const template = document.querySelector("#game-template");
const resultsStatus = document.querySelector("#results-status");
const navLinks = document.querySelectorAll(".site-nav a");

function setNavigationLocation() {
  const currentHash = location.hash === "#library" ? "#library" : "#top";
  for (const link of navLinks) {
    if (link.hash === currentHash) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  }
}

function addGameLink(link, url, label) {
  if (!url) {
    link.remove();
    return;
  }

  link.href = url;
  link.setAttribute("aria-label", label);
}

function createGameCard(game, index) {
  const card = template.content.firstElementChild.cloneNode(true);
  const title = card.querySelector(".game-title");
  const art = card.querySelector(".card-art");
  const image = art.querySelector("img");

  card.dataset.status = game.status;
  title.textContent = game.title;
  card.querySelector(".status-text").textContent = statuses[game.status];

  if (game.image) {
    image.src = game.image;
    image.loading = index < 3 ? "eager" : "lazy";
  } else {
    image.remove();
  }

  if (game.status === "development") {
    card.querySelector(".game-description").remove();
    card.querySelector(".game-model").remove();
    card.querySelector(".card-actions").remove();
    return card;
  }

  const description = card.querySelector(".game-description");
  description.textContent = game.description ?? "";
  description.hidden = !game.description;

  const model = card.querySelector(".game-model");
  model.querySelector("span").textContent = game.model ?? "";
  model.hidden = !game.model;

  addGameLink(card.querySelector(".button-play"), game.playUrl, `开始游戏：${game.title}（新标签页）`);
  addGameLink(card.querySelector(".button-source"), game.sourceUrl, `查看源码：${game.title}（新标签页）`);
  if (!game.playUrl && !game.sourceUrl) {
    card.querySelector(".card-actions").remove();
  }

  return card;
}

function applyFilter(selectedStatus) {
  let visibleCount = 0;
  for (const card of grid.children) {
    card.hidden = selectedStatus !== "all" && card.dataset.status !== selectedStatus;
    if (!card.hidden) visibleCount++;
  }

  for (const button of filters.querySelectorAll("button")) {
    button.setAttribute("aria-pressed", String(button.dataset.filter === selectedStatus));
  }

  resultsStatus.textContent = `${statuses[selectedStatus]}，共 ${visibleCount} 款游戏。`;
}

function renderLibrary() {
  if (games.length === 0) {
    const message = document.createElement("p");
    message.className = "empty-state";
    message.textContent = "游戏库暂时还没有作品。";
    grid.append(message);
    return;
  }

  grid.append(...games.map(createGameCard));

  for (const [status, label] of Object.entries(statuses)) {
    const count = status === "all" ? games.length : games.filter(game => game.status === status).length;
    const button = document.createElement("button");
    const countLabel = document.createElement("span");

    button.type = "button";
    button.className = "filter-button";
    button.dataset.filter = status;
    button.disabled = count === 0;
    button.textContent = label;
    countLabel.className = "filter-count";
    countLabel.textContent = count;
    button.append(" ", countLabel);
    button.addEventListener("click", () => applyFilter(status));
    filters.append(button);
  }

  filters.hidden = false;
  applyFilter("all");
}

setNavigationLocation();
window.addEventListener("hashchange", setNavigationLocation);
renderLibrary();
