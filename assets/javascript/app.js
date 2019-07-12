var correct = 0;
var incorrect = 0;
var unanswered = 0;
var intervalId;
var btIntervalId;
var timer = 30;
var betweenTimer = 5;
var nextQuestion = 0;
var bigButton = $("#startButton");


var questionsArray = [{
    question : "is this pizza?",
    options : ["yes", "no", "its pizza", "yaaa"],
    answer : "yes"
    },
    {
    question : "is this bread?",
    options : ["no", "yes", "this is bread", "idk"],
    answer : "no"
    },
    {
    question : "is this cheese?",
    options : ["its fart", "its red", "its cheese", "yes"],
    answer : "yes"
    }];


$(document).ready(function() {


    function runTimer() {
        timer = 30;
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
        timer--;
        $("#timer").html("<h3> Time Remaining : " + timer + "</h3>");
        if (timer === 0) {
            stop();
            loadTimer();
            unanswered++;
            nextQuestion++;
            $("#questionInfo").empty();
            $("#questionInfo").html("<h1>You didn't even guess...</h1>");
        }
    }

    function stop () {
        clearInterval(intervalId);
        clearInterval(btIntervalId);
    }



    function loadTimer() {
        clearInterval(btIntervalId);
        btIntervalId = setInterval(btDecrement, 1000);
    }

    function btDecrement () {
        betweenTimer--;
        if (nextQuestion === 3 && betweenTimer === 0) {
            stop();
            endScreen();
        } else if (betweenTimer === 0) {
            stop();
            top();
        }
    };



    $(bigButton).click(function() {
        $("#startButton").remove();
        initGame();
    });


    function initGame() {
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    intervalId;
    timer = 30;
    betweenTimer = 5;
    nextQuestion = 0;
    top();
    };





function top() {

        betweenTimer = 5;

        let j = nextQuestion;
        
        runTimer();
        
        $("#questionInfo").html("<h1>" + questionsArray[j].question + "</h1>");
    

        for (var i = 0; i < questionsArray[j].options.length; i++) {
            $("#questionInfo").append("<button class=answers>" + questionsArray[j].options[i] + "</button>");
        }


        $(".answers").click(function() {
            
            if ($(this).html() == questionsArray[j].answer) {
                stop();
                loadTimer();
                correct++;
                nextQuestion++;
                $("#questionInfo").empty();
                $("#questionInfo").html("<h1>You guessed correctly!</h1>");

            } else {
                stop();
                loadTimer();
                incorrect++;
                nextQuestion++;
                $("#questionInfo").empty();
                $("#questionInfo").html("<h1>You guessed incorrectly! You suck!</h1>");

            } 
        });
    }
    
    
    function endScreen () {
        stop();
        $("#questionInfo").empty();
        $("#questionInfo").html("<h1>All done!</h1>");
        $("#questionInfo").append("Times you were smart : " + correct + "<br>");
        $("#questionInfo").append("Times you screwed up : " + incorrect + "<br>");
        $("#questionInfo").append("Times you just didn't try : " + unanswered + "<br>");
        $("#questionInfo").append(bigButton);
            $(bigButton).click(function() {
                $("#startButton").remove();
                initGame();
            });
    };
});