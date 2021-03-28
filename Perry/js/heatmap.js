var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 13
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  var url = "http://127.0.0.1:5000//api/v1.0/all_data";
  
  d3.json(url, function(response) {
  
    console.log(response);
  
    var heatArray = [];
  
    for (var i = 0; i < response.length; i++) {
      var location = response[i].location;
  
      if (location) {
        heatArray.push([location.coordinates[1], location.coordinates[0]]);
      }
    }
  
    var heat = L.heatLayer(heatArray, {
      radius: 20,
      blur: 35
    }).addTo(myMap);
  
  });