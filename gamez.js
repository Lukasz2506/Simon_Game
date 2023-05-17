var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = 0;


//Key press detection.
$(document).keypress(function(){
    if (!gameStart) { 
    nextSequence();
    gameStart = true;
    }
})

var clickedButton = $(".btn");
clickedButton.on("click", function() {
    var userChosenColour = this.id;
    //console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    makeSound(userChosenColour);
    makeAnimation(this);
    console.log(userClickedPattern);
    console.log("game: " + gamePattern);
    checkAnswer(userClickedPattern.length-1);
});






function nextSequence () {
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var theButton = $("#" + randomChosenColour);
    theButton.fadeOut(100).fadeIn(100);
    var name = theButton.attr("id");
    //console.log(name);
    makeSound(name);
    makeAnimation(theButton);
    level ++;
    $("h1").text("Level: " + level);
    }
    

function makeSound(name) {
    var newSound = new Audio("./sounds/" + name + ".mp3");
    newSound.play();
    //console.log('sound.executed');
}

function makeAnimation (name) {
    $(name).addClass("pressed");
    setTimeout(function(){
        $(name).removeClass("pressed");
    },100);
    
}

function checkAnswer(curentLevel){
    console.log(curentLevel);
    console.log("user: " + userClickedPattern);
    console.log("game: " + gamePattern);
    if (userClickedPattern[curentLevel] === gamePattern[curentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function(){
                nextSequence();
                userClickedPattern = []
            },1000)
        }
    } else {
        var changeBody = $("body");
        changeBody.addClass("game-over");
        setTimeout(function(){
            changeBody.removeClass("game-over"),1000
        });
        makeSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        level = 0;
        userClickedPattern = [];
        gamePattern = [];
        gameStart = false;
        $(document).keypress(function(){
            if (!gameStart) { 
            nextSequence();
            gameStart = true;
            }
        })
    }
}
    






// console.log(gamePattern)