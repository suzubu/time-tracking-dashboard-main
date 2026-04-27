const buttons = document.querySelectorAll(".nav__btn");
const cards = document.querySelectorAll(".card");

async function fetchData() {
  const response = await fetch("data.json");
  const data = await response.json();
  return data;
}

function updateCards(data, period) {
  cards.forEach((card) => {
    const currentHours = card.querySelector(".card-current-hours");
    const previousHours = card.querySelector(".card-previous-hours");

    currentHours.classList.add("fade");
    previousHours.classList.add("fade");

    setTimeout(() => {
      const cardId = card.id;
      const cardData = data.find(
        (item) => item.title.toLowerCase().replace(" ", "-") === cardId,
      );

      if (cardData) {
        const current = cardData.timeframes[period].current;
        const previous = cardData.timeframes[period].previous;
        currentHours.textContent = `${current}hrs`;
        previousHours.textContent = `Last ${period} - ${previous}hrs`;
      }

      currentHours.classList.remove("fade");
      previousHours.classList.remove("fade");
    }, 300);
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

init();