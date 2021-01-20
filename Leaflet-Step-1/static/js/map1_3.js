// selected All Earthquakes from the last 30 days from the USGS GeoJSON feed 
// this data is updated every minute
var geoJson = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

d3.json(geoJson).then(data => {
    console.log(data);
    // Once we get a response, send the data.features object to the createFeatures function
});

// create map

function createMap(earthquakesLayer) {
var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
});

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/light-v10",
      accessToken: API_key
    }).addTo(myMap);

};    

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

function markerSize(mag) {
    return mag * 10000;
};  

function circleMarker(feature, layer) {
    var mag = feature.properties.mag; 
    var circle = L.circleMarker(feature.coordinates, {
        radius: markerSize(mag), 
        fillColor: fillCircleColor(mag),
        fillOpacity: 0.75  
    });
    circle.addTo(myMap); 
  };  

function onEachEarthquake(feature, layer) {
    console.log(feature, layer);
    layer.bindPopup(`
    <h3>${feature.properties.place}</h3>
    <h5>Magnitude: ${feature.properties.mag}</h5>
    `);
}

// Define a function for the features to include on the map
// function createFeatures(earthquakeData) {

    // Define a function we want to run once for each feature in the features array 
    //   function circleMarker(feature, layer) {
    //     //var mag = feature.properties.mag; 
    //     var circle = L.circleMarker(feature.coordinates, {
    //         radius: markerSize(feature.properties.mag), 
    //         fillColor: fillCircleColor(feature.properties.mag),
    //         fillOpacity: 0.75  
    //     });
    //     circle.addTo(myMap); 
    //   };   
    
    //   function onEachFeature(feature, layer) {
    //     var mag = earthquakeData.properties.mag
    //   };
    
    //   var earthquakesLayer = L.geoJSON(earthquakeData, {
    //       onEachFeature: onEachFeature    
    //   });
    
    //   var earthquakes = L.geoJSON(earthquakeData, {
    //       pointToLayer: circleMarker
    //   });
    
    //   // Sending our earthquakes layer to the createMap function
    //   // createMap(earthquakesLayer);
    
    // //close createFeatures function
    // };
    // createFeatures();  