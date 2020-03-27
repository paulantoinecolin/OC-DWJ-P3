'use strict';
class Reservation {
  constructor(reservationNode, timerNode) {
    this.main = reservationNode;
    this.rgx = /^[a-zA-Z][a-zA-Z-_. ]{1,20}$/;

    this.signature = new Signature(
      this.main.querySelector('.sig-canvas'),
      this
    );

    // this.lastname = this.main.getElementsByClassName('last-name')[0];
    this.lastname = this.main.querySelector('.last-name');
    this.firstname = this.main.querySelector('.first-name');
    this.buttonClose = this.main.querySelector('.delete'); // Close btn for the aside
    this.buttonClear = this.main.querySelector('.sig-clearBtn'); // Eraser btn for canvas
    this.buttonSubmit = this.main.querySelector('.sig-submitBtn'); // Validation btn for reservation

    this.buttonClose.addEventListener('click', this.closeForm.bind(this));
    this.buttonClear.addEventListener('click', this.clear.bind(this));
    this.buttonSubmit.addEventListener('click', this.storeData.bind(this));
    this.lastname.addEventListener(
      'blur',
      this.reservationValidation.bind(this)
    );
    this.firstname.addEventListener(
      'blur',
      this.reservationValidation.bind(this)
    );

    this.timer = new Timer(timerNode, this);
    this.getLocalStorage();
    this.getSessionStorage();
  }

  closeForm() {
    document.getElementById('reservation').style.display = 'none';
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

  checkInput(el) {
    if (this.rgx.test(el.value) == false) {
      el.classList.remove('is-success');
      el.classList.add('is-danger');
      return false;
    } else {
      el.classList.remove('is-danger');
      el.classList.add('is-success');
      return true;
    }
  }

  reservationValidation() {
    const step1 = this.checkInput(this.lastname);
    const step2 = this.checkInput(this.firstname);
    const step3 = this.signature.drawingValidation;
    if (step1 && step2 && step3) {
      this.buttonSubmit.disabled = false;
    } else {
      this.buttonSubmit.disabled = true;
    }
  }

  storeData() {
    this.timer.startTimer(1200);
    this.stationName = document
      .getElementById('stationName')
      .getAttribute('data-name');
    this.setLocalStorage();
    this.setSessionStorage();
    this.closeForm();
  }

  getReservationMessage(timeLeft) {
    document.getElementById('timer').style.display = 'block';
    return (
      'Vélo réservé à la station ' +
      this.stationName +
      ' par ' +
      this.firstname.value +
      ' ' +
      this.lastname.value +
      ' -  ' +
      timeLeft
    );
  }
}
