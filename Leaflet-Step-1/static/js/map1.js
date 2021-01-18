// selected All Earthquakes from the last 30 days from the USGS GeoJSON feed 
// this data is updated every minute
var geoJson = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// console.log(geoJson);

// loop through the feature data and select elements for popup
function onEachFeature(feature,layer) {
    // console.log(feature,layer);
    layer.bindPopup(`
    <h3>${feature.properties.place}</h3>
    <h5>Magnitude: ${feature.properties.mag}</h5>
    `);
    var circle = L.circle(feature.coordinates, {
      radius : markerSize(feature.properties.mag), 
      fillColor: fillCircleColor(feature.properties.mag)
    });
    
    circle.addTo(myMap);
};


// request to the query URL
d3.json(geoJson, function(data) {
    // console.log(data);
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

// color for circle marker
d3.json(geoJson, function(data) {
  console.log(data);
  var earthquakes = data.features;
  console.log(earthquakes.properties);
  var magnitude = data.features.properties.mag;
  console.log(magnitude);

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
} 

// multiply mag for marker size for visibility
function markerSize(mag) {
  return mag * 10000;
}

  // earthquakes.forEach(quake => {
  //   color = "purple"
  //   if (magnitude >= 5) {
  //     color = "red"
  //   } else if (magnitude > 4.1) {
  //     color = "orange"
  //   } else if (magnitude > 3.1) {
  //     color = "orange"
  //   } else if (magnitude > 2.1) {
  //     color = "yellow"
  //   } else if (magnitude > 1.1) {
  //     color = "yellow"
  //   } else if (magnitude > 0) {
  //     color = "green"
  //   }  
  // console.log(quake.properties.mag);

  var circle = L.circle(geometry.coordinates) 
  console.log(geometry.coordinates); 

  var earthquakesLayer = L.geoJSON(earthquakes, {
      onEachFeature: onEachFeature,
  });
  createMap(earthquakesLayer);
});
//});



