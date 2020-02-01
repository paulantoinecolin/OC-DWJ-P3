window.addEventListener('load', () => {
  const canvas = document.getElementById('sig-canvas');
  const ctx = canvas.getContext('2d');
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';

  // variables
  let drawing = false;

  function startPosition(e) {
    drawing = true;
    ctx.beginPath();
    ctx.lineTo(e.offsetX, e.offsetY);
    // sign(e);
  }

  function finishedPosition(e) {
    drawing = false;
    ctx.closePath();
  }

  function sign(e) {
    if (!drawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    // ctx.beginPath();
    // ctx.moveTo(e.clientX, e.clientY);
  }

  // EventListeners
  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', finishedPosition);
  canvas.addEventListener('mousemove', sign);
});
