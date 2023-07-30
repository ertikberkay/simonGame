

// Array of colors.
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];               //empty array.
var userClickedPattern = [];
var started = false;   //You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var level = 0;                      //2. Create a new variable called level and start at level 0.



//Using JQuery to detect when a keyboard has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
    if (!started) {

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});



//Using JQuery to detect when any of the buttons are clicked.
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");      //Stores the id of the button got clicked.
    userClickedPattern.push(userChosenColor);      //Add the contents of userChosenColor to the array userClickedPattern.

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);

});

//Creating new function checkAnswer() it should take one input with the name currentlevel.
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("succes");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
            
        }
    } else {

        console.log("wrong");

        playSound("wrong");              

        $("body").addClass("game-over");                 //Adds  CSS class game-over
        setTimeout(function() {                              
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");  //Changes the h1 title

        startOver();
    }
}




// Random number generator between 0-3.
function nextSequence() {

    userClickedPattern = [];
    
    level++;                                             //Increase level by 1 every time nextSequence() is called.
    $("#level-title").text("Level " + level);            //Inside nextSequence(), update the h1 with this change in the value of level.

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];  //Gets a random color from an array by index number.
    gamePattern.push(randomChosenColor);                 // Adds random color to empty array.


    // Using  JQuery to select the button with the same id as the randomChosenColor.
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    //Play the sound for button color selected using function.
    playSound(randomChosenColor);
}



function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}




function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {                                //Remove pressed class after 100 miliseconds
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}