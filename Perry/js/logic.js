function buildNationalSummary(care) {
  d3.json("http://127.0.0.1:5000//api/v1.0/national_stats").then((data) => {
    //console.log(data);

    var care_array = data.filter(datapoint => 
        
      datapoint["Value Code"] == care 
      );
      
    var panel = d3.select("#voc-natsum");

    panel.html("");
    
    Object.entries(care_array[0]).forEach(([key, value]) => {

      panel.append("h9").text(`${key}: ${value}             `);
      panel.append("h9").text(" ");
    }); 
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

  });
}

  // Event Listener
  function optionChanged(newCareType) {
  buildNationalSummary(newCareType);
  
  };

init();
