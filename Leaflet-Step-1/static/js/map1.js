// selected All Earthquakes from the last 30 days from the USGS GeoJSON feed 
// this data is updated every minute
var geoJson = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

console.log(geoJson);

// loop through the feature data and select elements for popup
function onEachFeature(feature,layer) {
    // console.log(feature,layer);
    layer.bindPopup(`
    <h3>${feature.properties.place}</h3>
    <h5>Magnitude: ${feature.properties.mag}</h5>
    `);
  }

// request to the query URL
d3.json(geoJson, function(data) {
    console.log(data);
    var earthquakes = data.features;

    var earthquakesLayer = L.geoJSON(earthquakes, {
        onEachFeature: onEachFeature,
    });
    createMap(earthquakesLayer);
});



function createMap(earthquakesLayer) {
// streetmap layer 
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_key
});

// create baseMaps object
var baseMaps = {
    "Street Map": streetmap,
};

// set variable for earthquakes layer
var overlayMaps = {
    Earthquakes: earthquakesLayer
};

// Create a new map
var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakesLayer]
  });

L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);  
}