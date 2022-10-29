// set the dimensions and margins of the graph
var width = 300
height = 300
margin = 1

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create data
var stored = JSON.parse(localStorage.getItem("allclicks"));
var count = stored.size();
var last = stored[count]
var smaller = 0;
var bigger = 0;
for (let i = 0; i < count - 1; i++) {
    if (last < stored[i]) smaller++
    else bigger++
}
var data = {smaller, bigger};
var i = smaller / (smaller + bigger) * 100;
$('worse').innerHTML = i;

// set the color scale
var color = d3.scaleOrdinal()
    .domain(data)
    .range(["#aa706a", "#d5b9b1"])

// Compute the position of each group on the pie:
var pie = d3.pie()
    .value(function (d) {
        return d.value;
    })
var data_ready = pie(d3.entries(data))

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
    .selectAll('whatever')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', d3.arc()
        .innerRadius(80)         // This is the size of the donut hole
        .outerRadius(radius)
    )
    .attr('fill', function (d) {
        return (color(d.data.key))
    })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)