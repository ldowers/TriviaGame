"use strict";
// Variables
var myGame = {
	trivia: {
		t1: {
            question: "The Aristocats<br><br>What character is named after a composer?",
            answers: ["Marie", "Thomas O'Malley", "Berlioz", "Toulouse"],
            correctAnswerIndex: 2,
            correctAnswerImage: "assets/images/berlioz.gif"
        },
        t2: {
            question: "101 Dalmatians<br><br>What is the name of the father Dalmatian?",
            answers: ["Lucky", "Pongo", "The Colonel", "Patch"],
            correctAnswerIndex: 1,
            correctAnswerImage: "assets/images/pongo.gif"
        },
        t3: {
            question: "Tangled<br><br>What kind of animal is Pascal?",
            answers: ["Gecko", "Chameleon", "Frog", "Iguana"],
            correctAnswerIndex: 1,
            correctAnswerImage: "assets/images/pascal.gif"
        },
        t4: {
            question: "The Little Mermaid<br><br>Who is Ariel's best friend?",
            answers: ["Flounder", "Flotsam", "King Triton", "Max"],
            correctAnswerIndex: 0,
            correctAnswerImage: "assets/images/flounder.gif"
        },
        t5: {
            question: "Peter Pan<br><br>Which of the following is not one of the Darling Children?",
            answers: ["Wendy", "John", "Michael", "Thomas"],
            correctAnswerIndex: 3,
            correctAnswerImage: "assets/images/peterpan.gif"
        },
        t6: {
            question: "What does Winnie the Pooh borrow from Christopher Robin to get up the honey tree?",
            answers: ["Ladder", "Wings", "Pogo Stick", "Balloon"],
            correctAnswerIndex: 3,
            correctAnswerImage: "assets/images/winniethepooh.gif"
        },
        t7: {
            question: "Beauty and the Beast<br><br>What is the name of Mrs. Potts' son?",
            answers: ["Sam", "Saucer", "Chip", "Crack"],
            correctAnswerIndex: 2,
            correctAnswerImage: "assets/images/chip.gif"
        },
        t8: {
            question: "The Jungle Book<br><br>What is the name of Mowgli's black panther friend?",
            answers: ["Bagheera", "Baloo", "King Louie", "Kaa"],
            correctAnswerIndex: 0,
            correctAnswerImage: "assets/images/bagheera.gif"
        },
        t9: {
            question: "The Lion King<br><br>Which of the following is not a hyena?",
            answers: ["Ed", "Scar", "Shenzi", "Bonzai"],
            correctAnswerIndex: 1,
            correctAnswerImage: "assets/images/hyenas.gif"
        },
        t10: {
            question: "The song 'When You Wish Upon A Star' is from which animated movie?",
            answers: ["Cinderella", "Sleeping Beauty", "Pinocchio", "Peter Pan"],
            correctAnswerIndex: 2,
            correctAnswerImage: "assets/images/pinocchio.gif"
        }
    },
    timer: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    noAnswer: 0,
    interval: null,
    triviaArray: [],
    numTrivia: 0,
    userGuess: -1,

    startTimer: function() {
    	myGame.timer = 30;
        myGame.displayTimer(myGame.timer);
        myGame.interval = setInterval(function() {myGame.decrementTimer();}, 1000);
    },
    stopTimer: function() {
    	clearInterval(myGame.interval);
    },
    decrementTimer: function() {
        myGame.timer--;
        myGame.displayTimer(myGame.timer);

        if (myGame.timer == 0) {
            handleTimout();
        }
    },
    displayTimer: function(timer) {
        $('#timeRemaining').html("<h3>Time Remaining: " + timer + " Seconds</h3>");
    },
    displayTrivia: function(x) {
        $('#question').html('<h3>' + myGame.trivia[x].question + '</h3>');
        $('#answer1').html('<button type="button" class="btn btn-default btn-block">' + myGame.trivia[x].answers[0] + '</button>');
        $('#answer2').html('<button type="button" class="btn btn-default btn-block">' + myGame.trivia[x].answers[1] + '</button>');
        $('#answer3').html('<button type="button" class="btn btn-default btn-block">' + myGame.trivia[x].answers[2] + '</button>');
        $('#answer4').html('<button type="button" class="btn btn-default btn-block">' + myGame.trivia[x].answers[3] + '</button>');
    },
    hideTrivia: function() {
        $('#question').empty();
        $('#answer1').empty();
        $('#answer2').empty();
        $('#answer3').empty();
        $('#answer4').empty();
    },
    displayAnswer: function(x, guess) {
        if (guess == myGame.trivia[x].correctAnswerIndex) {
            myGame.correctAnswers++;
            $('#result').html('<h3>Correct!</h3>');
            $('#correctAnswerImage').attr('src', myGame.trivia[x].correctAnswerImage);
        }
        else {
            myGame.incorrectAnswers++;
            $('#result').html('<h3>Nope!</h3>');
            $('#correctAnswer').html("<h4>The Correct Answer was: " + myGame.trivia[x].answers[myGame.trivia[x].correctAnswerIndex] + "</h4>");
            $('#correctAnswerImage').attr('src', myGame.trivia[x].correctAnswerImage);
        }
    },
    hideAnswer: function() {
        $('#result').empty();
        $('#correctAnswer').empty();
        $('#correctAnswerImage').attr('src', "");
    },
    displayTimeout: function(x) {
        $('#result').html('<h3>Out of Time!</h3>');
        $('#correctAnswer').html("<h4>The Correct Answer was: " + myGame.trivia[x].answers[myGame.trivia[x].correctAnswerIndex] + "</h4>");
        $('#correctAnswerImage').attr('src', myGame.trivia[x].correctAnswerImage);
    },
    nextTrivia: function(x) {
        myGame.startTimer();
        myGame.hideAnswer();
        myGame.displayTrivia(x);
    },
    showResult: function() {
        myGame.hideAnswer();
        $('#result').html("<h2>All done, here's how you did!</h2>" +
            "<p>Correct Answers: " + myGame.correctAnswers + "</p>" +
            "<p>Incorrect Answers: " + myGame.incorrectAnswers + "</p>" +
            "<p>Unanswered: " + myGame.noAnswer + "</p>");

        $('#startButton').html("Start Over?");
        $('#startButton').show();
    }
};

