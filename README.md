# Mapping Earthquake Data 

## Visualizing United States Geological Survey (USGS) data using Leaflet and Mapbox.  

### Part One: 

#### Data selection 
- GeoJson data from the [USGS](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) Earthquake Hazards Program
  - [All Earthquakes](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson) from the past 30 days 
  - updated every minute

#### HTML/CSS 
- brought in the necessary script tags to html for leaflet, d3, and the config file with Mapbox API key
- css for sizing map and styling legend 

#### JavaScript
- Leaflet and Mapbox for rendering maps, checking the console to confirm data is called with d3

```// Create a new map, centering over the Salt Lake City Airport to visualize earthquakes on the West Coast and Midwest U.S.
var myMap = L.map("map", {
  center: [
    40.79004113996794, -111.97816943898866
  ],
  zoom: 5,
});

// map layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/light-v10",
      accessToken: API_key
    }).addTo(myMap);

// d3 for fetching earthquake geoJson data    
d3.json(geoJson).then(data => {
    //console.log(data);
    var earthquakes = data.features;
    //console.log(earthquakes)
```   

#### Map Result 

- circle markers correlate to magnitude of earthquake in color and size
- legend for color reference to magnitude
- popup on any marker for further information

Light map with Earthquakes | Popup on markers
-------- | --------
![Part One Map 1](/images/Map1_1.png) | ![Part One Map 2](/images/Map1_2.png)

### Part Two:

#### Adding a Second Dataset
- Rendered Earthquake Data 
- Added [Data](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json) on Tectonic Plates 

#### JavaScript

- organized code for additional map layers with a control for the user to select the map and data they'd like to view

```// define variables for layer groups for earthquakes and techtonic plates
var quakesLayer = L.layerGroup();
var platesLayer = L.layerGroup();

// Define an overlayMaps object to hold layers for earthquakes and techtonic plates
var overlayMaps = {
  Earthquakes: quakesLayer,
  Plates: platesLayer
}

// add control for layers that is always visible (no collapse)
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false,
}).addTo(myMap)
```
#### Map Result

Light map with Earthquakes and Plates | Satellite map with Plates
-------- | --------
![Map Image 1](/images/Map2_1.png) | ![Map Image 2](/images/Map2_2.png)
Outdoors map with Earthquakes and Plates | Light map with Earthquakes and Popup
![Map Image 3](/images/Map2_3.png) | ![Map Image 4](/images/Map2_4.png)
