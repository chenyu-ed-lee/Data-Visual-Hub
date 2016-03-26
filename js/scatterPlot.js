var margin2 = {top: 10, right: 90, bottom: 100, left: 70},
    width2 = 700 - margin2.left - margin2.right,
    height2 = 400 - margin2.top - margin2.bottom;

var x2 = d3.scale.linear()
		.range([0, width2]);

var y2 = d3.scale.linear()
		.range([height2, 0]);

var xAxis2 = d3.svg.axis()
    .scale(x2)
    .orient("bottom");

var yAxis2 = d3.svg.axis()
    .scale(y2)
    .orient("left");

var svg2 = d3.select("#scatterPlot").append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 700 400")
	.append("g")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json", function(error, data) {
	if (error) console.log("Error!");
	x2.domain([(2400/60), (d3.min(data, function(d) { return d.Seconds; })/60)]);
	y2.domain([36, d3.min(data, function(d) { return d.Place; })]);

	svg2.append("g")
		.attr("class", "x2 axis")
		.attr("transform", "translate(0," + height2 + ")")
		.call(xAxis2)
	.append("text")
		.attr("x", 250)
		.attr("y", 50)
		.style("text-anchor", "middle")
		.text("Mintues used for the race");

	svg2.append("g")
		.attr("class", "y2 axis")
		.call(yAxis2)
	.append("text")
		// .attr("transform", "rotate(-90)")
		// .attr("y", 1)
		.attr("x", 60)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Ranking");

	svg2.selectAll(".text")
		.data(data)
		.enter()
		.append("text")
		.text(function(d) {
			console.log(d.Name)
			return d.Name;
		})
		.attr("x", function(d) {
		return x2(d.Seconds/60);
		})
		.attr("y", function(d) {
		return y2(d.Place);
		})
		.attr("transform", "translate(15,+4)")
		.attr("class", "dotLabel");

	svg2.selectAll(".dot")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "dot")
		.attr("r", 2.5)
		.attr("cx", function(d) {
			return x2(d.Seconds/60);
		})
		.attr("cy", function(d) {
			return y2(d.Place);
		});
})