const buttons = document.querySelectorAll(".nav__btn");
const cards = document.querySelectorAll(".card");

async function fetchData() {
  const response = await fetch("data.json");
  const data = await response.json();
  return data;
}

function updateCards(data, period) {
  cards.forEach((card) => {
    const cardId = card.id;
    const cardData = data.find(
      (item) => item.title.toLowerCase().replace(" ", "-") === cardId,
    );
    if (cardData) {
      const current = cardData.timeframes[period].current;
      const previous = cardData.timeframes[period].previous;

      card.querySelector(".card-current-hours").textContent = `${current}hrs`;
      card.querySelector(".card-previous-hours").textContent =
        `Last ${period} - ${previous}hrs`;
    }
  });
}

async function init() {
  const data = await fetchData();

  updateCards(data, "weekly");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));

      button.classList.add("active");
      const period = button.dataset.period;

      updateCards(data, period);
    });
  });
}

// fetchData().then((data) => console.log(data));
init();
