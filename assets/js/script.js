// select all elements
var start = document.getElementById("start-btn");
var pg1 = document.getElementById("pg1");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");
var highScoreChart = document.getElementById("highScore");
var rightWrong = document.getElementById("rightWrong");
var finalScore = document.getElementById("finalScore");
var retry = document.getElementById("retry");
var viewScores = document.getElementById("view-scores");
var initials = document.getElementById("initials");
var submit = document.querySelector("#add-initials");

// create our questions
let questions = [
    {
        question: "Commonly used data types do NOT include:",
        choiceA: "1. strings",
        choiceB: "2. booleans",
        choiceC: "3. alerts",
        choiceD: "4. numbers",
        correct: "C"
    },{
        question: "The condition in an if / else statement is enclosed with ______.",
        choiceA: "1. quotes",
        choiceB: "2. curly brackets",
        choiceC: "3. parenthesis",
        choiceD: "4. square brackets",
        correct: "B"
    },{
        question: "Arrays in JavaScript can be used to store ______.",
        choiceA: "1. numbers and strings",
        choiceB: "2. other arrays",
        choiceC: "3. booleans",
        choiceD: "4. all of the above",
        correct: "D"
    },{
        question: "String values must be enclosed within ______ when being assigned to variables.",
        choiceA: "1. commas",
        choiceB: "2. curly brackets",
        choiceC: "3. quotes",
        choiceD: "4. parenthesis",
        correct: "C"
    },{
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choiceA: "1. JavaScript",
        choiceB: "2. terminal/bash",
        choiceC: "3. for loops",
        choiceD: "4. console.log",
        correct: "D"
    },
];

// create some variables

var lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 50;
var totalTime = 50 // 50s
var questionTime = 10 // 10s
var gaugeWidth = 500; // 300px
var gaugeUnit = gaugeWidth / totalTime;
let TIMER;
var score = 0;
// const noOfHighScores = 5;
// const high_Scores = 'highScores';
// const highScoreString = localStorage.getItem(highScores);
// const highScores = JSON.parse(highScoreString) ?? [];
// const lowestScore = highScores[noOfHighScores - 1]?.score ?? 0;
// const newScore = {score, initials};

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

//         _
//     .__(.)< (MEOW)
//     \___)   
// ~~~~~~~~~~~~~~~~

// start quiz
function startQuiz(){
    start.style.display = "none";
    pg1.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count >= 0){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count--
    }else{
        count = 0;
        // end the quiz
        endQuiz();
    }
}

// check answer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score = score + 20;
        // tell user they are correct
        answerIsCorrect();
    }else {
        // answer is wrong
        // tell user they are wrong
        answerIsWrong();
    }

    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        endQuiz();
    }
}

// answer is correct
function answerIsCorrect(){
    rightWrong.innerHTML = "<p>Correct!</p>";
}

// answer is wrong
function answerIsWrong(){
    count = count - 10;
    rightWrong.innerHTML = "<p>Wrong!</p>";
}

//         _
//     .__(.)< (MEOW)
//     \___)   
// ~~~~~~~~~~~~~~~~

// store the user's initials and score together as an object
// var savedScore = {
//     name: 'initials'.value,
//     theirScore: JSON.stringify(score).value,
// };

//const jsonObj = JSON.stringify(hiscores);

// const addName = (event)=>{
//     event.preventDefault();
//     let savedScore = {
//         name: 'initials'.value,
//         theirScore: JSON.stringify(score).value
//     }
//     hiscores.push(savedScore);
//     document.forms[0].reset();
// }

// end the quiz
function endQuiz() {
    quiz.style.display="none";
    rightWrong.style.display="none";
    counter.style.display="none";
    viewScores.style.display="none";
    scoreDiv.style.display = "block";
    scoreDiv.innerHTML = "<p>Your score is "+ score +"%</p>";
    finalScore.style.display="block";
    retry.style.display="inline";
}

// push the new score to array hiscores and save that array to localStorage
submit.onclick = function (){
    var savedScore = {
        name: 'initials'.value,
        theirScore: JSON.stringify(score).value,
    };
    let hiscores = [];
    hiscores.push(savedScore);
    localStorage.setItem("hiscores", JSON.stringify(hiscores));
    console.log(initials.value);
    //document.input.reset();
}
