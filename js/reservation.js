class Reservation {
  constructor(reservationNode) {
    this.main = reservationNode;

    this.signature = new Signature(
      this.main.getElementsByClassName('sig-canvas')[0]
    );
    // this.timer = new Timer(this.main.getElementByID('timer'));

    this.lastname = this.main.getElementsByClassName('last-name')[0];
    this.firstname = this.main.getElementsByClassName('first-name')[0];
    this.buttonClear = this.main.getElementsByClassName('sig-clearBtn')[0];
    this.buttonSubmit = this.main.getElementsByClassName('sig-submitBtn')[0];

    this.buttonClear.addEventListener('click', this.clear.bind(this));
    this.buttonSubmit.addEventListener('click', this.storeData.bind(this));

    this.getLocalStorage();
  }

  clear() {
    this.signature.clear();
  }

  getLocalStorage() {
    // this.lastname.value = localStore.lastname;
    // this.firstname.value = localStore.firstname;
  }

  setLocalStorage() {
    // localStore.lastname = this.lastname.value;
    // localStore.firstname = this.firstname.value;
  }

  storeData() {
    // this.setLocalStorage();
    // this.timer.startTimer(1200);
  }
}
