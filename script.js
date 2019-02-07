var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;


// Button Sound

function makeSound(key) {
  switch (key) {
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;

    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;

    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;

    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;

    default:
      console.log(pressedButton);
  }
}

// Button Animation

function buttonAnimation(event) {
  var activeButton = document.querySelector("#" + event);
  activeButton.classList.add("pressed");
  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);
}

// Game Logic

function nextSequence() {

  userPattern = [];
  level++;
  document.querySelector("h1").innerHTML = `Level ${level}`;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomButton = buttonColours[randomNumber];

  makeSound(randomButton);
  buttonAnimation(randomButton);
  gamePattern.push(randomButton);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    document.querySelector("h1").innerHTML = "Game Over. Press any key to restart";
    document.querySelector("body").classList.add("game-over");
    setTimeout(function() {
      document.querySelector("body").classList.remove("game-over");
    }, 200);

    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    startAgain();
  }
}

function startAgain() {
  gamePattern = [];
  started = false;
  level = 0;
}

// Simon Game

function simonGame() {
  var body = document.querySelector("body");
  body.addEventListener("keypress", function() {

    if (!started) {
      nextSequence();
      started = true;
    }
  });

  for (i = 0; i < document.querySelectorAll(".btn").length; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function() {
      var pressedButton = this.id;
      userPattern.push(pressedButton);
      checkAnswer(userPattern.length-1);

      makeSound(pressedButton);
      buttonAnimation(pressedButton);

    });
  }
}

simonGame();
