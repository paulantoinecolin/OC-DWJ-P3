window.onload = function() {
  const diaporama = new Diaporama('diapo');
  const map = new Map(document.getElementById('map'));
  const reservation = new Reservation(
    document.getElementById('reservation'),
    document.getElementById('timer')
  );
};
