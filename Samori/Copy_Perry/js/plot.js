// Bar Graph depicting total cost per care category

function buildBarPlot() {
    d3.json("http://127.0.0.1:5000/api/v1.0/national_stats").then((data) => {
    
    var careValues = [];

    data.forEach((datapoint) => {
        let totalCost = datapoint["Total Cases"] * datapoint["Avg Payment"];
        
        careValues.push(totalCost);
    
    });
    
    console.log(careValues);

    // Creating traces
    var trace1 = {
        x: ['Heart Attack', 'Heart Failure', 'Hip/Knee', 'Pneumonia'],
        y: [careValues[0], careValues[1], careValues[2], careValues[3]], 
        type: "bar"
        
    };

    var data = [trace1];
    console.log(data);
    var layout = {
        title: "Total Cost Per Care Category",
        xaxis: {title: "Care Category"},
        yaxis: {title: "Total Cost"}
    };

    Plotly.newPlot("bar", data, layout);

    });
};

buildBarPlot();