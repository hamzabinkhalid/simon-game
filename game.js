var started = true;
var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

$(document).keydown(function (e){
    if(started === true){
        $("h1").text("level " + level);
        nextSequence();
        started = false;
    }else{
        //startOver();
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    //console.log(userClickedPattern + " " + gamePattern);
    checkAnswer(userClickedPattern.length-1);
    // if(userClickedPattern[userClickedPattern.length-1] === gamePattern[gamePattern.length-1]){
    //     nextSequence();
    // }

});

function nextSequence () {
    userClickedPattern = [];
    level++;
    $("h1").text("level " + level);
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    var buttonSound = new Audio("sounds/" + randomChoosenColor + ".mp3");
    buttonSound.play();
}



function playSound(name){
    var buttonSound = new Audio("sounds/" + name + ".mp3");
    buttonSound.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){ 
        document.querySelector("#" + currentColor).classList.remove("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){ 
        document.querySelector("body").classList.remove("game-over");
        }, 200);

        startOver();
    }
}

function startOver () {
    level = 0;
    started = true;
    gamePattern = [];
}