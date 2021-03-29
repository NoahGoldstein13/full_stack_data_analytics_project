const xValue = d => d.med_inc;
const xLabel = "Median Income (USD)";
const yValue = d => d.denominator * d.avg_pmt;
const yLabel = "Total Medicare Payments (USD)";

var margin = {top: 20, right: 30, bottom: 120, left: 120},
    width = 950 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

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

    data.forEach((d, i) => {
        data.push({denominator: +d.denominator, avg_pmt: +d.avg_pmt, med_inc: +d.med_inc, zip_code: d.zip_code});
      });
      // once done iterating over dataset we can use it
      console.log(data);

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 200000])
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
    .data(data)
    .enter()
    .append("circle")
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
circlesGroup.on("mouseover", function(data) {
  toolTip.show(data, this);
  d3.select(this)
  .transition()
  .duration(1000)
  .attr("r", 7);
})
  // on mouseout event
  .on("mouseout", function(data, index) {
    toolTip.hide(data);
    d3.select(this)
    .transition()
    .duration(1000)
    .attr("r", 2);
  })
});