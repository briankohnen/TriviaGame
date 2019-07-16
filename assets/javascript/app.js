var correct = 0;
var incorrect = 0;
var unanswered = 0;
var intervalId;
var btIntervalId;
var timer = 30;
var betweenTimer = 5;
var nextQuestion = 0;
var bigButton = $("#startButton");


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
            $("#questionInfo").append(newImage);
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
        if (nextQuestion === questionsArray.length && betweenTimer === 0) {
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
            var newImage = $("<img src=" + questionsArray[j].image + ">");
            if ($(this).html() == questionsArray[j].answer) {
                $(newImage).css("height", "200px", "width", "200px");
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