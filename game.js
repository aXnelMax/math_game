let el = document.querySelector(".start__button");
el.addEventListener("click", startGame, false);

let timeRemaining = 5;
let timerId;
function startGame() {
    showElements();
    timerId = setInterval(timer, 1000);
}

function showElements() {
    let startGame = document.querySelector(".start__button");
    let task = document.querySelector(".task");
    let answers = document.querySelector(".answers__container");
    let infoContainer = document.querySelector('.info__container');
    let resultContainer = document.querySelector('.result__container');
    let resultText = document.querySelector('.result');
    resultText.style.color = "transparent";
    resultText.innerHTML = "isCorrect";
    resultContainer.style.display = "block";
    infoContainer.style.display = "flex";
    answers.style.display = "flex";
    startGame.style.display = "none";
    task.style.display = "block";
    document.querySelector('.time__info').innerHTML = timeRemaining;
}

function timer() {
    if (timeRemaining < 1) {
        document.querySelector('.time__info').innerHTML = "Time is over!";
        clearInterval(timerId);
    } else {
        timeRemaining--;
        document.querySelector('.time__info').innerHTML = timeRemaining;
    }
}