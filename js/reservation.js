class Reservation {
  constructor(reservationNode, timerNode) {
    this.main = reservationNode;

    this.signature = new Signature(this.main.querySelector('.sig-canvas'));

    // this.lastname = this.main.getElementsByClassName('last-name')[0];
    this.lastname = this.main.querySelector('.last-name');
    this.firstname = this.main.querySelector('.first-name');
    this.buttonClose = this.main.querySelector('.delete');
    this.buttonClear = this.main.querySelector('.sig-clearBtn');
    this.buttonSubmit = this.main.querySelector('.sig-submitBtn');

    this.buttonClose.addEventListener('click', this.closeForm.bind(this));
    this.buttonClear.addEventListener('click', this.clear.bind(this));
    this.buttonSubmit.addEventListener('click', this.storeData.bind(this));
    this.buttonSubmit.addEventListener('click', () => {
      let rgx = /^[a-zA-Z][a-zA-Z-_.]{1,20}$/;
      if (rgx.test(this.lastname.value) || rgx.test(this.firstname.value)) {
        alert('Les champs renseignés dans le formulaire ne sont pas valides');
      }
    });

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

  storeData() {
    if (this.signature.drawingValidation === true) {
      this.timer.startTimer(1200);
      this.stationName = document
        .getElementById('stationName')
        .getAttribute('data-name');
      this.setLocalStorage();
      this.setSessionStorage();
    } else if (this.signature.drawingValidation === false) {
      alert('Vous avez oublié de signer');
    }
  }

  getLastName() {
    return this.lastname.value;
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
      ' — Temps restant : ' +
      timeLeft
    );
  }
}
