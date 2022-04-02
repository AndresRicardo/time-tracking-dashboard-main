const mainCard = document.getElementById("mainCard");
const workCard = document.getElementById("workCard");
const playCard = document.getElementById("playCard");
const studyCard = document.getElementById("studyCard");
const exerciseCard = document.getElementById("exerciseCard");
const socialCard = document.getElementById("socialCard");
const selfCareCard = document.getElementById("selfCareCard");
const cards = [
    workCard,
    playCard,
    studyCard,
    exerciseCard,
    socialCard,
    selfCareCard,
];
let jsonData;

//leer archivo Json
fetch("data.json")
    .then((Response) => Response.json())
    .then((data) => {
        jsonData = data;
    });

//cambia estilos y estado elemento seleccionado
function setActive(element) {
    element.style.color = "white";
    element.dataset.active = "true";

    if (element.id !== "daily") {
        mainCard.querySelector("#times #daily").style.color =
            "hsl(235, 45%, 61%)";
        mainCard.querySelector("#times #daily").dataset.active = "false";
    }
    if (element.id !== "weekly") {
        mainCard.querySelector("#times #weekly").style.color =
            "hsl(235, 45%, 61%)";
        mainCard.querySelector("#times #weekly").dataset.active = "false";
    }
    if (element.id !== "monthly") {
        mainCard.querySelector("#times #monthly").style.color =
            "hsl(235, 45%, 61%)";
        mainCard.querySelector("#times #monthly").dataset.active = "false";
    }
}

//actualiza los valors en los elemntos visuales en las cards
function setValues(element) {
    let previousInterval;
    let currentHours = 1;
    let previousHours = 2;

    if (element.id === "daily") {
        previousInterval = "Day";
    }
    if (element.id === "weekly") {
        previousInterval = "Week";
    }
    if (element.id === "monthly") {
        previousInterval = "Month";
    }

    for (let i = 0; i < cards.length; i++) {
        jsonData.forEach((item) => {
            if (item.title === cards[i].dataset.name) {
                currentHours = item.timeframes[element.id].current;
                previousHours = item.timeframes[element.id].previous;

                cards[i].querySelector(
                    ".cardData .cardDataResults .totalTime"
                ).textContent = `${currentHours}hrs`;

                cards[i].querySelector(
                    ".cardData .cardDataResults .last"
                ).textContent = `Last ${previousInterval} - ${previousHours}hrs`;
            }
        });
    }
}

function update(element) {
    setActive(element);
    setValues(element);
}

document.addEventListener("click", (event) => {
    if (
        event.target.id === "daily" ||
        event.target.id === "weekly" ||
        event.target.id === "monthly"
    ) {
        update(event.target);
    }
});
