const questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above"
    ],
    answer: "all of the above"
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log"
  }
];

// Selecting all the html elements i need
const introContainer = document.getElementById("intro"); //find instructions container
const gameContainer = document.getElementById("game"); //find game container
const questionContainer = document.getElementById("question"); //find question container
const answersContainer = document.getElementById("answers"); // find list of answers container
const answerContainer = document.getElementById("answer"); //find answer container
const endGameContainer = document.getElementById("end-game"); //find end game container
const endMessageContainer = document.getElementById("end-message"); //find question container
const endScoreContainer = document.getElementById("end-score"); // find list of answers container
const endAnswerContainer = document.getElementById("end-answers"); //find answer container
const correctAudio = new Audio("assets/audio/correct.wav"); //correct answer audio file
const incorrectAudio = new Audio("assets/audio/incorrect.wav"); //incorrect answer audio file
const allButtons = document.getElementsByClassName("answer"); //find all answers buttons

let rightAnswer = ""; //declare right answer variable
let userAnswer = ""; //declare user answer variable
let rightAnswers = 0; //right answers count variable
let wrongAnswers = 0; //wrong answers count variable
let questionNumber = 0; //question number variable
let timer = 60; //timer variable
let interval; //to clear interval
let highscore = 0; //highscore inizially 0

let saveHighscore = window.localStorage.getItem("saveHighscore");

document.getElementById("start").addEventListener("click", startGame); 
document.getElementById("again").addEventListener("click", function (e) {
  e.preventDefault();
  window.location.reload();
})


function startGame() {  
  introContainer.classList.remove("d-block");
  introContainer.classList.add("d-none");
  gameContainer.classList.remove("d-none");
  gameContainer.classList.add("d-block");
  startTimer();
  displayQuestion(questions);
};


function gameOver() {
  clearInterval(interval);
  gameContainer.classList.remove("d-block");
  gameContainer.classList.add("d-none");
  endGameContainer.classList.remove("d-none");
  endGameContainer.classList.add("d-block");
  endMessageContainer.innerHTML = `<h3>Game over!</h3>`;
  endAnswerContainer.innerHTML = `Right answers: ${rightAnswers} | Wrong answers: ${wrongAnswers}`;
  endScoreContainer.innerHTML = highscore;
  document.getElementById("timer").textContent = "Time is up!";
};

function startTimer() {
  interval = setInterval(() => {
    document.getElementById("timer").textContent = `Time: ${timer}`;
    if (timer < 0) {
      clearInterval(interval);
      gameOver();
    } else {
      timer--;
    }
  }, 1000);
};

function displayQuestion(array) {
  if (questionNumber < array.length) {
    rightAnswer = array[questionNumber].answer;
    questionContainer.innerText = array[questionNumber].title;
    const choises = array[questionNumber].choices;
    for (let i = 0; i < choises.length; i++) {
      const answerButton = document.createElement("button");
      answerButton.setAttribute("class", "btn btn-primary m-4 answer");
      answerButton.textContent = choises[i];
      answersContainer.append(answerButton);
    }
  } else {
    highscore = timer;
    gameOver();
  }

};

document.addEventListener("click", function (e) {
  if (e.target && e.target.matches(".answer")) {
    for (let button of allButtons) {
      button.setAttribute("disabled", "disabled");
    }
    userAnswer = e.target.textContent;
    if (userAnswer === rightAnswer) {
      rightAnswers++;
      answerContainer.textContent = "Right!";
      correctAudio.play();
    } else {
      wrongAnswers++;
      timer -= 10;
      answerContainer.textContent = "Wrong!";
      incorrectAudio.play();
    }
    questionNumber++;
    setTimeout(() => {
      answersContainer.innerHTML = "";
      questionContainer.innerHTML = "";
      answerContainer.textContent = "";
      displayQuestion(questions);
    }, 1000);
  };

});


document.getElementById("submit").addEventListener("click", addHighscore);
  function addHighscore() {
    let initials = document.getElementById("initials").value;    
    let highscores = JSON.parse(window.localStorage.getItem("saveHighscore")) || [];
    highscores.push({initials, highscore});
    window.localStorage.setItem("saveHighscore", JSON.stringify(highscores));
    window.location.href = "highscores.html";
  };

