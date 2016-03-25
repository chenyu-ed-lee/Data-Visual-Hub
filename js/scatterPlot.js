var margin = {top: 20, right: 20, bottom: 100, left: 70},
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var x2 = d3.scale.linear()
		.range([0, width]);

var y2 = d3.scale.linear()
		.range([height, 0]);

var xAxis2 = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis2 = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg2 = d3.select("#scatterPlot").append("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 960 600")
	.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json", function(error, data) {
	if (error) console.log("Error!");
	console.log(data);
})