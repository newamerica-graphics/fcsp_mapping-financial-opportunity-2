var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
mapboxgl.accessToken = 'pk.eyJ1IjoibmV3YW1lcmljYW1hcGJveCIsImEiOiJjaXVmdTUzbXcwMGdsMzNwMmRweXN5eG52In0.AXO-coBbL621lzrE14xtEA';

const renderMap = function(container){
  let map = new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-87.39968844101838, 41.821170712096745],
    minzoom: 8,
    zoom: 9.446953476919033
  });

  map.on('load', () => {

      map.addLayer({
          'id': 'nbhds',
          'type': 'fill',
          'source': {
              type: 'vector',
              url: 'mapbox://newamericamapbox.9zv0nktm'
          },
          'source-layer': 'fcsp_mfo_chicago-dcfy6n',
          'paint': {
            'fill-color': 'rgba(0,0,0,0)',
            'fill-outline-color': 'rgba(51,51,51,0.5)'
          }
      });

      map.on('sourcedata', (e) => {
        if(e.isSourceLoaded && e.sourceId == 'nbhds'){
          let nbhds = map.queryRenderedFeatures({ layers: ['nbhds'] }).map(f => f.properties);
          // this context is <App /> component
          if(nbhds.length > 0) this.loadData(nbhds);
        }
      });

      map.on('mousemove', 'nbhds', (e)=>{
        if(e.features.length === 0) return;
        // this context is <App /> component
        this.handleMousemove(e.features[0].properties);
      });
  });
}

export default renderMap;
