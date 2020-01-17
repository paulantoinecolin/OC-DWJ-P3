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
map.addControl(new mapboxgl.NavigationControl());

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

ajaxGet('stations.json', data => {
  var stations = JSON.parse(data);

  stations.forEach(function(station) {
    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat([station.position.longitude, station.position.latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            '<h3>' +
              station.name +
              '</br>' +
              station.totalStands.availabilities.bikes +
              '</h3>'
          )
      )
      .addTo(map);
  });
});

// Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
map.on('click', 'symbols', function(e) {
  map.flyTo({ center: e.features[0].geometry.coordinates });
});
