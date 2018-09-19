
var rgb = hexToRgb(lightBlue);
var r = rgb.r;
var g = rgb.g;
var b = rgb.b;
backgroundBlue =`rgb(${r}, ${g}, ${b}, 0.2)`;
        
        
var lossChartCanvas = document.getElementById("lossChart");
var ctxLoss = document.getElementById("lossChart").getContext('2d');
var lossChart = new Chart(ctxLoss, {
    
    
    type: 'line',
    data: {
            

		labels: trainingStats['iterations'],
		datasets: [{
		    label: "Current",
		    data: [{x: 44, y:0.6}],
		    fill: false,
		    pointBorderColor: darkBlue,
		    pointBackgroundColor: darkBlue,
		    borderColor: darkBlue,
		    backgroundColor: darkBlue,
		    pointRadius: 6,
		    pointHoverRadius: 6
		},
		{
		    label: 'Training Loss',
		    data: trainingStats["losses"],
		    borderColor: mediumBlue,
		    backgroundColor: backgroundBlue,
		    pointRadius: 0,
		    pointHoverRadius: 0
		    
		},
		]
	    },
    options: {
    responsive: true,
    maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Training Loss'
                }
            }],
            xAxes: [{
                
                scaleLabel: {
                    display: true,
                    labelString: 'Iterations'
                }
            }]
        }
    }
});






