var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoibmV3YW1lcmljYW1hcGJveCIsImEiOiJjaXVmdTUzbXcwMGdsMzNwMmRweXN5eG52In0.AXO-coBbL621lzrE14xtEA';
var map = new mapboxgl.Map({
  container: 'viz__fcsp_mapping-financial-opportunity',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-87.497262, 41.843595], // starting position [lng, lat]
  zoom: 9.69 // starting zoom
});

map.on('load', function () {

    map.addLayer({
        'id': 'nbhds',
        'type': 'fill',
        'source': {
            type: 'vector',
            url: 'mapbox://newamericamapbox.9zv0nktm'
        },
        'source-layer': 'fcsp_mfo_chicago-dcfy6n',
        'paint': {
          'fill-color': '#333'
        }
    });
});
