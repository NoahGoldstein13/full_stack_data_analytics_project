// Bar Graph depicting total cost per care category


// d3.json("http://127.0.0.1:5000/api/v1.0/national_stats.json").then((data) => {

//     data.forEach((d, i) => {
//         data.push({denominator: +d.denominator, avg_pmt: +d.avg_pmt, med_inc: +d.med_inc, zip_code: d.zip_code});
//         });
//           // once done iterating over dataset we can use it
//         console.log(data);
// }

// Creating traces
var trace1 = {
    x: ['Heart Attack', 'Heart Failure', 'Hip/Knee', 'Pneumonia'],
    y: [10796444475, 17039992680, 19400130600, 21376275318], 
    type: "bar"
};

var data = [trace1];

var layout = {
    title: "Total Cost Per Care Category",
    xaxis: {title: "Care Categgory"},
    yaxis: {title: "Total Cost"}
};

Plotly.newPlot("bar", data, layout);