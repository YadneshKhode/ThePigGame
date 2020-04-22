var scores, roundScore, activePlayer, gamePlaying;
var winningScore = localStorage.getItem("maxScore");
init();
var lastDice1, lastDice2;

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    //2. Display the result
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src =
      "assets/images" + "/dice-" + dice1 + ".png";
    document.getElementById("dice-2").src =
      "assets/images" + "/dice-" + dice2 + ".png";
      // var now = new Date().getTime();
      // var millisecondsToWait = 1000; /* i.e. 1 second */

      // while ( new Date().getTime() < now + millisecondsToWait ){}

    //3. Update the round score IF the rolled number was NOT a 1
    if (dice1 !== 1 && dice2 !== 1) {
      //Add score
      roundScore = roundScore + dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //Next player
   
     
         nextPlayer();
    }

    if (
      (dice1 === 6 && (lastDice1 === 6 || lastDice2 === 6)) ||
      (dice2 === 6 && (lastDice1 === 6 || lastDice2 === 6))
    ) {
      //Player looses score
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
     } //else if (dice1 !== 1 && dice2 !== 1) {
    //   //Add score
    //   roundScore += dice1 + dice2;
    //   document.querySelector(
    //     "#current-" + activePlayer
    //   ).textContent = roundScore;
    // }
    //  else {
    //   //Next player

    //   nextPlayer();
    // }
    lastDice1 = dice1;
    lastDice2 = dice2;
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

function nextPlayer() {

  //Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);
document.querySelector("#newGameId").addEventListener("click", () => {
  window.location.href = "index.html";
});
//initialise all parameters to 0
function init() {
  if (!winningScore) {
    winningScore = 100;
  }
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  var outputScore = document.getElementById("final-score");
  document.getElementById("dice-1").style.display = "none";
  outputScore.value = "Max : " + winningScore;
  outputScore.readOnly = true;
  document.getElementById("dice-2").style.display = "none";
  player1 = localStorage.getItem("player1");
  player2 = localStorage.getItem("player2");
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  if (player1 == "") {
    document.getElementById("name-0").textContent = "Player 1";
  } else {
    document.getElementById("name-0").textContent = player1;
  }
  if (player2 == "") {
    document.getElementById("name-1").textContent = "Player 2";
  } else {
    document.getElementById("name-1").textContent = player2;
  }

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
