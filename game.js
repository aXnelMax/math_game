const start = document.querySelector('.start__button');
start.addEventListener('click', startGame, false);

const ans = document.querySelectorAll('.answer');
ans.forEach(elem => elem.addEventListener('click', checkAnswer, false));

const retry = document.querySelector('.retry__button');
retry.addEventListener('click', retryGame, false);

let timeRemaining;
let difficulty;
let timerId;
let correctAnswerGlobal;
let score;
let errorsCount;

function setInitialVariables() {
    timeRemaining = 10;
    difficulty = 10;
    score = 0;
    errorsCount = 0;
}

function startGame() {
    setInitialVariables();
    showElements();
    timerId = setInterval(timer, 1000);
    generateGame();
}

function retryGame() {
    setInitialVariables();
    document.querySelector('.retry__button').style.display = 'none';
    document.querySelector('.final__score').style.display = 'none';
    document.querySelector('.score__info').innerHTML = score;
    document.querySelector('.title').innerHTML = 'Реши пример пока не закончилось время';
    startGame();
}

function showElements() {
    const startGame = document.querySelector('.start__button');
    const mainGame = document.querySelector('.main__game');
    const resultText = document.querySelector('.result');
    resultText.style.color = 'transparent';
    resultText.innerHTML = 'isCorrect';
    mainGame.style.display = 'block';
    startGame.style.display = 'none';
    document.querySelector('.time__info').innerHTML = timeRemaining;
}

function timer() {
    if (timeRemaining < 1) {
        document.querySelector('.time__info').innerHTML = 'Time is over!';
        clearInterval(timerId);
        stopGame();
    } else {
        timeRemaining--;
        updateTime();
    }
}

function stopGame() {
    const mainGame = document.querySelector('.main__game');
    const finalScore = document.querySelector('.final__score');
    document.querySelector('.title').innerHTML = 'Game Over!';
    document.querySelector('.final__score__info').innerHTML = `${score} / ${errorsCount}`;
    mainGame.style.display = 'none';
    finalScore.style.display = 'block';
    document.querySelector('.retry__button').style.display = 'block';
}

function generateGame() {
    generateTask();
    generateAnswers();
}

function generateArg() {
    return Number((Math.random() * difficulty).toFixed());
}

function generateAnswer(multiplier) {
    return Number((Math.random() * (difficulty * multiplier)).toFixed());
}

function generateTask() {
    const firstArg = generateArg();
    const secondArg = generateArg();
    document.querySelector('.task').innerHTML = `${firstArg} + ${secondArg} =`;
    return firstArg + secondArg;
}

function generateAnswers() {
    const MULTIPLIER = 2;
    const RANGE_OF_ANSWER_POS = 4;

    let answers = [0, 0, 0, 0, 0];
    let rightAnswerPos = (Math.random() * RANGE_OF_ANSWER_POS).toFixed();

    answers = answers.map(elem => elem = generateAnswer(MULTIPLIER));

    answers[rightAnswerPos] = generateTask();

    answers.forEach((elem, i) => {
        document.querySelector(`#answer-${i}`).innerHTML = elem;
    })

    correctAnswerGlobal = answers[rightAnswerPos];
}

function checkAnswer() {
    const answer = this.innerHTML;
    const TIME_TO_ADD = 2;
    const TIME_TO_REMOVE = 1;

    if (correctAnswerGlobal === +answer) {
        correctAnswer();
        scoreCount();
        generateGame();
        timeRemaining += TIME_TO_ADD;
        updateTime();
    } else {
        wrongAnswer();
        generateGame();
        timeRemaining -= TIME_TO_REMOVE;
        updateTime();
    }
}

function wrongAnswer() {
    const resultText = document.querySelector('.result');
    resultText.style.color = 'red';
    resultText.innerHTML = 'Wrong!';
    errorsCount++;
}

function correctAnswer() {
    const resultText = document.querySelector('.result');
    resultText.style.color = 'green';
    resultText.innerHTML = 'Correct!';
}

function scoreCount() {
    score++;
    difficulty++;
    document.querySelector('.score__info').innerHTML = score;
}

function updateTime() {
    document.querySelector('.time__info').innerHTML = timeRemaining;
}