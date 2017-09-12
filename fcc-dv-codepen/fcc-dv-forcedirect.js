
var url = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";

// started with some examples:
// https://bl.ocks.org/mbostock/4062045  (in d3.js v4)
// https://bl.ocks.org/mbostock/1129492  (in d3.js v3)
// NOTE: appearently the API from v3 to v4 changed alot

// NOTE: also ran across tihs really cool idea.
//       want to do this with scraped data from LinkedIn
// https://naustud.io/tech-stack/


var svg    = d3.select("svg");                                       // get the svg DOM element
var width  = +svg.attr("width");
var height = +svg.attr("height");
var radius = 20;  // used to keep nodes within a bounds, not a circle

var positionOffsetX = 45;                                            // offset to match svg node
var positionOffsetY = 105;                                           // offset to match svg node

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody().strength(-10))               // -10 some repel
    .force("center", d3.forceCenter(width / 2, height / 2))          // center in middle
    .force('collision', d3.forceCollide().radius(function(d) {       // prevent overlap
      return 20
    }));

d3.json(url, function(graph) {                                       // read from url

  // given data doesn't have id that links refer to, add it
  for (let i = 0; i < graph.nodes.length; i++) {
    var entry = graph.nodes[i];
    entry["id"] = i;
  }

  // add the links
  var link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke", 'grey')
      .attr("stroke-width", '1');
 
  // add nodes,  nodes are img elements outside svg DOM
  var node = d3.select(".box")
    .append("div")
      .attr("class", "nodes")
    .selectAll("img")
    .data(graph.nodes)
    .enter().append("img")
      // add class names for flags.css sprites
      .attr("class",  function(d) { return ("flag flag-" + d.code); })
      .style("position", "absolute")
      .style("transform", "scale(2,2)")
      .attr("width", 24)
      .attr("height", 16)
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
    ;

    node
      // update svg node position
      .attr("x",     limitX)
      .attr("y",     limitY)
      // update style for img element
      .style("left", styleX)
      .style("top",  styleY)
    ;
  }
});


function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

function limitX(d) {
  return d.x = Math.max(radius, Math.min(width - radius, d.x));
}

function limitY(d) {
  return d.y = Math.max(radius, Math.min(height - radius, d.y));
}

function styleX(d) {
  return (d.x + positionOffsetX) +"px";
}

function styleY(d) {
  return  (d.y + positionOffsetY) +"px";
}
