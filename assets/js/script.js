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
var highScores = document.getElementById("highScore");
var rightWrong = document.getElementById("rightWrong");
var finalScore = document.getElementById("finalScore");
var retry = document.getElementById("retry");

var scoreList = document.getElementById("scores");
var initials = document.querySelector("input[name='initials']");

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
        score++;
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
    console.log(score);
}

// answer is correct
function answerIsCorrect(){
    score++;
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

var scorePerCent = Math.round(100 * score/questions.length);

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    // display score
    scoreDiv.innerHTML = "<p>Your score is "+ scorePerCent +"%</p>";
    console.log(scorePerCent);
}

// end the quiz
function endQuiz() {
    quiz.style.display="none";
    rightWrong.style.display="none";
    counter.style.display="none";
    scoreRender();
    finalScore.style.display="block";
    retry.style.display="inline";
}