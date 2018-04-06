function createVis(errors, mapData, spendingData) {
    var w = 1160;
    var h = 960;

    var projection = d3.geoConicConformal()
        .rotate([71.5, 0])
        .parallels([42.6833, 41.7166])
        .fitExtent([[20, 20], [1140, 940]], mapData);

    var path = d3.geoPath().projection(projection);

    var svg = d3.select(".question1").append("svg")
    svg.attr('width', w).attr('height', h);


    var color = d3.scaleSequential(d3.interpolateBlues);

    svg.selectAll("path")
        .data(mapData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill-opacity", 0.2)
        .style("stroke", "#fff")
        .style("stroke-width", "1")
        .style("fill", "steelblue");
}

d3.queue()
    .defer(d3.json, "./custom.geo(1).json")
    .defer(d3.csv, "./GlobalLandTemperaturesByCountry.csv")
    .await(createVis);