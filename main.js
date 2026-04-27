const buttons = document.querySelectorAll(".nav__btn");
const cards = document.querySelectorAll(".card");

const periodLabels = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month",
};

async function fetchData() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to load data:", error);
    const grid = document.querySelector(".cards-grid");
    if (grid) {
      grid.innerHTML = "<p>Sorry, failed to load data. Please try again.</p>";
    }
  }
}

function updateCards(data, period) {
  cards.forEach((card) => {
    const currentHours = card.querySelector(".card-current-hours");
    const previousHours = card.querySelector(".card-previous-hours");

    if (!currentHours || !previousHours) return;

    currentHours.classList.add("fade");
    previousHours.classList.add("fade");

    setTimeout(() => {
      const cardId = card.id;
      const cardData = data.find(
        (item) => item.title.toLowerCase().replace(/\s+/g, "-") === cardId,
      );

      if (cardData) {
        const current = cardData.timeframes[period].current;
        const previous = cardData.timeframes[period].previous;
        currentHours.textContent = `${current}hrs`;
        previousHours.textContent = `${periodLabels[period]} - ${previous}hrs`;
      }

      currentHours.classList.remove("fade");
      previousHours.classList.remove("fade");
    }, 300);
  });
}

async function init() {
  const data = await fetchData();

  if (!data) return;

  updateCards(data, "weekly");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
      const period = button.dataset.period;
      updateCards(data, period);
    });
  });
}

init();
