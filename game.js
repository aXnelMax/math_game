let el = document.querySelector(".start__button");
el.addEventListener("click", startGame, false);

let timeRemaining = 15;
let difficulty = 10;
let timerId;

function startGame() {
    showElements();
    timerId = setInterval(timer, 1000);
    generateGame();
}

function showElements() {
    let startGame = document.querySelector(".start__button");
    let mainGame = document.querySelector('.main__game');
    let resultText = document.querySelector('.result');
    resultText.style.color = "transparent";
    resultText.innerHTML = "isCorrect";
    mainGame.style.display = "block";
    startGame.style.display = "none";
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

function generateGame() {
    generateTask();
    generateAnswers();
}

function generateArg() {
    return Number((Math.random()*difficulty).toFixed());
}
function generateAnswer() {
    return Number((Math.random()*(difficulty*2)).toFixed());
}
function generateTask() {
    let firstArg = generateArg();
    let secondArg = generateArg();
    document.querySelector('.task').innerHTML = firstArg + " + " + secondArg + " = ";
    return firstArg + secondArg;
}

function generateAnswers() {
    let answers = [0, 0, 0, 0, 0];
    let rightAnswerPos = (Math.random()*4).toFixed();
    answers = answers.map(elem => elem = generateAnswer());

    answers[rightAnswerPos] = generateTask();

    answers.forEach((elem, i) => {
        document.querySelector(`#answer-${i}`).innerHTML = elem;
    })
}