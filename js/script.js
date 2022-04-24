let order = [],
    clickedOrder = [],
    record = 0,
    timeWindow = 250;

// selecting feedback divs 
const buttonStart = document.getElementById("start"),
    buttonNextLevel = document.getElementById('next-level'),
    feedback = document.getElementById('feedback'),
    recordFeedback = document.getElementById('record'),
    scoreFeedback = document.getElementById('score');


// selecting divs with colors
const blue = document.querySelector('.blue'),
    green = document.querySelector('.green'),
    red = document.querySelector('.red'),
    yellow = document.querySelector('.yellow');

// adding functions to colors
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

// cria ordem aleatória de cores
let addRandomColor = () => {
    order[order.length] = Math.floor(Math.random() * 4);
    clickedOrder = [];
    for (let i in order) {
        lightUpColor(getElementByNumberColor(order[i]), Number(i) + 1);
    }
}

// turning on (and off) the colors
let lightUpColor = (element, sequenceColor) => {
    timer = sequenceColor * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, timer);
    setTimeout(() => {
        element.classList.remove('selected')
    }, timer + timeWindow)
}

// comparison between expected colors and clicked colors
let checkOrder = () => {
    let gameOverCheck = false;
    for (let i in clickedOrder) {
        if (clickedOrder[i] !== order[i]) {
            gameOverCheck = true;
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length && !gameOverCheck) {
        feedback.innerHTML = "Congratulations! Go to the Next Level!";
        score++;
        scoreFeedback.innerHTML = score;
        if (score > record) {
            record = score;
            recordFeedback.innerHTML = record;
        }
        buttonNextLevel.disabled = false;
    }

}

// capture player click
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    getElementByNumberColor(color).classList.add('selected');
    setTimeout(() => {
        getElementByNumberColor(color).classList.remove('selected');
        checkOrder();
    }, timeWindow)
};

// get element by number -> 0: green; 1: red; 2: yellow; 3: blue
let getElementByNumberColor = (color) => {
    switch (color) {
        case 0: return green; break;
        case 1: return red; break;
        case 2: return yellow; break;
        case 3: return blue; break;
    }
}

// start a new level
let nextLevel = () => {
    buttonNextLevel.disabled = true;
    setTimeout(() => {
        feedback.innerHTML = "Ready?";
    }, 500);
    setTimeout(() => {
        feedback.innerHTML = "Go!";
        addRandomColor();
    }, 1500);
}

// game over
let gameOver = () => {
    feedback.innerHTML = "Game Over. Your score is " + score + "!";
    order = [];
    clickedOrder = [];
    buttonNextLevel.style.display = 'none';
    buttonStart.style.display = 'inline';
}

// start a new game
let playGame = () => {
    score = 0;
    scoreFeedback.innerHTML = score;
    buttonStart.style.display = 'none';
    buttonNextLevel.style.display = 'inline';
    buttonNextLevel.disabled = true;
    nextLevel();
}

