// selected All Earthquakes from the last 30 days from the USGS GeoJSON feed 
// this data is updated every minute
var geoJson = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// Create a new map, centering over the Salt Lake City Airport to visualize earthquakes on the West Coast and Midwest U.S.
var myMap = L.map("map", {
  center: [
    40.79004113996794, -111.97816943898866
  ],
  zoom: 5,
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/light-v10",
      accessToken: API_key
    }).addTo(myMap);


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
    var earthquakes = data.features;
    console.log(earthquakes);
    // var earthquakesLayer = L.geoJSON(earthquakes, {
    //   onEachFeature: onEachEarthquake
  //}
  // color scheme from Color Brewer: https://colorbrewer2.org/#type=sequential&scheme=YlGnBu&n=7
  function fillCircleColor(mag) {
      switch (true) {
      case mag >= 5: 
        return "#0c2c84";
      case mag > 4: 
        return "#225ea8";
      case mag > 3: 
        return "#41b6c4";
      case mag > 2:
        return "#7fcdbb";
      case mag > 1: 
        return "#c7e9b4";
      case mag > 0: 
        return "#F4A460";        
    }
  }; 
    
  function markerSize(mag) {
    return mag * 4;
  };

  //function onEachEarthquake(feature,layer) {
     
    // function styleCircles(feature) {
    //     //var mag = feature.properties.mag;
    //   return {
    //       radius: markerSize(feature.properties.mag), 
    //       fillColor: fillCircleColor(feature.properties.mag),
    //       fillOpacity: 0.75  
    //   }; 
    // };  
             
  //};

    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {        
        return L.circleMarker(latlng, {
          radius: markerSize(feature.properties.mag),
          color: fillCircleColor(feature.properties.mag), 
          fillColor: fillCircleColor(feature.properties.mag),
          fillOpacity: 0.75 
        });
      },
      //style: styleCircles,
      
      //onEachFeature: onEachEarthquake 
      onEachFeature: function(feature, layer) {
        layer.bindPopup(`
        <h3>${feature.properties.place}</h3>
        <h5>Magnitude: ${feature.properties.mag}</h5>
        `);
      }
    }).addTo(myMap);
  
  //}; 
  
  // function onEachFeature(feature, layer) {
  //   layer.bindPopup(`
  //   <h3>${feature.properties.place}</h3>
  //   <h5>Magnitude: ${feature.properties.mag}</h5>
  //   `);
//}
});
  

      
    // using the features array to create a geoJson later and add to the map
    // createMap(earthquakesLayer);
    // Once we get a response, send the data.features object to the createFeatures function
    //createFeatures(data.features);




// Define a function to determine the fill color of the circles by the magnitude of the Earthquake



// define a function to multiply mag for marker size for visibility



// Define a function for the features to include on the map
//function createFeatures(earthquakeData) {

// Define a function we want to run once for each feature in the features array 

// function onEachEarthquake(feature, layer) {

//   function circleMarker(feature, layer) {
//     //var mag = feature.properties.mag; 
//     var circle = L.circle(feature.coordinates, {
//         radius: markerSize(feature.properties.mag), 
//         fillColor: fillCircleColor(feature.properties.mag),
//         fillOpacity: 0.75  
//     });
//     circle.addTo(myMap); 
//   };  
       
// };
// createMap(earthquakesLayer);


// var earthquakes = L.geoJSON(earthquakeData, {
//     pointToLayer: circleMarker
// });

  // function onEachEarthquake(earthquakeData) {
  //   var mag = earthquakeData.properties.mag
  //   // console.log(mag);
  // };

  // var earthquakesLayer = L.geoJSON(earthquakeData, {
  //     onEachFeature: onEachEarthquake    
  // });

  // var earthquakes = L.geoJSON(earthquakeData, {
  //     pointToLayer: circleMarker
  // });

  // Sending our earthquakes layer to the createMap function
  // createMap(earthquakesLayer);

//close createFeatures function
//};
//createFeatures();


// function for creating the map
// function createMap(earthquakesLayer) {
//     // streetmap layer 
//     var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//       attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//       tileSize: 512,
//       maxZoom: 18,
//       zoomOffset: -1,
//       id: "mapbox/light-v10",
//       accessToken: API_key
//     });
    
//     // create baseMaps object
//     var baseMaps = {
//         "Light Map": lightmap,
//     };
    
//     // set variable for earthquakes layer
//     var overlayMaps = {
//         Earthquakes: earthquakesLayer,
//     };
    
//     // Create a new map
//     var myMap = L.map("map", {
//         center: [
//           37.09, -95.71
//         ],
//         zoom: 5,
//         layers: [lightmap, earthquakesLayer]
//     });
//   }
    
    // L.control.layers(baseMaps, overlayMaps, {
    //     collapsed: false
    // }).addTo(myMap);  
    // };

// createMap();    