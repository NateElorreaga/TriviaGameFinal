const start = $("#start");
const triviaQuiz = document.getElementById("triviaQuiz");
const questionImage =document.getElementById("questionImage");
const question =document.getElementById("question");
const counter = document.getElementById("counter");
const timeBar =document.getElementById("timeBar");
const choiceA= document.getElementById("A");
const choiceB= document.getElementById("B");
const choiceC= document.getElementById("C");
const quizProgress= document.getElementById("quizProgress");
const scoreContainer= document.getElementById("scoreContainer");

let questions = [
    {
        question : "What does HTML stand for?",
        imgSrc : "../images/HTMLtest.png",
        choiceA : "Correct",
        choiceB : "Wrong",
        choiceC : "Wrong",
        correct : "A"
    },{
        question : "What does CSS stand for?",
        imgSrc : "../images/HTMLtest.png",
        choiceA : "Wrong",
        choiceB : "Correct",
        choiceC : "Wrong",
        correct : "B"
    },{
        question : "What does JS stand for?",
        imgSrc : "../images/HTMLtest.png",
        choiceA : "Wrong",
        choiceB : "Wrong",
        choiceC : "Correct",
        correct : "C"
    }
];
// create variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function createQuestion(){
    let q = questions[runningQuestion]; 

    question.innerHTML = "<p>"+ q.question +"</p>";
    // questionImage.innerHTML = "<img src='"+ q.imgSrc +"'>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.on("click", function(){
    start.hide();
    createQuestion();
    triviaQuiz.style.display="block";
    showProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000);
});

// show progress
function showProgress(){
    for(let quizIndex = 0; quizIndex <= lastQuestion; quizIndex++){
        quizProgress.innerHTML += "<div class='progress' id= "+quizIndex+"></div>";
    }

};

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeBar.style.width = count * gaugeUnit + "px";
        count++;
    }else{
        count = 0;
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            createQuestion();
        }
        else{
            clearInterval(TIMER);
            displayScore();
        }
    }
};

function checkAnswer(answer){
    if(answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    count =0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        createQuestion();
    }else{
        clearInterval(TIMER);
        displayScore();
    }
}

function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function displayScore(){
    scoreContainer.style.display = "block";
    const scorePercent = Math.round ( 100 * score / questions.length);

    let img = (scorePercent >= 80) ? "img" :
                (scorePercent >= 60) ? "img" :
                (scorePercent >= 40) ? "img" :
                (scorePercent >= 20) ? "img" :
                "img";
    scoreContainer.innerHTML = "<img src =" + img + ">";    
    scoreContainer.innerHTML = "<p>" + scorePercent + "%</p>"       

}