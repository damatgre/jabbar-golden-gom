//variable storing the questions array
var questions = [
  {
    question: "Who is the current Captain America (2021) in the MCU?",
    choices: ["Steve Rogers", "John Walker", "Bucky Barnes", "Sam Wilson"],
    answer: "Sam Wilson",
  },
  {
    question: "Who are Cable's (X-Men) parents?",
    choices: ["Wolverine and Kitty Pryde", "Rogue and Gambit", "Cyclops and Jean Grey", "Nightcrawler and Mystique"],
    answer: "Cyclops and Jean Grey",
  },
  {
    question: "What is the name of Thor's hammer?",
    choices: ["Stormbreaker", "Mjölnir", "Destroyer", "Loki"],
    answer: "Mjölnir",
  },
  {
    question: "Who is the tree humanoid member of the Guardians of the Galaxy?",
    choices: ["Root", "Scoot", "Groot", "Toot"],
    answer: "Groot",
  },
  {
    question: "Which Infinity Stone controls time?",
    choices: ["Time", "Mind", "Reality", "Power"],
    answer: "Time",
  },
];

//manipulating the HTML with elements we make
var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var welcome = document.getElementById("welcome-page");
var quizDiv = document.getElementById("quiz");
var endgame = document.getElementById("endgame");

//tracking question and correct answers
var questionIndex = 0;
var correctCount = 0;

//tracking time 
var time = 75;
//how time moves
var intervalId;



//time management, stopping quiz on timeout
function updateTime() {
  time--;
  timerEl.textContent = "Time Left: " + time;
  if (time <= 0) {
    endQuiz();
  }
}

//gives questions but no more questions when time hits 0
function renderQuestion() {
  
  if (time == 0) {
    updateTime();
    return;
  }
  
  //setting pace
  intervalId = setInterval(updateTime, 1000);
  
  //element to show which question we are on
  questionEl.textContent = questions[questionIndex].question;
  
  //answer choices/results made to be reusable
  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";
  
  
  var choices = questions[questionIndex].choices;
  var choicesLenth = choices.length;
  
  //putting in list items/answer choices
  for (var i = 0; i < choicesLenth; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.textContent = choices[i];
    optionListEl.append(questionListItem);
  }
}

//rolling out next questions
function nextQuestion() {
  questionIndex++;
  //set timer to zero when done with questions
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
}

//controls response to submitted answer
function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect";
      time = time - 5;
      timerEl.textContent = time;
    }
  }
  setTimeout(nextQuestion, 2000);
}

//welcome page and button
function prequiz() {
  
  var welcome = document.getElementById("welcome-page");
  welcome.className = "welcome-marvel";
  
  
  var welcomeH2 = document.createElement("h2");
  welcomeH2.textContent = "Welcome to the Marvel Quiz";
  welcome.appendChild(welcomeH2);
  
  var welcomeP = document.createElement("p");
  welcomeP.textContent = "Think you know the Marvel Cinematic Universe? Let's put your knowledge to the test! Go ahead and click the Start button.";
  welcome.appendChild(welcomeP);
  
  var startButton = document.createElement("button");
  startButton.classList.add("btn");
  startButton.textContent = "Start";
  startButton.onclick = startQuiz;
  welcome.appendChild(startButton);
  
}

//run through quiz
function startQuiz() {
  welcome.classList.add("hide");
  
  quizDiv.classList.remove("hide");
  
  renderQuestion();
  
}

//what happens at the end of the game
function endQuiz() {
  clearInterval(intervalId);

  quizDiv.classList.add("hide");
  
  var final = document.getElementById("endgame");
  endgame.className = "endgame-end"

  var endH2 = document.createElement("h2");
  endH2.textContent = "You're in the Endgame now."
  endH2.className = "endgame-h2"
  final.appendChild(endH2);

  var endP = document.createElement("p");
  endP.textContent = "You scored " + correctCount + " this round";
  endP.className = "endgame-p"
  final.appendChild(endP);

  endInput = document.createElement("input");
  endInput.type = "text";
  endInput.value = "";
  final.appendChild(endInput);

  var endButton = document.createElement("button");
  endButton.classList.add("btn");
  endButton.textContent = "Submit";
  endButton.onclick = storeLocal;
  endButton.addEventListener("click", storeLocal);
  final.appendChild(endButton);
}

function storeLocal() {
  localStorage.setItem("score", correctCount);
  localStorage.setItem("name", JSON.stringify(endInput.value));

}

prequiz();


optionListEl.addEventListener("click", checkAnswer);


//need to create something to display high score
//create input of high score with initials
//create localStorage to store high scores