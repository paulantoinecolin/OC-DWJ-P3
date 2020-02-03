class Signature {
  constructor(idContainer) {
    this.canvas = document.querySelector('#' + idContainer);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 4;
    this.ctx.lineCap = 'round';
    this.drawing = false;

    this.setListeners();
  }

  setListeners() {
    // this.canvas.addEventListener('mousedown', this.startPosition.bind(this));
    this.canvas.addEventListener('mousedown', e => {
      this.startPosition(e);
    });
    this.canvas.addEventListener('mouseup', this.finishedPosition.bind(this));
    this.canvas.addEventListener('mousemove', this.sign.bind(this));
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
    if (!this.drawing) return;
    this.ctx.lineTo(e.offsetX, e.offsetY);
    this.ctx.stroke();
  }
}

const signature = new Signature('sig-canvas');

// PROCEDURAL
// window.addEventListener('load', () => {
//   const canvas = document.getElementById('sig-canvas');
//   const ctx = canvas.getContext('2d');
//   ctx.lineWidth = 4;
//   ctx.lineCap = 'round';

//   let drawing = false;

//   function startPosition(e) {
//     drawing = true;
//     ctx.beginPath();
//     ctx.lineTo(e.offsetX, e.offsetY);
//   }

//   function finishedPosition(e) {
//     drawing = false;
//     ctx.closePath();
//   }

//   function sign(e) {
//     if (!drawing) return;
//     ctx.lineTo(e.offsetX, e.offsetY);
//     ctx.stroke();
//   }

//   canvas.addEventListener('mousedown', startPosition);
//   canvas.addEventListener('mouseup', finishedPosition);
//   canvas.addEventListener('mousemove', sign);
// });
