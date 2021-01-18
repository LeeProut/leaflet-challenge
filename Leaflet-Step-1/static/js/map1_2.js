// selected All Earthquakes from the last 30 days from the USGS GeoJSON feed 
// this data is updated every minute
var geoJson = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

var magnitude = []; 
var coordinates = [];
var place = [];

// d3.json(geoJson).then((data) => {
//     onEachFeature(data.features);
//     console.log(data.features);
// });

// Perform a GET request to the geoJson URL
d3.json(geoJson, function(data){
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

// Define a function we want to run once for each feature in the features array 
  function circleMarker(feature, layer) {
    //var mag = feature.properties.mag; 
    var circle = L.circle(feature.coordinates, {
        radius: markerSize(feature.properties.mag), 
        fillcolor: fillCircleColor(feature.properties.mag)
    });
    circle.addTo(myMap);
  };   

  function onEachFeature(earthquakeData) {
    var mag = earthquakeData.properties.mag
    console.log(mag);
  };

  var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature  
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);

//close createFeatures function
};

// d3.json(geoJson, function(data){
//     console.log(data);

//     var getMag = data.properties.mag;
//     console.log(getMag);
//     getMag.forEach(quake => {
//         mag = quake.mag; 
//         magnitude.push(mag);
//     }) 
// })

// console.log(magnitude);

// function for creating the map
function createMap(earthquakesLayer) {
    // streetmap layer 
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/light-v10",
      accessToken: API_key
    });
    
    // create baseMaps object
    var baseMaps = {
        "Light Map": lightmap,
    };
    
    // set variable for earthquakes layer
    var overlayMaps = {
        Earthquakes: earthquakesLayer,
    };
    
    // Create a new map
    var myMap = L.map("map", {
        center: [
          37.09, -95.71
        ],
        zoom: 5,
        layers: [lightmap, earthquakesLayer]
    });
    
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);  
    };

createMap();    