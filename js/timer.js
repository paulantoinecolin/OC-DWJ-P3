class Timer {
  constructor(timerNode, reservation) {
    this.main = timerNode;
    this.reservation = reservation;
    this.timerDisplay = this.main.querySelector('.reservationFeedback');
    if (sessionStorage.then) {
      this.then = sessionStorage.then;
      this.timer();
    }
  }

  // Define timer duration by timestamp
  startTimer(seconds) {
    this.then = Date.now() + seconds * 1000; // Time duration value (in seconds)
    sessionStorage.then = this.then;
    this.timer();
  }

  // launch the timer
  timer() {
    clearInterval(this.countdown); // clear any existing timers
    this.displayTimeLeft(); // displayEndTime(then);
    this.countdown = setInterval(() => {
      // check if timer should be stopped
      if (this.getSecondsLeft() < 0) {
        clearInterval(this.countdown);
        sessionStorage.removeItem('then');
      }
      // display it
      this.displayTimeLeft();
    }, 1000);
  }

  // Calculate time left
  getSecondsLeft() {
    return Math.round((this.then - Date.now()) / 1000);
  }

  // displays the countdown in min/sec
  displayTimeLeft() {
    let display = 'Votre réservation a expiré';
    const seconds = this.getSecondsLeft();
    if (seconds >= 0) {
      const minutes = Math.floor(seconds / 60);
      const remainderSeconds = seconds % 60;
      display = `${minutes < 10 ? '0' : ''}${minutes}:${
        remainderSeconds < 10 ? '0' : ''
      }${remainderSeconds}`;
    }

    document.title = display; // change page title to countdown
    this.timerDisplay.textContent = this.reservation.getReservationMessage(
      display
    );
  }
}
