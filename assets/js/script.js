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

document.getElementById("start").addEventListener("click", startGame); //start game button click
document.getElementById("again").addEventListener("click", function (e) {
  e.preventDefault();
  window.location.reload();
})


//start game function
function startGame() {
  console.log("calling function");

  
  //hiding informations container
  introContainer.classList.remove("d-block");
  introContainer.classList.add("d-none");
  //showing game container
  gameContainer.classList.remove("d-none");
  gameContainer.classList.add("d-block");
  //call start timer function
  startTimer();
  //call display questions function
  displayQuestion(questions);
};

/* 
Some pseudocode for you:
Game over function (create it first) you have to:
1. assign current seconds value to highscore (don't forget te create a variable for that)
2. clear interval
3. hide game screen
4. show game over screen (don't forget to create that in your html)
5. show right answers and wrong answers values to user
6. show highscore
7. create an input field where user can insert its name 
8. create a submit button that when its clicked you are going to save the input value in a variable (don't forget to create it first)
9. create a new event listener for submit button and a function for adding the highscore to the local storage
10. your event listener is going to look somethin like this: document.getElementById("submit").addEventListener("click", addHighscore);

Local storage:
here is a very nice guide to it: https://blog.logrocket.com/the-complete-guide-to-using-localstorage-in-javascript-apps-ba44edb53a36/
In you function addHighscore you are going to:
    a. get item or create a new one if it does not exist from local storage, ie:
    window.localStorage.getItem("saveHighscore") || []
    the line above will return a string, so you want to use JSON.parse to get it in json format as following:
    let highscores = JSON.parse(window.localStorage.getItem("saveHighscore")) || [];
    b. create a new object with user input and higscore, ie: {userInput: username, highscore: highscore}
    c. push your object to highscores array
    d. save your array n local storage, ie: window.localStorage.setItem("saveHighscore", JSON.stringify(highscores)); - remember, it wants to receve a string, so you have to use JSON.stringify method to convert it into string.
    e. create a new html page to display highscores, grab your saveHighscore array using getItem method and display everything in a nice table :)




*/
//function game over
function gameOver() {
  //stop timer
  clearInterval(interval);
  //showing game container
  gameContainer.classList.remove("d-block");
  gameContainer.classList.add("d-none");

  endGameContainer.classList.remove("d-none");
  endGameContainer.classList.add("d-block");
  //game over message
  endMessageContainer.innerHTML = `<h3>Game over!</h3>`;
  //count of right and wrong answers
  endAnswerContainer.innerHTML = `Right answers: ${rightAnswers} | Wrong answers: ${wrongAnswers}`;
  //count of right and wrong answers
  endScoreContainer.innerHTML = highscore;
  //time's up message
  document.getElementById("timer").textContent = "Time is up!";
};

//timer function
function startTimer() {
  //create new 1 second interval
  interval = setInterval(() => {
    //find timer container and diplay timer
    document.getElementById("timer").textContent = `Time: ${timer}`;
    if (timer < 0) {
      //if timer riches 0, clear interval and call game over function
      clearInterval(interval);
      gameOver();
    } else {
      //timer countdown untill it reaches 0
      timer--;
    }
  }, 1000);
};

//display questions function
function displayQuestion(array) {
  //if we have questions
  if (questionNumber < array.length) {
    //assign current right answer to the declared variable 
    rightAnswer = array[questionNumber].answer;
    //show current question in question container
    questionContainer.innerText = array[questionNumber].title;
    //declare variable choises for easier use in loop
    const choises = array[questionNumber].choices;
    //loop trough choises
    for (let i = 0; i < choises.length; i++) {
      //create buttons
      const answerButton = document.createElement("button");
      //add classes, including class "answer" which will be used for selecting later
      answerButton.setAttribute("class", "btn btn-primary m-4 answer");
      //add values to the buttons
      answerButton.textContent = choises[i];
      //append buttons to answers container
      answersContainer.append(answerButton);
    }
    //no more questions
  } else {
    //call game over function
    highscore = timer;
    gameOver();
  }

};

//click event on answer buttons
document.addEventListener("click", function (e) {
  //check if clicked button has class of "answer"
  if (e.target && e.target.matches(".answer")) {
    //disable all button after click to avoid multiple clicks while showing right/wrong message
    for (let button of allButtons) {
      button.setAttribute("disabled", "disabled");
    }
    //set user answer variable to chosen answer
    userAnswer = e.target.textContent;
    //if the answer is right
    if (userAnswer === rightAnswer) {
      //add to count of right answers
      rightAnswers++;
      //show right answer message
      answerContainer.textContent = "Right!";
      //play correct answer audio
      correctAudio.play();
      //otherwise
    } else {
      //add to count of wrong answers
      wrongAnswers++;
      //subtract 10 seconds from timer
      timer -= 10;
      //show wrong answer message
      answerContainer.textContent = "Wrong!";
      //play incorrect answer audio
      incorrectAudio.play();
    }
    //increase question number index by one
    questionNumber++;
    //wait 1 second before showing next question
    setTimeout(() => {
      //empty containers
      answersContainer.innerHTML = "";
      questionContainer.innerHTML = "";
      answerContainer.textContent = "";
      //show next question
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

