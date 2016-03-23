var margin = {top: 20, right: 20, bottom: 100, left: 70},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
		.rangeRoundBands([0, width], .05);

var y = d3.scale.linear()
		.range([height, 0]);

var format = d3.time.format("%Y-%m-%d");
var year = d3.time.format("%Y");
var month = d3.time.format("%B");

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

var div = d3.select("#barChart").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

var svg = d3.select("#barChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("./data/gdp-data.csv", function(error, data) {
	if(error) console.log("Error!");
	x.domain(data.map(function(d) { return d.date; }));
	y.domain([0, d3.max(data, function(d) { return d.value; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-60)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Value in Billion");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.date); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .on("mouseover", function(d) {
      	d3.select(this)
      		.transition()
      		.duration(500)
      		.style("cursor", "pointer")
      		div
      			.transition()
      			.duration(500)
      			.style("opacity", 9)
      		div
      			.html("GDP: $" + d.value + "<br/>" + "Quarter: " + month(new Date(d.date)) + " " + year(new Date(d.date)))
      			.style("left", (d3.event.pageX - 100) + "px")
      			.style("top", (d3.event.pageY + 600) + "px")
      			console.log(d3.event.pageY);

      })
	  .on("mouseout", function(d) {
	  		div.transition()
	  			.duration(500)
	  			.style("opacity", 0);
	  })

});