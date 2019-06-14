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
        question : "At any given time, there are _____ thunderstorms in progress over the earth's atmosphere?",
        imgSrc : "../assets/images/thunderstorm.jpg",
        choiceA : "1,800",
        choiceB : "20,000",
        choiceC : "500",
        correct : "A"
    },{
        question : "A sneeze travels out your mouth at over ___ mph.",
        imgSrc : "../assets/images/Sneeze.jpeg",
        choiceA : "250",
        choiceB : "100",
        choiceC : "75",
        correct : "B"
    },{
        question : "Butterflies taste with their _____.",
        imgSrc : "../assets/images/butterfly.jpg",
        choiceA : "mouth",
        choiceB : "wings",
        choiceC : "feet",
        correct : "C"
    },{
        question : "In the United States, a pound of potato chips costs _____ times more than a pound of potatoes.",
        imgSrc : "../assets/images/Potato-Chips.jpg",
        choiceA : "2",
        choiceB : "20",
        choiceC : "200",
        correct : "C"
    },{
        question : "___% of all broken photocopiers are due to people sitting on them and photocopying their butts.",
        imgSrc : "../assets/images/photocopier.jpg",
        choiceA : "1%",
        choiceB : "23%",
        choiceC: "47%",
        correct : "B"
    }
];
// create variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function createQuestion(){
    $("#questionImage").attr("src", questions[runningQuestion].imgSrc);
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
    document.getElementById(runningQuestion).style.backgroundColor = "#FFFF00";
    $("#questionImage").attr("src", questions[runningQuestion].imgSrc);
}

function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#20ABB2";
    $("#questionImage").attr("src", questions[runningQuestion].imgSrc);
}

function displayScore(){
    scoreContainer.style.display = "block";
    const scorePercent = Math.round ( 100 * score / questions.length);
    scoreContainer.innerHTML = "<p> Grade:"+ scorePercent + "% </p>"       

}