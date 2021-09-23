
//keep track of seconds left
var secondsLeft;
var timerInterval;
var timerContainer = document.querySelector(".timer-container");
var startQuizButton = document.querySelector(".start-quiz-button");
var buttons = document.querySelectorAll("button.question-answer");
var currentQuestion; 
var rightWrongContainer = document.querySelector(".right-wrong");

var questionContainers = document.querySelectorAll('.question-container');

var totalQuestionCount = questionContainers.length; // keeps track of how many questions total

//Keeps track of the players and scores in different arrays - parallel arrays
//jy | 0 as first == players[0] = 'IN' and scores [0]='0
var initialsContainer = document.querySelector(".initials-container");
var saveScoresButton = document.querySelector(".save-score");
var initialsInput = document.querySelector("input[name='initials']");
var leaderboardContainer = document.querySelector(".leaderboard-container");
var goBackOrClearContainer = document.querySelector(".go-back-or-clear-container");

var players = []; //initials of the players
var scores = []; // scores of the players;
var gameScore;

var startOverBtn = document.querySelector(".start-over");
var clearLeaderboardBtn = document.querySelector(".clear-leaderboard");


startQuizButton.addEventListener('click',startGame);
saveScoresButton.addEventListener('click',saveScore);

startOverBtn.addEventListener('click',startGame);
clearLeaderboardBtn.addEventListener('click',clearBoard);

buttons.forEach(function(button){
    button.addEventListener('click',evaluateAnswer);
})

function startGame(){
    //show the first question and start the timer - 
    hideLeaderboard();
    showQuestion(0);
    startTimer();
    showRightWrong();
}

function showRightWrong(){
    rightWrongContainer.style.display='block';
}
function clearBoard(){
    players = [];
    scores = [];
    showLeaderboard();
}
//timer stuff
function startTimer(){
    //start timer
    //initial time for quiz
    secondsLeft =  60; // seconds for quiz
    timerContainer.innerHTML = secondsLeft;
    timerInterval = setInterval(decrementTimer,1000); // 1000 milliseconds is one second

    //hide the start button
    startQuizButton.style.display='none';
    
    //show the first question
    showQuestion(0);
    
    //ensure the timer shows
    timerContainer.style.display='block';
    
}

function decrementTimer(){
    updateTimer(1);
}

function updateTimer(numberOfSecondsToDecrement){

    //subtract the given number of seconds and update the timer container
    secondsLeft = secondsLeft - numberOfSecondsToDecrement;

    //before update the timer container, lets ensure we have time left, and if not, end game
    if(secondsLeft<=0){
        secondsLeft = 0;
        endGame(secondsLeft);

    }
    //update timer
    timerContainer.innerHTML = secondsLeft;

}
//end timer stuff

//question answer stuff

function showQuestion(questionNumber){
    questionContainers.forEach(function(question){
        question.style.display='none';
    })

    if(questionNumber>=totalQuestionCount){
        //we should be at the end so....
        endGame(secondsLeft);
    }
    else{
        questionContainers[questionNumber].style.display="block"; //want to "show" the first quesiton when we start the timer
    }
}

function evaluateAnswer(){
    var theButton = this;
    var isCorrect = theButton.getAttribute('data-is-correct');
    var whichQuestion = theButton.getAttribute('data-question');

    //if the answer is right, then isCorrect will be "yes"
    //if the answer is not right, then it will be no (or not yes)
    
    if(isCorrect!=="yes"){ // not yes then wrong
        rightWrongContainer.innerHTML = "Wrong!";
       updateTimer(5); // 5 second penalty
    }
    else{
        rightWrongContainer.innerHTML = "Correct!"
    }

    showQuestion(whichQuestion); //data attributes are 1-n, so dont have to add 1 becuase our showQuestion function uses array notation to access the element in the array (0-n)
}

//end question answer stuff

function endGame(score){
    //avoid the internval loop
    gameScore = score;
    clearInterval(timerInterval);
    showInitials(score);
}
function showInitials(score){
    //hide the right wrong
    rightWrongContainer.style.display='none';
    //show the container that allows me to ask the initials
    initialsContainer.style.display='block';

}
function saveScore(){
    var playerInitials = initialsInput.value; // value from input box
    players.push(playerInitials); // saving the initials to the players array for leaderboard
    scores.push(gameScore); 
    showLeaderboard();
}   

function showLeaderboard(){

    //hide the other stuff and clear initials value (if already entered)
    initialsContainer.style.display='none';
    timerContainer.style.display='none';
    initialsInput.value='';

    //Clear out leaderboard container
    leaderboardContainer.innerHTML="";

    //for each player and score, show the board
    //clear all and rebuild the board

    var leaderBoardHeader = document.createElement("h1");
    leaderBoardHeader.innerHTML = "Leaderboard";
    leaderboardContainer.appendChild(leaderBoardHeader);

    for(var i=0;i<=players.length-1;i++){
        //for every saved player
        var thisPlayer = players[i]; // player[0], then player[1], then for (all players n, player[n])
        var thisScore = scores[i]; // just like players, but for scores

        var playerLine = document.createElement('div');
        playerLine.className="player-line-container";

        var playerName = document.createElement("div");
        playerName.className="player-name";
        playerName.innerHTML=thisPlayer; // the initials;

        var playerScore = document.createElement("div");
        playerScore.className="player-score";
        playerScore.innerHTML = thisScore; /// the score

        playerLine.appendChild(playerName)
        playerLine.appendChild(playerScore);
        leaderboardContainer.appendChild(playerLine);
    }
    leaderboardContainer.style.display='block';
    goBackOrClearContainer.style.display='block';
}
function hideLeaderboard(){
    leaderboardContainer.style.display='none';
    goBackOrClearContainer.style.display='none';
}
