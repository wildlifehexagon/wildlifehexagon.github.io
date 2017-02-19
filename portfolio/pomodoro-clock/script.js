$(document).ready(function() {
  // initialize variables for every aspect of time
  var rest = 5;
  var session = 25;
  var sessionTime;
  var breakTime;
  var minutes;
  var seconds;
  var state = "work";
  var timer;
  // variables for various IDs
  var breakLength = $("#break-length");
  var sessionLength = $("#session-length");
  var timeLeft = $("#time-left");
  var start = $(".start_stop");
  // audio variable
  var beep = document.getElementById('beep');
  // set text for session and break
  breakLength.text(rest);
  sessionLength.text(session);
  // decrease break time
  $("#break-decrement").click(function() {
    if (rest > 1) {
      rest -= 1;
    }
    breakLength.text(rest);
  });
  // decrease session time
  $("#session-decrement").click(function() {
    if (session > 1) {
      session -= 1;
      if (state === "work") {
        if (session < 10) {
          timeLeft.text('0' + session + ':00');
        } else {
          timeLeft.text(session + ':00');
        }
      }
    }
    sessionLength.text(session);
  });
  // increase break time
  $("#break-increment").click(function() {
    if (rest < 60) {
      rest += 1;
    }
    breakLength.text(rest);
  });
  // increase session time
  $("#session-increment").click(function() {
    if (session < 60) {
      session += 1;
      if (state === "work") {
        if (session < 10) {
          timeLeft.text('0' + session + ':00');
        } else {
          timeLeft.text(session + ':00');
        }
      }
    }
    sessionLength.text(session);
  });
  // control what happens on start/stop click
  $(".start_stop").click(function() {
    // toggle button to show start or stop
    var $this = $(this);
    $this.toggleClass('start_stop');
    if ($this.hasClass('start_stop')) {
      $this.text('Start');
    } else {
      $this.text('Stop');
    }
    // show timer on start
    $("#time-left").show();
    // conditionals for correct start/stop use
    if (state === "work") {
      sessionTime = session * 60;
      workCountdown();
      state = 'start';
    } else if (state === "break") {
      breakTime = rest * 60;
      breakCountdown();
      state = 'breakStart';
    } else if (state === 'start') {
      clearInterval(timer);
      state = 'pause';
    } else if (state === 'breakStart') {
      clearInterval(timer);
      state = 'breakPause';
    } else if (state === "pause") {
      workCountdown();
      state = 'start';
    } else if (state === 'breakPause') {
      breakCountdown();
      state = 'start';
    }
  });
  // go back to default settings when reset button is clicked
  $('#reset').click(function() {
    clearInterval(timer);
    rest = 5;
    session = 25;
    state = "work";
    start.toggleClass('start_stop');
    if (start.hasClass('start_stop')) {
      start.text('Start');
    } else {
      start.toggleClass('start_stop');
    }
    breakLength.html(rest);
    sessionLength.html(session);
    timeLeft.html('25:00');
    $("#timer-label").html("Session");
  });
  function workCountdown() {
    state = 'start';
    if (sessionTime >= 0) {
      minutes = Math.floor(sessionTime / 60);
      seconds = sessionTime % 60;
      if (minutes < 10 && seconds < 10) {
        timeLeft.text('0' + minutes + ':0' + seconds);
      } else if (minutes < 10) {
        timeLeft.text('0' + minutes + ':' + seconds);
      } else if (seconds < 10) {
        timeLeft.text(minutes + ':0' + seconds);
      } else {
        timeLeft.text(minutes + ':' + seconds);
      }
      sessionTime--;
      timer = setTimeout(workCountdown, 1000);
    } else {
        beep.play();
        clearInterval(timer);
        breakTime = rest * 60;
        breakCountdown();
        state = 'break';
        $("#timer-label").html("Time for your break!");
      }
  };
  function breakCountdown() {
    state = 'breakStart';
    if (breakTime >= 0) {
      minutes = Math.floor(breakTime / 60);
      seconds = breakTime % 60;
      if (minutes < 10 && seconds < 10) {
        timeLeft.text('0' + minutes + ':0' + seconds);
      } else if (minutes < 10) {
        timeLeft.text('0' + minutes + ':' + seconds);
      } else if (seconds < 10) {
        timeLeft.text(minutes + ':0' + seconds);
      } else {
        timeLeft.text(minutes + ':' + seconds);
      }
      breakTime--;
      timer = setTimeout(breakCountdown, 1000);
    } else {
        beep.play();
        clearInterval(timer);
        sessionTime = session * 60;
        workCountdown();
        state = 'work';
        $("#timer-label").html("Back to work!");
      }
  }
});
