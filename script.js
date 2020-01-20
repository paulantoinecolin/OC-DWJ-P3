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

        // Open reservation form
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

let canvas = document.getElementById('sig-canvas');
let context = canvas.getContext('2d');
context.strokeStyle = '222222';
context.lineWidth = 4;

// // Canvas for signature
// (function() {
//   window.requestAnimFrame = (function(callback) {
//     return (
//       window.requestAnimationFrame ||
//       window.webkitRequestAnimationFrame ||
//       window.mozRequestAnimationFrame ||
//       window.oRequestAnimationFrame ||
//       window.msRequestAnimaitonFrame ||
//       function(callback) {
//         window.setTimeout(callback, 1000 / 60);
//       }
//     );
//   })();

//   var canvas = document.getElementById('sig-canvas');
//   var ctx = canvas.getContext('2d');
//   ctx.strokeStyle = '#222222';
//   ctx.lineWidth = 4;

//   var drawing = false;
//   var mousePos = {
//     x: 0,
//     y: 0
//   };
//   var lastPos = mousePos;

//   canvas.addEventListener(
//     'mousedown',
//     function(e) {
//       console.log(e.type);
//       drawing = true;
//       lastPos = getMousePos(canvas, e);
//     },
//     false
//   );

//   canvas.addEventListener(
//     'mouseup',
//     function(e) {
//       drawing = false;
//     },
//     false
//   );

//   canvas.addEventListener(
//     'mousemove',
//     function(e) {
//       mousePos = getMousePos(canvas, e);
//     },
//     false
//   );

//   // Add touch event support for mobile
//   canvas.addEventListener('touchstart', function(e) {}, false);

//   canvas.addEventListener(
//     'touchmove',
//     function(e) {
//       var touch = e.touches[0];
//       var me = new MouseEvent('mousemove', {
//         clientX: touch.clientX,
//         clientY: touch.clientY
//       });
//       canvas.dispatchEvent(me);
//     },
//     false
//   );

//   canvas.addEventListener(
//     'touchstart',
//     function(e) {
//       mousePos = getTouchPos(canvas, e);
//       var touch = e.touches[0];
//       var me = new MouseEvent('mousedown', {
//         clientX: touch.clientX,
//         clientY: touch.clientY
//       });
//       canvas.dispatchEvent(me);
//     },
//     false
//   );

//   canvas.addEventListener(
//     'touchend',
//     function(e) {
//       var me = new MouseEvent('mouseup', {});
//       canvas.dispatchEvent(me);
//     },
//     false
//   );

//   function getMousePos(canvasDom, mouseEvent) {
//     var rect = canvasDom.getBoundingClientRect();
//     return {
//       x: mouseEvent.clientX - rect.left,
//       y: mouseEvent.clientY - rect.top
//     };
//   }

//   function getTouchPos(canvasDom, touchEvent) {
//     var rect = canvasDom.getBoundingClientRect();
//     return {
//       x: touchEvent.touches[0].clientX - rect.left,
//       y: touchEvent.touches[0].clientY - rect.top
//     };
//   }

//   function renderCanvas() {
//     if (drawing) {
//       ctx.moveTo(lastPos.x, lastPos.y);
//       ctx.lineTo(mousePos.x, mousePos.y);
//       ctx.stroke();
//       lastPos = mousePos;
//     }
//   }

//   // Prevent scrolling when touching the canvas
//   document.body.addEventListener(
//     'touchstart',
//     function(e) {
//       if (e.target == canvas) {
//         e.preventDefault();
//       }
//     },
//     false
//   );
//   document.body.addEventListener(
//     'touchend',
//     function(e) {
//       if (e.target == canvas) {
//         e.preventDefault();
//       }
//     },
//     false
//   );
//   document.body.addEventListener(
//     'touchmove',
//     function(e) {
//       if (e.target == canvas) {
//         e.preventDefault();
//       }
//     },
//     false
//   );

//   (function drawLoop() {
//     requestAnimFrame(drawLoop);
//     renderCanvas();
//   })();

//   function clearCanvas() {
//     canvas.width = canvas.width;
//   }

//   // Set up the UI
//   var sigText = document.getElementById('sig-dataUrl');
//   var sigImage = document.getElementById('sig-image');
//   var clearBtn = document.getElementById('sig-clearBtn');
//   var submitBtn = document.getElementById('sig-submitBtn');
//   clearBtn.addEventListener(
//     'click',
//     function(e) {
//       clearCanvas();
//       sigText.innerHTML = 'Data URL for your signature will go here!';
//       sigImage.setAttribute('src', '');
//     },
//     false
//   );
//   submitBtn.addEventListener(
//     'click',
//     function(e) {
//       var dataUrl = canvas.toDataURL();
//       sigText.innerHTML = dataUrl;
//       sigImage.setAttribute('src', dataUrl);
//     },
//     false
//   );
// })();
