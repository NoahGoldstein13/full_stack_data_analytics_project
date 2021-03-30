function buildNationalSummary(care) {
  
  d3.json("http://127.0.0.1:5000//api/v1.0/national_stats").then((data) => {
    //console.log(data);

    var care_array = data.filter(datapoint => 
        
      datapoint["Value Code"] == care 
      );
      
    var panel = d3.select("#voc-natsum");
    
    Object.entries(care_array[0]).forEach(([key, value]) => {

      panel.append("h9").text(`${key}: ${value}`);
      
    }); 
  });
};  

function buildHeatmap(care) {
  
  if (myMap) {myMap.off(); myMap.remove();}
    var myMap = L.map("heatmap", {
      center: [37.0902, -95.7129],
      zoom: 4.3
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
  
  d3.json(url).then(function(response) {

      var care_array = response.filter(datapoint => 
          
          datapoint.val_code == care 
          );

      //console.log(care_array);
  
      var heatArray = [];
  
      for (var i = 0; i < care_array.length; i++) {
      var lat = care_array[i].latitude;
      var lng = care_array[i].longitude;
      
      if (lat!== null && lng !== null) {
          heatArray.push([lat, lng]);
      }
      }
      //console.log(heatArray);

      var heat = L.heatLayer(heatArray, {
      
      radius: 20,
      blur: 1
      }).addTo(myMap);
      //console.log(heat)
  });
};

// Create Dropdown
function init() {

  var selector = d3.select("#selDataset");

  d3.json("http://127.0.0.1:5000//api/v1.0/national_stats").then((data) => {
    var careNames = []; 
    data.forEach((datapoint) => {

      careNames.push(datapoint["Value Code"])
    
    });
    careNames.forEach((care) => {
      selector
        .append("option")
        .text(care)
        .property("value", care);
    });
  
    const firstSample = careNames[0];
    buildNationalSummary(firstSample);
    buildHeatmap(firstSample);

  });
}

  // Event Listener
  function optionChanged(newCareType) {
  buildNationalSummary(newCareType);
  
  buildHeatmap(newCareType);

  };

init();
