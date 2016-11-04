import React 		from 'react'
import * as d3 		from 'd3'
import data 		from 'json!./data.json'

export default React.createClass({

	componentDidMount() {

		const width = 1000;
		const height = 500;

		var svg = d3.select(this.refs.hook)
			.append("svg:svg")
		    .attr("viewBox", "0 0 " + width + " " + height )
		    .attr("preserveAspectRatio", "xMinYMin")
			.attr("xmlns","http://www.w3.org/2000/svg")
			.attr("version","1.1");

		var color = d3.scaleOrdinal(d3.schemeCategory20);

		var simulation = d3.forceSimulation()
    		.force("link", 		d3.forceLink().id(function(d) { return d.id; }))
    		.force("charge", 	d3.forceManyBody().strength(-5000).theta(0).distanceMax(1000))
    		.force("center", 	d3.forceCenter(0.5*width,0.5*height));

    	var link = svg.append("g")
	      	.attr("class", "links")
	    	.selectAll("line")
	    	.data(data.links)
	    	.enter().append("line")
	      	.attr("stroke-width", function(d) { return 5; })
	      	.attr("stroke", function(d) { return "#e2e2e2"; });

	  	var node = svg.append("g")
	    	.attr("class", "nodes")
	    	.selectAll("circle")
	    	.data(data.nodes)
	    	.enter().append("circle")
	      	.attr("r", 40)
	      	.attr("fill", function(d) { return color(d.group); })
	      	.attr("stroke-width", function(d) { return 5; })
	      	.attr("stroke", function(d) { return "#ffffff"; })
	      	.call(d3.drag()
	        	.on("start", dragstarted)
	          	.on("drag", dragged)
	          	.on("end", dragended));

	  	node.append("title")
	    	.text(function(d) { return d.id; });

	  	simulation
	    	.nodes(data.nodes)
	      	.on("tick", ticked);

	  	simulation.force("link")
	      	.links(data.links);

	  	function ticked() {
	    	link
		        .attr("x1", function(d) { return d.source.x; })
		        .attr("y1", function(d) { return d.source.y; })
		        .attr("x2", function(d) { return d.target.x; })
		        .attr("y2", function(d) { return d.target.y; });

	    	node
		        .attr("cx", function(d) { return d.x; })
		        .attr("cy", function(d) { return d.y; });
		}

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
	},

	render() {
		console.log(data);
    	return (
    		<div ref='hook' className="something"/>
    	)
  	}
})
