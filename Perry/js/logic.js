function buildNationalSummary(care) {
  d3.json("http://127.0.0.1:5000//api/v1.0/national_stats").then((data) => {
    console.log(data)
    var map= d3.map(data);
    
    d3.data(function(data) {
      return data.values.filter(function(v) { return v ; });
  })

    var resultsarray= value_code.filter(careType => 
      careType["Value Code"] == care);
    var result= resultsarray[0]

    var panel = d3.select("#voc-natsum");

    panel.html("");

    Object.entries(result).forEach(([avg_med_inc, avg_pmt,max_med_inc,max_pmt, min_med_inc, min_pmt, tot_cases, value_code]) => {
      panel.append("h4").text(value_code);
      panel.append("h6").text(`Total Cases: ${tot_cases}`);
      panel.append("h6").text(`Average Payment: ${avg_pmt}`);
      panel.append("h6").text(`Maximum Payment: ${max_pmt}`);
      panel.append("h6").text(`Minimum Payment: ${min_pmt}`);
      panel.append("h6").text(`Average Median Income: ${avg_med_inc}`);
      panel.append("h6").text(`Maximum Median Income: ${max_med_inc}`);
      panel.append("h6").text(`Minimum Median Income: ${min_med_inc}`);
    });
  });

// Build Charts
function buildCharts(care) {

d3.json("samples.json").then((data) => {
  var samples= data.samples;
  var resultsarray= samples.filter(careType => 
      careType.id == care);
  var result= resultsarray[0]

  var ids = result.otu_ids;
  var labels = result.otu_labels;
  var values = result.sample_values;

  // Bubble Charts
  var LayoutBubble = {
    margin: { t: 0 },
    xaxis: { title: "<b>OTU ID<b>" },
    hovermode: "closest",
    };

    var DataBubble = [ 
    {
      x: ids,
      y: values,
      text: labels,
      mode: "markers",
      marker: {
        color: ids,
        size: values,
        }
    }
  ];

  Plotly.newPlot("heatmap", DataBubble, LayoutBubble);

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
});
}
 
// Create Dropdown
function init() {

var selector = d3.select("#selDataset");

d3.json("http://127.0.0.1:5000//api/v1.0/national_stats").then((data) => {
  console.log("here we are")  
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
//buildNationalSummary(newCareType);
//buildScatterPlot((newCareType);
//buildHeatmap(newCareType)

}

init()
}