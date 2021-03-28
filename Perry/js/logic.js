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

// Build Charts
function buildCharts(care) {

  // Bar Charts
  var bar_data =[
    {
      y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      x:values.slice(0,10).reverse(),
      text:labels.slice(0,10).reverse(),
      type:"bar",
      orientation:"h"
    }
  ];

  var barLayout = {
    title: "<b>Top 10 Bacteria Cultures Found<b>",
    margin: { t: 30, l: 150 }
  };

  Plotly.newPlot("bar", bar_data, barLayout);
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
    //buildBarChart(firstSample);
    //buildScatterPlot(firstSample);
    //buildHeatmap(firstSample)

  });
}

  // Event Listener
  function optionChanged(newCareType) {
  buildNationalSummary(newCareType);
  //buildScatterPlot((newCareType);
  //buildHeatmap(newCareType)
  };

init();
