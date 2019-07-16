// game stats variables
var correct = 0;
var incorrect = 0;
var unanswered = 0;

// timer variables
var intervalId;
var btIntervalId;
var timer = 30;
var betweenTimer = 5;
var nextQuestion = 0;

// button
var bigButton = $("#startButton");

// created array of objects to store data regarding questions
var questionsArray = [
    {
    question : "Mario first appeared in which classic video game?",
    options : ["Super Mario Bros.", "Donkey Kong", "Plumbing Simulator v2", "Yoshi's Story"],
    answer : "Donkey Kong",
    image : "https://media2.giphy.com/media/L0ZgGChrYiSBsNbVYu/giphy.gif?cid=790b76115d28bfdc76564a6e674334c4&rid=giphy.gif"
    },
    {
    question : "Aiai, Meemee, Baby, and Gongon are characters in which video game series?",
    options : ["Donkey Kong 64", "Super Monkey Ball", "Half-Life", "The Legend of Zelda"],
    answer : "Super Monkey Ball",
    image : "https://66.media.tumblr.com/74c3fd20cceb013f3f0deeb791905abd/tumblr_nhu67aaimV1r7sijxo1_400.gif"
    },
    {
    question : "Dr. Neo Cortex is the main antagonist in which video game series?",
    options : ["Crash Bandicoot", "Ratchet & Clank", "Sonic the Hedgehog", "Final Fantasy"],
    answer : "Crash Bandicoot",
    image : "https://66.media.tumblr.com/e11a1d3dbabc5acda6d8f0bf88da28b8/tumblr_oszvf2Xivw1u3fdy9o4_500.gif"
    },
    {
    question : "Underground, Project 8, and American Wasteland are installments of which video game franchise?",
    options : ["Tony Hawk's Pro Skater", "Grid", "Need for Speed", "Midnight Club"],
    answer : "Tony Hawk's Pro Skater",
    image : "https://66.media.tumblr.com/01d9afa9d2faf16fc8b8130e059d3ad9/tumblr_mqthoz0c381ri420do3_250.gif"
    },
    {
    question : 'Axel, Blaze, "Skate," and Max are playable characters in which video game?',
    options : ["Tomba! 2: The Evil Swine Return", "Brave Fencer Musashi", "Burger King PocketBike Racer", "Streets of Rage 2"],
    answer : "Streets of Rage 2",
    image : "https://media0.giphy.com/media/kgj1vsHuqsuIw/giphy.gif?cid=790b76115d28c0453578493067b74ed1&rid=giphy.gif"
    },
    {
    question : "The Umbrella Corporation is a pharmaceutical company in which video game franchise?",
    options : ["Silent Hill", "Halo 2", "Resident Evil", "Spider Man"],
    answer : "Resident Evil",
    image : "https://media0.giphy.com/media/3ohzdVcdwo4236tzEI/source.gif"
    }];


// below functions occur only when the html document is ready
$(document).ready(function() {

// creating 30 sec timer for each individual question, calling decrement function every 1 second
    function runTimer() {
        timer = 30;
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

// decrement function decrements by 1 on timer, displays time on the webpage
    function decrement() {
        timer--;
        $("#timer").html("<h3> Time Remaining : " + timer + "</h3>");
        // if the timer reaches zero, stop runTimer, start a 5 second timer to move onto the next question
        if (timer === 0) {
            stop();
            loadTimer();
            unanswered++;
            nextQuestion++;
            $("#questionInfo").empty();
            $("#questionInfo").html("<h1>You didn't even guess...</h1>");
            $("#questionInfo").append(newImage);
        }
    }

// this function clears the question timers and also the timer in between questions
    function stop () {
        clearInterval(intervalId);
        clearInterval(btIntervalId);
    }

// creates a 5 second timer that runs between questions
    function loadTimer() {
        clearInterval(btIntervalId);
        btIntervalId = setInterval(btDecrement, 1000);
    }

// if the user has answered all the questions and the between question timer is at 0, end the game
    function btDecrement () {
        betweenTimer--;
        if (nextQuestion === questionsArray.length && betweenTimer === 0) {
            stop();
            endScreen();
            // else if the user hasnt answered all questions and the timer is at 0, continue asking questions
        } else if (betweenTimer === 0) {
            stop();
            top();
        }
    };


// on clicking the button, the game will be initialized and the button is removed from the page
    $(bigButton).click(function() {
        $("#startButton").remove();
        initGame();
    });

// initializes game, resets game variables to default values and calls 'top' function
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


// this function contains the game's logic
function top() {
    // set the timer between questions to 5 seconds
        betweenTimer = 5;
    // variable j is equal to the value of nextQuestion
        let j = nextQuestion;
    // call 30 second runTimer function
        runTimer();
    // display question from questions array at index of j
        $("#questionInfo").html("<h1>" + questionsArray[j].question + "</h1>");
    
    // append the answer options of the current question being asked as buttons, assign these buttons the class of 'answers'
        for (var i = 0; i < questionsArray[j].options.length; i++) {
            $("#questionInfo").append("<button class=answers>" + questionsArray[j].options[i] + "</button>");
        }

    // on clicking any of the buttons with the class of 'answers,' set var newImage to the image property of the current question object
        $(".answers").click(function() {
            var newImage = $("<img src=" + questionsArray[j].image + ">");
            // if the value of 'this' clicked item is equal to the answer property of the current question object, stop question timer,
            // start the between question timer. increase the correct guesses and also importantly the nextQuestion variable to move onto
            // the next items in the array.
            if ($(this).html() == questionsArray[j].answer) {
                $(newImage).css({"height":"300px", "width":"300px"});
                stop();
                loadTimer();
                correct++;
                nextQuestion++;
                $("#questionInfo").empty();
                $("#questionInfo").html("<h1>You guessed correctly!</h1>");
                $("#questionInfo").append(newImage);

            } else {
                stop();
                loadTimer();
                incorrect++;
                nextQuestion++;
                $("#questionInfo").empty();
                $("#questionInfo").html("<h1>You guessed incorrectly!</h1>");
                $("#questionInfo").append(newImage);
            } 
        });
    }
    
// when endScreen is called, stop all timers, display game stats and display the button for the ability to restart  
    function endScreen () {
        stop();
        $("#questionInfo").empty();
        $("#questionInfo").html("<h1>All done!</h1>");
        $("#questionInfo").append("<h2>Times you were smart : " + correct + "</h2><br>");
        $("#questionInfo").append("<h2>Times you screwed up : " + incorrect + "</h2><br>");
        $("#questionInfo").append("<h2>Times you just didn't try : " + unanswered + "</h2><br>");
        $("#questionInfo").append(bigButton);
            $(bigButton).click(function() {
                $("#startButton").remove();
                initGame();
            });
    };
});