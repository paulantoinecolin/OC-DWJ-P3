class Map {
  constructor(mapNode) {
    this.map = mapNode;
    this.stationName = document.getElementById('stationName');
    this.stationAddress = document.getElementById('stationAddress');
    this.bikeAvailable = document.getElementById('bikeAvailable');
    this.parkingAvailable = document.getElementById('parkingAvailable');

    mapboxgl.accessToken =
      'pk.eyJ1IjoicGF1bGFudG9pbmVjb2xpbiIsImEiOiJjazBqYmdiYWIwOGFjM2huMTR0enVpejk1In0.DmB49AgRVNtdlx9L_HKZlQ';

    this.container = new mapboxgl.Map({
      container: 'map', // div id from index.html
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [4.859900325525473, 45.75373343249737],
      minZoom: 12
    });

    this.container.addControl(new mapboxgl.NavigationControl(), 'top-left');

    this.ajaxGet(
      'https://api.jcdecaux.com/vls/v3/stations?contract=lyon&apiKey=ceb9bf298a04c4be43e722b64824d650cf690bf3',
      data => {
        this.setMarkers(data);
      }
    );
  }

  setMarkers(data) {
    const stations = JSON.parse(data);

    stations.forEach(station => {
      // create a HTML element for each feature
      const el = document.createElement('div');
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
        .addTo(this.container);

      el.addEventListener('click', () => {
        this.onMarkerClick(station);
      });
    });
  }

  onMarkerClick(station) {
    // change selected marker

    // open reservation aside
    if (
      station.status === 'CLOSED' ||
      station.totalStands.availabilities.bikes === 0
    ) {
      document.getElementById('reservation').style.display = 'none';
      return;
    } else {
      document.getElementById('reservation').style.display = 'block';

      stationName.innerHTML =
        '<strong>STATION : </strong>' + station.name.split(' - ')[1];
      stationName.setAttribute('data-name', station.name.split(' - ')[1]);
      stationAddress.innerHTML =
        '<strong>ADRESSE : </strong>' + station.address;
      bikeAvailable.innerHTML = station.totalStands.availabilities.bikes;
      parkingAvailable.innerHTML = station.totalStands.availabilities.stands;
    }

    // center Marker on clic
    // this.container.flyTo({
    //   center: [station.position.longitude, station.position.latitude],
    //   zoom: 13,
    //   speed: 0.2,
    //   curve: 1.42,
    //   maxDuration: 1,
    //   easing(t) {
    //     return t;
    //   }
    // });
  }

  // AJAX request
  ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.addEventListener('load', () => {
      if (req.status >= 200 && req.status < 400) {
        // Appelle la fonction callback en lui passant la réponse de la requête
        callback(req.responseText);
      } else {
        console.error(req.status + ' ' + req.statusText + ' ' + url);
      }
    });
    req.addEventListener('error', () => {
      console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
  }
}
