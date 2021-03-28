// const xValue = d => d.poverty;
// const xLabel = "In Poverty (%)";
// const yValue = d => d.healthcare;
// const yLabel = "Lacks Healthcare (%)";

var margin = {top: 20, right: 30, bottom: 120, left: 120},
    width = 700 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr('class', 'chart');

//Read the data
var heart_failure = "http://127.0.0.1:5000/api/v1.0/heart_failure";
d3.json(heart_failure, function(data) {

  console.log(data);

//   data.forEach(function(data) {
//     data.poverty = +data.poverty;
//     data.healthcare = +data.healthcare;
//     });

//   // Add X axis
//   var x = d3.scaleLinear()
//     .domain(d3.extent(data, xValue)).nice()
//     .range([ 0, width ]);
//   var xAxisG = svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x))
//     .append('text')
//     .attr('class', 'axis-label')
//     .attr('x', width / 2)
//     .attr('y', 65)
//     .text(xLabel);

//   // Add Y axis
//   var y = d3.scaleLinear()
//     .domain(d3.extent(data, yValue)).nice()
//     .range([ height, 0]);
//   var yAxisG = svg.append("g")
//     .call(d3.axisLeft(y))
//     .append('text')
//     .attr('class', 'axis-label')
//     .attr('x', -height / 2)
//     .attr('y', -60)
//     .attr('transform', `rotate(-90)`)
//     .style('text-anchor', 'middle')
//     .text(yLabel);

//   // Add circles
//   var circlesGroup = svg.selectAll("circle")
//     .data(data)
//     .enter()
//     .append("circle")
//         .attr("cx", d => { return x(d.poverty); })
//         .attr("cy", d => { return y(d.healthcare); })
//         .attr("r", 8)
//         .attr('class', 'stateCircle');

//   // Add circle labels
//   svg.selectAll(".text")
//     .data(data)
//     .enter()
//     .append("text")
//       .attr("dy", "0.35em")
//       .attr("x", d => { return x(d.poverty); })
//       .attr("y", d => { return y(d.healthcare); })
//       .text(d => { return d.abbr; })
//       .attr('class', 'stateText')
//       .attr("font-size", "10px");

//   // Initialize tooltip
//   var toolTip = d3.tip() 
//   .attr("class", "d3-tip")
//   .html(function(d) {
//     return  `${d.state}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}<br>`; 
// });

// // Create tooltip in the chart
// svg.call(toolTip);

// // Create event listeners to display and hide the tooltip
// circlesGroup.on("mouseover", function(data) {
//   toolTip.show(data, this);
// })
//   // onmouseout event
//   .on("mouseout", function(data, index) {
//     toolTip.hide(data);
//   });
});