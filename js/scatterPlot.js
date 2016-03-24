var margin = {top: 20, right: 20, bottom: 100, left: 70},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var svg2 = d3.select("#scatterPlot").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");