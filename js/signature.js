class Signature {
  constructor(signatureNode) {
    this.canvas = signatureNode;
    this.canvas.setAttribute('width', this.canvas.parentElement.clientWidth);
    this.canvas.setAttribute('height', this.canvas.parentElement.clientHeight);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 4;
    this.ctx.lineCap = 'round';
    this.drawing = false;

    this.setListeners();
  }

  setListeners() {
    this.canvas.addEventListener('mousedown', this.startPosition.bind(this));
    this.canvas.addEventListener('mouseup', this.finishedPosition.bind(this));
    this.canvas.addEventListener('mousemove', this.sign.bind(this));
    this.canvas.addEventListener('mouseout', this.finishedPosition.bind(this));
  }

  startPosition(e) {
    this.drawing = true;
    this.ctx.beginPath();
    this.ctx.lineTo(e.offsetX, e.offsetY);
  }

  finishedPosition(e) {
    this.drawing = false;
    this.ctx.closePath();
  }

  sign(e) {
    if (this.drawing == true) {
      this.ctx.lineTo(e.offsetX, e.offsetY);
      this.ctx.stroke();
    }
  }

  // // clear the canvas
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

// const signature = new Signature('sig-canvas');
