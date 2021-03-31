var panel = []
function buildNationalSummary(care) {
  $( "#voc-natsum" ).empty();

  console.log(care);
  d3.json("http://127.0.0.1:5000//api/v1.0/national_stats").then((data) => {
    //console.log(data);

    var care_array = data.filter(datapoint => 
        
      datapoint["Value Code"] == care 
      );
     

    panel = d3.select("#voc-natsum");
    console.log(panel)
    var care_array_filtered = care_array[0];
    //console.log(Object.values(care_array_filtered));

    panel.append("h9").text(`Care Type: ${care_array_filtered["Value Code"]}`);
    panel.append("br");
    panel.append("br");
    panel.append("b").text("Hospital Revenue / Patient");
    panel.append("br");
    panel.append("h9").text(`Total Cases: ${care_array_filtered["Total Cases"]}`);
    panel.append("br");
    panel.append("h9").text(`Average Payment: ${care_array_filtered["Avg Payment"]}`);
    panel.append("br");
    panel.append("h9").text(`Maximum Payment: ${care_array_filtered["Max Payment"]}`);
    panel.append("br");
    panel.append("h9").text(`Minium Payment: ${care_array_filtered["Min Payment"]}`);
    panel.append("br");
    panel.append("br");
    panel.append("b").text("Median Income");
    panel.append("br");
    panel.append("h9").text(`Average Median Income: ${care_array_filtered["Avg Median Income"]}`);
    panel.append("br");
    panel.append("h9").text(`Maximum Median Income: ${care_array_filtered["Max Median Income"]}`);
    panel.append("br");
    panel.append("h9").text(`Minimum Median Income: ${care_array_filtered["Min Median Income"]}`);
    
  });
};  

//build heatmap
function buildHeatmap(care) {
  $( "#heatmap" ).empty();
  var container = L.DomUtil.get('heatmap'); if(container != null){ container._leaflet_id = null; };

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
  
  care_array = []
  d3.json(url).then(function(response) {

      care_array = response.filter(datapoint => 
          
          datapoint.val_code == care 
          );

      //console.log(care_array[0]['med_inc']);
      
      var heatArray = [];
      //console.log(heatArray);
      for (var i = 0; i < care_array.length; i++) {
      var lat = care_array[i].latitude;
      var lng = care_array[i].longitude;
      var avg_payment = care_array[i].avg_pmt;
      var zip_code_all = care_array[i].zip_code;

      if (lat!== null && lng !== null) {
          heatArray.push([lat, lng]);
      }
      }
      //console.log(heatArray);



      var heat = new L.heatLayer(heatArray, {
      
      radius: 20,
      blur: 1
      }).addTo(myMap);
      //console.log(heat)
  });

  };

//build Scatter Plot
function buildScatterPlot(care) { 
  $( "#scatter" ).empty();
  const xValue = d => d.med_inc;
  const xLabel = "Median Income (USD)";
  const yValue = d => d.denominator * d.avg_pmt;
  const yLabel = "Total Medicare Payments (USD)";

  var margin = {top: 20, right: 30, bottom: 120, left: 120},
      width = 1300 - margin.left - margin.right,
      height = 650 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3.select("#scatter")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .attr('class', 'chart');

  //Read the care_array
  d3.json("http://127.0.0.1:5000/api/v1.0/all_data").then ((response) => {
      var care_array = response.filter(datapoint =>   
        datapoint.val_code == care 
      );
        care_array.forEach((d, i) => {
            care_array.push({denominator: +d.denominator, avg_pmt: +d.avg_pmt, med_inc: +d.med_inc, zip_code: d.zip_code});
          });

      // Add X axis
      var x = d3.scaleLinear()
        .domain([0, 200000])
        .range([ 0, width ]);
      var xAxisG = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .append('text')
        .attr('class', 'x-axis-label')
        .attr('x', width / 2)
        .attr('y', 65)
        .text(xLabel);

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, 45000000])
        .range([ height, 0]);
      var yAxisG = svg.append("g")
        .call(d3.axisLeft(y))
        .append('text')
        .attr('class', 'axis-label')
        .attr('x', -height / 2)
        .attr('y', -90)
        .attr('transform', `rotate(-90)`)
        .style('text-anchor', 'middle')
        .text(yLabel);

      // Add circles
      var circlesGroup = svg.selectAll("dot")
        .data(care_array)
        .enter()
        .append("circle")
        .transition()
        .delay(function(d,i){return(i*3)})
        .duration(2000)
        .filter(d => {return d.med_inc < 200000 & d.med_inc > 0})
        .filter(d => {return (d.denominator * d.avg_pmt) < 45000000 })
            .attr("cx", d => { return x(d.med_inc); })
            .attr("cy", d => { return y(d.denominator * d.avg_pmt); })
            .attr("r", 4)
            .attr('class', 'stateCircle');

      // Initialize tooltip
      var toolTip = d3.tip() 
      .attr("class", "d3-tip")
      .html(function(d) {
        return  `Median Income: ${"$"+d.med_inc}<br>Total Payments: ${"$"+d.denominator * +d.avg_pmt}<br>`; 
  })

  // Create tooltip in the chart
  svg.call(toolTip);

  // Create event listeners to display and hide the tooltip
  circlesGroup.on("mouseover", function(care_array) {
    toolTip.show(care_array, this);
    d3.select(this)
    .transition()
    .duration(1000)
    .attr("r", 15);
  })
    // on mouseout event
    .on("mouseout", function(care_array, index) {
      toolTip.hide(care_array);
      d3.select(this)
      .transition()
      .duration(1000)
      .attr("r", 2);
    })
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
    buildScatterPlot(firstSample);
  });
}

// Event Listener
function optionChanged(newCareType) {
  panel = []
  buildNationalSummary(newCareType);
  buildHeatmap(newCareType);
  buildScatterPlot(newCareType);
};

init();