// Functions
function handleStartButtonClicked() {
    var $startButton = $(this);
    $startButton.hide();
    
    console.log("Start button clicked");

    myGame.correctAnswers = 0;
    myGame.incorrectAnswers = 0;
    myGame.noAnswer = 0;
    
    myGame.triviaArray = [];

    for (var x in myGame.trivia) {
        myGame.triviaArray.push(x);
    }

    myGame.numTrivia = 0;
    myGame.userGuess = -1;
    
    myGame.nextTrivia(myGame.triviaArray[myGame.numTrivia]);
}

function handleAnswerClicked() {
    var $answer = $(this);
    var userGuess = parseInt($answer.attr('value'), 10);

    console.log("Answer button clicked");
    
    myGame.stopTimer();
    myGame.hideTrivia();
    myGame.displayAnswer(myGame.triviaArray[myGame.numTrivia], userGuess);

    myGame.numTrivia++;
    myGame.userGuess = -1;

    if (myGame.numTrivia < myGame.triviaArray.length) {
        setTimeout(function(){myGame.nextTrivia(myGame.triviaArray[myGame.numTrivia]);}, 5000);
    }
    else {
        setTimeout(function(){myGame.showResult();}, 5000);
    }
}

function handleTimout() {
    console.log("Timed Out");
    
    myGame.noAnswer++;

    myGame.stopTimer();
    myGame.hideTrivia();
    myGame.displayTimeout(myGame.triviaArray[myGame.numTrivia]);
    
    myGame.numTrivia++;
    myGame.userGuess = -1;

    if (myGame.numTrivia < myGame.triviaArray.length) {
        setTimeout(function(){myGame.nextTrivia(myGame.triviaArray[myGame.numTrivia]);}, 5000);
    }
    else {
        setTimeout(function(){myGame.showResult();}, 5000);
    }
}

function setupEventHandlers(){
    $("#startButton").on("click", handleStartButtonClicked);
    $(".answer").on("click", handleAnswerClicked);
}

// Play Game
$(document).ready(function(){
    setupEventHandlers();
});