class Reservation {
  constructor(reservationNode, timerNode) {
    this.main = reservationNode;

    this.signature = new Signature(this.main.querySelector('.sig-canvas'));

    // this.lastname = this.main.getElementsByClassName('last-name')[0];
    this.lastname = this.main.querySelector('.last-name');
    this.firstname = this.main.querySelector('.first-name');
    this.buttonClear = this.main.querySelector('.sig-clearBtn');
    this.buttonSubmit = this.main.querySelector('.sig-submitBtn');

    this.buttonClear.addEventListener('click', this.clear.bind(this));
    this.buttonSubmit.addEventListener('click', this.storeData.bind(this));

    // this.buttonSubmit.addEventListener('click', () => {
    // regex
    //   this.storeData.bind(this);
    // });

    this.timer = new Timer(timerNode, this);
    this.getLocalStorage();
    this.getSessionStorage();
  }

  clear() {
    this.signature.clear();
  }

  getLocalStorage() {
    this.lastname.value = localStorage.getItem('lastname');
    this.firstname.value = localStorage.getItem('firstname');
  }

  setLocalStorage() {
    localStorage.firstname = this.firstname.value;
    localStorage.lastname = this.lastname.value;
  }

  getSessionStorage() {
    this.stationName = sessionStorage.stationName;
  }

  setSessionStorage() {
    sessionStorage.stationName = this.stationName;
  }

  storeData() {
    this.timer.startTimer(1200);
    this.stationName = document
      .getElementById('stationName')
      .getAttribute('data-name');
    this.setLocalStorage();
    this.setSessionStorage();
  }

  getLastName() {
    return this.lastname.value;
  }

  getReservationMessage(timeLeft) {
    return (
      'Vélo réservé à la station ' +
      this.stationName +
      ' par ' +
      this.firstname.value +
      ' ' +
      this.lastname.value +
      ' — Temps restant : ' +
      timeLeft
    );
  }
}
