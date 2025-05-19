function init() {
    // Set up the SVG canvas dimensions
    const w = 700;
    const h = 350;
    const barPadding = 15;

    // Create the SVG element
    const svg = d3.select("#content-area")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

    // Load the CSV data
    d3.csv("./Task_2.4_data.csv").then(function(data) {
        console.log(data);
        wombatSightings = data;

        // Convert string values to numbers
        wombatSightings.forEach(function(d) {
            d.wombats = parseInt(d.wombats);
        });

        barChart(wombatSightings);
    });


    function barChart(wombatSightings) {
        svg.selectAll("rect")
            .data(wombatSightings)
            .enter()
            .append("rect")
            // X coordinate
            .attr("x", function(d, i) {
                return i * (w / wombatSightings.length);
            })
            // Y coordinate
            .attr("y", function(d) {
                return h - (d.wombats * 4);
            })
            // Width
            .attr("width", function(d) {
                return (w / wombatSightings.length - barPadding);
            })
            // Height
            .attr("height", function(d) {
                return d.wombats * 10;
            })
            .attr("fill", "rgb(100, 105, 143)");

        svg.selectAll("text")
            .data(wombatSightings)
            .enter()
            .append("text")
            // Text content
            .text(function(d) {
                return d.wombats;
            })
            // X coordinate
            .attr("x", function(d, i) {
                return i * (w / wombatSightings.length) + (w / wombatSightings.length - barPadding) / 2;
            })
            // Y coordinate
            .attr("y", function(d) {
                return h - (d.wombats * 4) + 15;
            })
            .attr("font-size", "12px")
            .attr("fill", "white")
            .attr("text-anchor", "middle");
    }
}

window.onload = init;