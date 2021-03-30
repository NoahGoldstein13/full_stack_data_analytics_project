// Bar Graph depicting total cost per care category

function buildBarPlot() {
    d3.json("http://127.0.0.1:5000/api/v1.0/national_stats").then((data) => {
    
    var careValues = [];

    data.forEach((datapoint) => {
        let totalCost = datapoint["Total Cases"] * datapoint["Avg Payment"];
        
        careValues.push(totalCost);
    
    });
    
    //console.log(careValues);

    // Creating traces
    var trace1 = {
        x: ['Heart Attack', 'Heart Failure', 'Hip/Knee', 'Pneumonia'],
        y: [careValues[0], careValues[1], careValues[2], careValues[3]], 
        type: "bar"  
    };

    var data = [trace1];
    //console.log(data);
    var layout = {
        height: 550,
        width: 670,
        xaxis: {
            title: {
                text: "Care Category",
                font: {
                    family: 'Arial, sans-serif',
                    size: 12,
                }
            },
            showticklabels: true,
            tickangle: 0,
            tickfont: {
                family: 'Arial, sans-serif',
                size: 10,
            }
        },
        yaxis: {
            title: {
                text: "Total Expenditure ($)",
                font: {
                    family: 'Arial, sans-serif',
                    size: 12,
                }
            },
            showticklabels: true,
            tickangle: 0,
            tickfont: {
                family: 'Arial, sans-serif',
                size: 10,
            }
        },
    };

    Plotly.newPlot("bar", data, layout);

    });
};

buildBarPlot();