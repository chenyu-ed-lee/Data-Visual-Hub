var margin = {top: 20, right: 70, bottom: 100, left: 70},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x2 = d3.scale.linear()
		.range([0, width]);

var y2 = d3.scale.linear()
		.range([height, 0]);

var xAxis2 = d3.svg.axis()
    .scale(x2)
    .orient("bottom");

var yAxis2 = d3.svg.axis()
    .scale(y2)
    .orient("left");

var svg2 = d3.select("#scatterPlot").append("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 800 500")
	.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json", function(error, data) {
	if (error) console.log("Error!");
	console.log(data);
	x2.domain([d3.max(data, function(d) { return d.Seconds; }), d3.min(data, function(d) { return d.Seconds; })]);
	y2.domain([36, d3.min(data, function(d) { return d.Place; })]);

	svg2.append("g")
		.attr("class", "x2 axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis2)
	.append("text")
		// .style("text-anchor", "middle")
		// .text("Mintues behind Fastest Time");

	svg2.append("g")
		.attr("class", "y2 axis")
		.call(yAxis2)
	.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Ranking");

	svg2.selectAll(".dot")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "dot")
		.attr("r", 5)
		.attr("cx", function(d) {
			return x2(d.Seconds);
		})
		.attr("cy", function(d) {
			return y2(d.Place);
		})
})