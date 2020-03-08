class Timer {
  constructor() {
    this.timerDisplay = document.querySelector('.display__time-left');
    this.reservationFeedback = document.querySelector('.reservationFeedback');
    // this.buttons = document.querySelectorAll('[data-time]');
    this.countdown;
    const now = Date.now();
    // const then = now + seconds * 1000;
    // displayTimeLeft(seconds);
    // displayEndTime(then);
    // Enregistrer then dans le Session Storage
  } //END OF CONSTRUCTOR

  timer(seconds) {
    this.seconds = seconds;
    // clear any existing timers
    clearInterval(countdown);

    countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      // check if we should stop it!
      if (secondsLeft <= 0) {
        clearInterval(countdown);
        return;
      }
      // display it
      displayTimeLeft(secondsLeft);
    }, 1000);
  }

  displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${
      remainderSeconds < 10 ? '0' : ''
    }${remainderSeconds}`;
    // Show the timer on your tab title
    document.title = display;
    // Show the timer on the page
    timerDisplay.textContent = display;
  }

  displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTimeDisplay.textContent = `Votre vélo est réservé jusqu'à ${hour}:${
      minutes < 10 ? '0' : ''
    }${minutes}`;
  }

  startTimer(seconds = 1200) {
    // const seconds = parseInt(this.dataset.time, 10);
    timer(seconds);
  }
} //END OF CLASS
