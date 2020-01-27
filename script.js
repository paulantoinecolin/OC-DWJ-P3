// DIAPORAMA
class Diaporama {
  constructor(idContainer) {
    this.index = 0;
    this.container = document.querySelector('#' + idContainer);
    this.slides = this.container.querySelectorAll('figure');
    this.btnPrev = this.container.querySelector('.prev');
    this.btnNext = this.container.querySelector('.next');

    this.playing = true; // Slideshow is playing by default
    this.pauseButton = this.container.querySelector('.btnPause');

    this.setListeners();
    this.showSlides();
    this.playSlideshow();
  }

  setListeners() {
    this.btnPrev.addEventListener('click', () => {
      this.plusSlides(-1);
    });
    this.btnNext.addEventListener('click', () => {
      this.plusSlides(1);
    });

    window.addEventListener('keydown', e => {
      if (e.keyCode == '37') {
        this.plusSlides(-1);
      } else if (e.keyCode == '39') {
        this.plusSlides(1);
      }
    });

    this.pauseButton.addEventListener('click', () => {
      if (this.playing) {
        this.pauseSlideshow();
      } else {
        this.playSlideshow();
      }
    });
  }

  // Reveal hidden slide
  showSlides() {
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].style.display = 'none';
    }
    this.slides[this.index].style.display = 'block';
  }

  // Automatic Slideshow
  playSlideshow() {
    this.pauseButton.classList.replace('fa-play-circle', 'fa-pause-circle');
    this.playing = true;
    this.slideInterval = setInterval(() => {
      this.plusSlides(1);
    }, 5000); // Change image every 5 seconds
  }

  // Next/previous controls
  plusSlides(n) {
    this.index += n;
    if (this.index >= this.slides.length) {
      this.index = 0;
    }
    if (this.index < 0) {
      this.index = this.slides.length - 1;
    }
    this.showSlides();
  }

  // Play/Pause controls
  pauseSlideshow() {
    this.pauseButton.classList.replace('fa-pause-circle', 'fa-play-circle');
    this.playing = false;
    clearInterval(this.slideInterval);
  }
}

const diaporama = new Diaporama('diapo');

// MAP + MARKERS
mapboxgl.accessToken =
  'pk.eyJ1IjoicGF1bGFudG9pbmVjb2xpbiIsImEiOiJjazBqYmdiYWIwOGFjM2huMTR0enVpejk1In0.DmB49AgRVNtdlx9L_HKZlQ';

// Initialize the map
let map = new mapboxgl.Map({
  container: 'map', // div id from index.html
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [4.859900325525473, 45.75373343249737],
  minZoom: 11.76579926226891
});

// Switch  option between street <> Satellite view
var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
  var layerId = layer.target.id;
  map.setStyle('mapbox://styles/mapbox/' + layerId);
}

for (var i = 0; i < inputs.length; i++) {
  inputs[i].onclick = switchLayer;
}

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl(), 'top-left');

// Make an AJAX GET request
function ajaxGet(url, callback) {
  var req = new XMLHttpRequest();
  req.open('GET', url);
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      // Appelle la fonction callback en lui passant la réponse de la requête
      callback(req.responseText);
    } else {
      console.error(req.status + ' ' + req.statusText + ' ' + url);
    }
  });
  req.addEventListener('error', function() {
    console.error("Erreur réseau avec l'URL " + url);
  });
  req.send(null);
}

ajaxGet(
  'https://api.jcdecaux.com/vls/v3/stations?contract=lyon&apiKey=ceb9bf298a04c4be43e722b64824d650cf690bf3',
  data => {
    var stations = JSON.parse(data);

    stations.forEach(function(station) {
      // create a HTML element for each feature
      var el = document.createElement('div');
      if (station.status === 'OPEN') {
        if (station.totalStands.availabilities.bikes === 0) {
          el.className = 'marker-red';
        } else {
          el.className = 'marker-green';
        }
      } else {
        el.className = 'marker-closed';
      }

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat([station.position.longitude, station.position.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              '<h4 id="popup">' +
                station.name +
                '</br>' +
                station.totalStands.availabilities.bikes +
                '</h4>'
            )
        )
        .addTo(map);

      const stationName = document.getElementById('stationName');
      const stationAddress = document.getElementById('stationAddress');
      const bikeAvailable = document.getElementById('bikeAvailable');
      const parkingAvailable = document.getElementById('parkingAvailable');

      el.addEventListener('click', e => {
        // Center Marker on clic
        map.flyTo({
          center: [station.position.longitude, station.position.latitude],
          zoom: 13,
          speed: 0.2,
          curve: 1.42,
          maxDuration: 1,
          easing(t) {
            return t;
          }
        });

        // Open reservation aside
        if (
          station.status === 'CLOSED' ||
          station.totalStands.availabilities.bikes === 0
        ) {
          document.getElementById('reservation').style.display = 'none';
          return;
        } else {
          document.getElementById('reservation').style.display = 'block';
          stationName.innerHTML = station.name;
          stationAddress.innerHTML = station.address;
          bikeAvailable.innerHTML = station.totalStands.availabilities.bikes;
          parkingAvailable.innerHTML =
            station.totalStands.availabilities.stands;
        }
      });
    });
  }
);

// CANVAS
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
