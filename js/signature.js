class Signature {
  constructor(signatureNode, reservation) {
    this.reservation = reservation;
    this.canvas = signatureNode;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 4;
    this.ctx.lineCap = 'round';
    this.drawing = false;
    this.drawingValidation = false;
    this.setListeners();
  }

  setListeners() {
    this.canvas.addEventListener('mousedown', this.startPosition.bind(this));
    this.canvas.addEventListener('mouseup', this.finishedPosition.bind(this));
    this.canvas.addEventListener('mousemove', this.sign.bind(this));
    this.canvas.addEventListener('mouseout', this.finishedPosition.bind(this));
    this.canvas.addEventListener('touchstart', this.startPosition.bind(this));
    this.canvas.addEventListener('touchend', this.finishedPosition.bind(this));
    this.canvas.addEventListener('touchmove', this.sign.bind(this));
  }

  startPosition(e) {
    this.drawing = true;
    if (e.type == 'mousedown') {
      this.ctx.beginPath();
      this.ctx.lineTo(e.offsetX, e.offsetY);
    } else if (e.type == 'touchstart') {
      let rect = this.canvas.getBoundingClientRect();
      let x = e.targetTouches[0].clientX - rect.left;
      let y = e.targetTouches[0].clientY - rect.top;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      e.preventDefault();
    }
    this.drawingValidation = true;
    this.reservation.reservationValidation();
  }

  finishedPosition(e) {
    this.drawing = false;
    this.ctx.closePath();
    e.preventDefault();
  }

  sign(e) {
    if (this.drawing == true) {
      if (e.type == 'mousemove') {
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
      } else if (e.type == 'touchmove') {
        console.log('touchmove');
        let rect = this.canvas.getBoundingClientRect();
        let x = e.targetTouches[0].clientX - rect.left;
        let y = e.targetTouches[0].clientY - rect.top;
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        e.preventDefault();
      }
    }
  }

  // // clear the canvas
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawingValidation = false;
    this.reservation.reservationValidation();
  }
}
