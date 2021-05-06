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

//tracking question and correct answers
var questionIndex = 0;
var correctCount = 0;

//tracking time 
var time = 75;
//how time moves
var intervalId;

//what happens at the end of the game
function endQuiz() {
  clearInterval(intervalId);
  var body = document.body;
  body.innerHTML = "Game over, You scored " + correctCount;
}

//time management, stopping quiz on timeout
function updateTime() {
  time--;
  timerEl.textContent = time;
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

renderQuestion();
optionListEl.addEventListener("click", checkAnswer);
