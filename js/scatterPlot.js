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

var tooltip2 = d3.select("#scatterPlot").append("div")
		.attr("class", "tooltip2")
		.style("opacity", 0);

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
			return d.Name;
		})
		.attr("x", function(d) {
		return x2(d.Seconds/60) + 5;
		})
		.attr("y", function(d) {
		return y2(d.Place) + 2;
		})
		// .attr("transform", "translate(15,+4)")	
		.attr("class", "dotLabel");

	svg2.selectAll(".dot")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "dot")
		.attr("r", 3.5)
		.attr("cx", function(d) {
			return x2(d.Seconds/60);
		})
		.attr("cy", function(d) {
			return y2(d.Place);
		})
		.attr("fill", function(d) {
			if(d.Doping == "") {
				return "#a5a096";
			}
			return "#ffc33c";
		})
		.on("mouseover", function(d) {
			tooltip2.transition()
				.duration(200)
				.style("opacity", .9);

			tooltip2.html(createToolTip(d))
			.style("left", (200) + "px")
			.style("top", (925) + "px");
		})
		.on("mouseout", function(d) {
			tooltip2.transition()
				.duration(500)
				.style("opacity", 0);
		});

	svg2.append("circle")
		.attr("cx", 450)
		.attr("cy", 150)
		.attr("r", 5)
		.attr("fill", "#a5a096");

	svg2.append("text")
		.attr("x", 457)
		.attr("y", 153)
		.attr("text-anchor", "left")
		.attr("class", "legend")
		.text("No doping allegations");

	svg2.append("circle")
		.attr("cx", 450)
		.attr("cy", 170)
		.attr("r", 5)
		.attr("fill", "#ffc33c");

	svg2.append("text")
		.attr("x", 457)
		.attr("y", 173)
		.attr("text-anchor", "left")
		.attr("class", "legend")
		.text("Riders with doping allegations");

	function friendlySeconds(seconds) {
		return parseInt(seconds / 60) + ":" + seconds % 60;
	}

	function createToolTip(d) {
		var tooltipHTML = "<p>" + d.Name + ": " + d.Nationality + "</p>";
		tooltipHTML += "<p>Year: " + d.Year + ", Time: " + friendlySeconds(d.Seconds) + "</p>";
		if(d.Doping == "") {
			tooltipHTML += "<p>No Doping Allegation</p>";
		} else {
			tooltipHTML += "<p>" + d.Doping + "</p>";
		}
		return tooltipHTML;
	}
})

