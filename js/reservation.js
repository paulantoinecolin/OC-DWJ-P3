class Reservation {
  constructor(reservationNode, timerNode) {
    this.main = reservationNode;
    this.rgx = /^[a-zA-Z][a-zA-Z-_.]{1,20}$/;

    this.signature = new Signature(this.main.querySelector('.sig-canvas'));
    this.drawingTrue = this.signature.drawingValidation;

    // this.lastname = this.main.getElementsByClassName('last-name')[0];
    this.lastname = this.main.querySelector('.last-name');
    this.firstname = this.main.querySelector('.first-name');
    this.buttonClose = this.main.querySelector('.delete');
    this.buttonClear = this.main.querySelector('.sig-clearBtn');
    this.buttonSubmit = this.main.querySelector('.sig-submitBtn');

    this.buttonClose.addEventListener('click', this.closeForm.bind(this));
    this.buttonClear.addEventListener('click', this.clear.bind(this));
    this.buttonSubmit.addEventListener('click', this.storeData.bind(this));
    this.lastname.addEventListener('blur', this.lastnameValidation.bind(this));
    this.firstname.addEventListener(
      'blur',
      this.firstnameValidation.bind(this)
    );

    this.timer = new Timer(timerNode, this);
    this.getLocalStorage();
    this.getSessionStorage();
    this.reservationValidation();
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

  lastnameValidation() {
    if (this.rgx.test(this.lastname.value) == false) {
      this.lastname.classList.remove('is-success');
      this.lastname.classList.add('is-danger');
    } else if (this.rgx.test(this.lastname.value) == true) {
      this.lastname.classList.remove('is-danger');
      this.lastname.classList.add('is-success');
    }
  }

  firstnameValidation() {
    if (this.rgx.test(this.firstname.value) == false) {
      this.firstname.classList.remove('is-success');
      this.firstname.classList.add('is-danger');
    } else if (this.rgx.test(this.firstname.value) == true) {
      this.firstname.classList.remove('is-danger');
      this.firstname.classList.add('is-success');
    }
  }

  reservationValidation() {
    if (this.lastname.classList.contains('is-success')) {
      console.log('lasname is ok');
      // this.buttonSubmit.disabled = false;
    }
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
