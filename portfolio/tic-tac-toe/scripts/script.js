$(document).ready(function() {
  // establish variables for user and computer
  var user, comp;
  // variable to mark user/comp turn
  var turn = 0;

  // assigns X to player if "X" is clicked
  $("#turnX").click(function() {
    $(".selection").hide();
    user = "X";
    comp = "O";
  });

  // assigns O to player if "O" is clicked
  $("#turnO").click(function() {
    $(".selection").hide();
    user = "O";
    comp = "X";
  });

  // calls newGame function if "New Game" button is clicked
  $("#newGame").click(function() {
    $(".selection").show();
    $(".result").html("");
    newGame();
  });

  // calls newGame function if user wants to play again
  $("#restart").click(function() {
    $(".result").html("");
    newGame();
  });

  // what to do when box is clicked
  $(".box").click(function() {
    if (turn === 0) {
      if ($(this).text() === "") {
        $(this).text(user);
        checkBoxes();
        if (gameOver() === true) {
          return true;
        };
        turn = 1;
        compMove();
        checkBoxes();
        gameOver();
      } else {
        alert("This box is not empty!");
      }
    }
  });

  // resets board for new game
  function newGame() {
    var box = [];
    for (var i = 1; i < 10; i++) {
      box[i] = $("#" + [i]).text("");
    }
    turn = 0;
  }

  // function to check what is in each box
  function checkBoxes() {
    box1 = $("#1").html();
    box2 = $("#2").html();
    box3 = $("#3").html();
    box4 = $("#4").html();
    box5 = $("#5").html();
    box6 = $("#6").html();
    box7 = $("#7").html();
    box8 = $("#8").html();
    box9 = $("#9").html();
  }

  // function that controls computer's move
  function compMove() {
    // winning scenarios
    if (box1 === "" && ((box2 === comp && box3 === comp) || (box4 === comp && box7 === comp) || (box5 === comp && box9 === comp)))
    { $("#1").text(comp); }
    else if (box2 === "" && ((box5 === comp && box8 === comp) || (box1 === comp && box3 === comp)))
    { $("#2").text(comp); }
    else if (box3 === "" && ((box1 === comp && box2 === comp) || (box5 === comp && box7 === comp) || (box6 === comp && box9 === comp)))
    { $("#3").text(comp); }
    else if (box4 === "" && ((box5 === comp && box6 === comp) || (box1 === comp && box7 === comp)))
    { $("#4").text(comp); }
    else if (box5 === "" && ((box1 === comp && box9 === comp) || (box3 === comp && box7 === comp) || (box2 === comp && box8 === comp) || (box4 === comp && box6 === comp)))
    { $("#5").text(comp); }
    else if (box6 === "" && ((box3 === comp && box9 === comp) || (box4 === comp && box5 === comp)))
    { $("#6").text(comp); }
    else if (box7 === "" && ((box3 === comp && box5 === comp) || (box1 === comp && box4 === comp) || (box8 === comp && box9 === comp)))
    { $("#7").text(comp); }
    else if (box8 === "" && ((box2 === comp && box5 === comp) || (box7 === comp && box9 === comp)))
    { $("#8").text(comp); }
    else if (box9 === "" && ((box1 === comp && box5 === comp) || (box3 === comp && box6 === comp) || (box7 === comp && box8 === comp)))
    { $("#9").text(comp); }
    // blocking scenarios
    else if (box1 === "" && ((box2 === user && box3 === user) || (box4 === user && box7 === user) || (box5 === user && box9 === user))) {
      $("#1").text(comp);
      turn = 0;
    }
    else if (box2 === "" && ((box5 === user && box8 === user) || (box1 === user && box3 === user))) {
      $("#2").text(comp);
      turn = 0;
    }
    else if (box3 === "" && ((box1 === user && box2 === user) || (box5 === user && box7 === user) || (box6 === user && box9 === user))) {
      $("#3").text(comp);
      turn = 0;
    }
    else if (box4 === "" && ((box5 === user && box6 === user) || (box1 === user && box7 === user))) {
      $("#4").text(comp);
      turn = 0;
    }
    else if (box5 === "" && ((box1 === user && box9 === user) || (box3 === user && box7 === user) || (box2 === user && box8 === user) || (box4 === user && box6 === user))) {
      $("#5").text(comp);
      turn = 0;
    }
    else if (box6 === "" && ((box3 === user && box9 === user) || (box4 === user && box5 === user))) {
      $("#6").text(comp);
      turn = 0;
    }
    else if (box7 === "" && ((box3 === user && box5 === user) || (box1 === user && box4 === user) || (box8 === user && box9 === user))) {
      $("#7").text(comp);
      turn = 0;
    }
    else if (box8 === "" && ((box2 === user && box5 === user) || (box7 === user && box9 === user))) {
      $("#8").text(comp);
      turn = 0;
    }
    else if (box9 === "" && ((box1 === user && box5 === user) || (box3 === user && box6 === user) || (box7 === user && box8 === user))) {
      $("#9").text(comp);
      turn = 0;
    }
    // center
    else if (box5 === "") {
      $("#5").text(comp);
      turn = 0;
    }
    // end game if board is full
    else if (box1 && box2 && box3 && box4 && box5 && box6 && box7 && box8 && box9) {
      gameOver();
    }
    // randomize for everything else
    else {
      rndNumber();
    }
  };

  // function so computer makes random play if no chance to win, block or use middle
  function rndNumber() {
    var rnd = Math.floor(Math.random() * 9 + 1);
    var testBox = "#" + rnd;
    if ($(testBox).html() === user || $(testBox).html() === comp) {
      rndNumber();
    } else {
      $(testBox).text(comp);
      turn = 0;
    }
  }

  // determines if game is over via if/else statements
  function gameOver() {
    if ((box1 === user && box2 === user && box3 === user) || (box1 === user && box5 === user && box9 === user) || (box2 === user && box5 === user && box8 === user) || (box3 === user && box5 === user && box7 === user) || (box4 === user && box5 === user && box6 === user) || (box7 === user && box8 === user && box9 === user) || (box1 === user && box4 === user && box7 === user) || (box3 === user && box6 === user && box9 === user)) {
      $(".result").html("<p>You win!!!</p>");
      $(".restart").show();
      $(".start").hide();
      return true;
    } else if ((box1 === comp && box2 === comp && box3 === comp) || (box1 === comp && box5 === comp && box9 === comp) || (box2 === comp && box5 === comp && box8 === comp) || (box3 === comp && box5 === comp && box7 === comp) || (box4 === comp && box5 === comp && box6 === comp) || (box7 === comp && box8 === comp && box9 === comp) || (box1 === comp && box4 === comp && box7 === comp) || (box3 === comp && box6 === comp && box9 === comp))  {
      $(".result").html("<p>You lose!</p>");
      $(".restart").show();
      $(".start").hide();
      return true;
    } else if (box1 && box2 && box3 && box4 && box5 && box6 && box7 && box8 && box9) {
      $(".result").html("<p>It's a draw!</p>");
      $(".restart").show();
      $(".start").hide();
      return true;
    }
  };
});
