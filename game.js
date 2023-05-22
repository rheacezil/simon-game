var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

var level = 0;

$(document).keypress(function() {
  if (!started) {

    //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  //function to play sound on user click
  playSound(userChosenColor);
  console.log(userClickedPattern);

  //function to animate on user click
  animatePress(userChosenColor);

  //after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success")

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");
    wrongSound();
  }

}

function nextSequence() {

  userClickedPattern = [];

  //Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
  // var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  // audio.play();
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
};

function wrongSound() {
  var audio = new Audio("sounds/wrong.mp3")
  audio.play();

  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over")
  }, 2000);

  $("#level-title").text("Game Over, Press Any Key to Restart");

  startOver();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}
