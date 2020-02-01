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
