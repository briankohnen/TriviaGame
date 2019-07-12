var correct = 0;
var incorrect = 0;
var unanswered = 0;
var intervalId;
var btIntervalId;
var timer = 30;
var betweenTimer = 5;


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
    questions : "is this cheese?",
    options : ["its fart", "its red", "its cheese", "yes"],
    answer : "yes"
    }];


$(document).ready(function() {


    function runTimer() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
        timer--;
        $("#timer").html("<h3> Time Remaining : " + timer + "</h3>");
        if (timer === 0) {
            stop();
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
        if (betweenTimer === 0) {
            stop();
        }
    };



    $("#startButton").click(function() {
        $("#startButton").remove();
        startGame();
    });


    function startGame() {

                runTimer();
                $("#questionInfo").html("<h1>" + questionsArray[0].question + "</h1>");
            
                for (var i = 0; i < questionsArray[0].options.length; i++) {
                    $("#questionInfo").append("<button class=answers>" + questionsArray[0].options[i] + "</button>");
                }

                console.log(questionsArray[0].answer);

                $(".answers").click(function() {
                    if ($(this).html() == questionsArray[0].answer) {
                        stop();
                        loadTimer();
                        correct++;
                        $("#questionInfo").empty();
                        $("#questionInfo").html("<h1>You guessed correctly!</h1>");
                    } else {
                        stop();
                        loadTimer();
                        incorrect++;
                        $("#questionInfo").empty();
                        $("#questionInfo").html("<h1>You guessed incorrectly! You suck!</h1>");
                    }
                });




            //     runTimer();
            //     $("#questionInfo").html("<h1>" + questionsArray[1].question + "</h1>");
            
            //     for (var i = 0; i < questionsArray[1].options.length; i++) {
            //         $("#questionInfo").append("<button class=answers>" + questionsArray[1].options[i] + "</button>");
            //     }

            //     console.log(questionsArray[1].answer);

            //     $(".answers").click(function() {
            //         if ($(this).html() == questionsArray[1].answer) {
            //             stop();
            //             loadTimer();
            //             correct++;
            //         } else {
            //             stop();
            //             loadTimer();
            //             incorrect++;
            //         }
            //     });
            // };
        

    


























}
});