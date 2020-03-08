class Timer {
  constructor(timerNode) {
    this.timer = timerNode;
    // Enregistrer then dans le Session Storage
  }
}

let countdown;
const timerDisplay = document.querySelector('.reservationFeedback'); //

function timer(seconds) {
  clearInterval(countdown); // clear any existing timers
  const now = Date.now(); // starting Time
  const then = now + seconds * 1000; // Time duration value (in seconds)
  displayTimeLeft(seconds); // displayEndTime(then);

  // countdown from "left time" to zero
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

// displays the countdown in min/sec
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes < 10 ? '0' : ''}${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;
  document.title = display; // change page title to countdown
  timerDisplay.textContent = display;
}

// launch the timer
function startTimer(seconds) {
  timer(seconds);
}
