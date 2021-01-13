var geoJson = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

console.log(geoJson);

d3.json(geoJson, function(data) {
    console.log(data);
});