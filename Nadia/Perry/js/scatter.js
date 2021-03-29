const xValue = d => d.med_inc;
const xLabel = "Median Income";
const yValue = d => d.denominator * d.avg_pmt;
const yLabel = "Total Medicare Payments";

var margin = {top: 20, right: 30, bottom: 120, left: 120},
    width = 450 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr('class', 'chart');

//Read the data
d3.json("http://127.0.0.1:5000/api/v1.0/heart_failure").then ((data) => {

  console.log(data);

  data.forEach(function(data) {
    data.denominator = +data.denominator;
    data.avg_pmt = +data.avg_pmt;
    data.med_inc = +data.med_inc;
    });

  // Add X axis
  var x = d3.scaleLinear()
    .domain(d3.extent(data, xValue)).nice()
    .range([ 0, width ]);
  var xAxisG = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .append('text')
    .attr('class', 'axis-label')
    .attr('x', width / 2)
    .attr('y', 65)
    .text(xLabel);

  // Add Y axis
  var y = d3.scaleLinear()
    .domain(d3.extent(data, yValue)).nice()
    .range([ height, 0]);
  var yAxisG = svg.append("g")
    .call(d3.axisLeft(y))
    .append('text')
    .attr('class', 'axis-label')
    .attr('x', -height / 2)
    .attr('y', -60)
    .attr('transform', `rotate(-90)`)
    .style('text-anchor', 'middle')
    .text(yLabel);

  // Add circles
  var circlesGroup = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", d => { return x(xValue); })
        .attr("cy", d => { return y(yValue); })
        .attr("r", 8)
        .attr('class', 'stateCircle');

//   // Add circle labels
//   svg.selectAll(".text")
//     .data(data)
//     .enter()
//     .append("text")
//       .attr("dy", "0.35em")
//       .attr("x", d => { return x(xValue); })
//       .attr("y", d => { return y(yValue); })
//       .text(d => { return d.zip_code; })
//       .attr('class', 'stateText')
//       .attr("font-size", "10px");

  // Initialize tooltip
  var toolTip = d3.tip() 
  .attr("class", "d3-tip")
  .html(function(d) {
    return  `${data.zip_code}<br>Median Income: ${xValue}<br>Total Payments: ${yValue}<br>`; 
});

// Create tooltip in the chart
svg.call(toolTip);

// Create event listeners to display and hide the tooltip
circlesGroup.on("mouseover", function(data) {
  toolTip.show(data, this);
})
  // onmouseout event
  .on("mouseout", function(data, index) {
    toolTip.hide(data);
  });
});