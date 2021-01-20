// selected All Earthquakes from the last 30 days from the USGS GeoJSON feed 
// this data is updated every minute
var geoJson = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// use .then for d3? 
// d3.json(geoJson).then((data) => {
//     onEachFeature(data.features);
//     console.log(data.features);
// });

// Perform a GET request to the geoJson URL
// d3.json(geoJson, function(data){
//     // Once we get a response, send the data.features object to the createFeatures function
//     createFeatures(data.features);
// });

d3.json(geoJson).then(data => {
    console.log(data);
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
});


// Define a function to determine the fill color of the circles by the magnitude of the Earthquake
function fillCircleColor(mag) {
    switch (mag) {
      case mag >= 5: 
        return "red";
      case mag > 4: 
        return "orange";
      case mag > 3: 
        return "orange";
      case mag > 2:
        return "yellow";
      case mag > 1: 
        return "yellow";
      case mag > 0: 
        return "green";        
    }
};


// define a function to multiply mag for marker size for visibility
function markerSize(mag) {
    return mag * 10000;
};

// Define a function for the features to include on the map
function createFeatures(earthquakeData) {

// Define a function we want to run once for each feature in the features array 
  function circleMarker(feature, layer) {
    //var mag = feature.properties.mag; 
    var circle = L.circleMarker(feature.coordinates, {
        radius: markerSize(feature.properties.mag), 
        fillColor: fillCircleColor(feature.properties.mag),
        fillOpacity: 0.75  
    });
    circle.addTo(myMap); 
  };   

  function onEachFeature(earthquakeData) {
    var mag = earthquakeData.properties.mag
    // console.log(mag);
  };

  var earthquakesLayer = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature    
  });

  var earthquakes = L.geoJSON(earthquakeData, {
      pointToLayer: circleMarker
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakesLayer);

//close createFeatures function
};
createFeatures();


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

// createMap();    