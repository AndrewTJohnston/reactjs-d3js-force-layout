import React 		from 'react'
import * as d3	from 'd3'

export default React.createClass({

	componentDidMount() {
		const width = 1000;
		const height = 1000;
		var data = this.props.data;

		var svg = d3.select(this.refs.hook)
			.append("svg:svg")
		  	.attr("viewBox", "0 0 1000 1000" )
		    .attr("preserveAspectRatio", "xMinYMin")
				.attr("xmlns","http://www.w3.org/2000/svg")
				.attr("version","1.1")

		var simulation = d3.forceSimulation()
			.force("link", 		d3.forceLink().id(function(d) { return d.id; }))
    	.force("charge", 	d3.forceManyBody().strength(-8000).theta(0).distanceMax(1000))
    	.force("center", 	d3.forceCenter(0.5*width,0.5*height))

		var link = svg.append("g")
			.attr("class", "links")
	    	.selectAll("line")
	    		.data(data.links)
	    			.enter().append("line")
	      			.attr("stroke-width", function(d) { return 5; })
	      			.attr("stroke", 			function(d) { return "#e2e2e2"; })

	  var node = svg.append("g")
			.attr("class", "nodes")
	    	.selectAll("circle")
	    	.data(data.nodes)
	    	.enter().append("circle")
	      	.attr("r", 70)
	      	.attr("fill", function(d) { return "red"; })
	      	.attr("stroke-width", function(d) { return 10; })
	      	.attr("stroke", function(d) { return "#ffffff"; })
	      	.call(d3.drag()
	        	.on("start", 	function(d) { dragStart	(d,simulation) })
						.on("drag", 	function(d) { dragged		(d,simulation) })
						.on("end", 		function(d) { dragEnd		(d,simulation) })
					)

	  	node.append("title").text(function(d) { return d.id; })

	  	simulation.nodes(data.nodes).on("tick", ticked)

	  	simulation.force("link").links(data.links);

	  	function ticked() {
				updateLink(link);
				updateNode(node);
		}
	},

	render() {
			// console.log(this.props.data);
    	return (
				<div>
					<p>This is the d3 visualization.</p>
					<div ref='hook' />
				</div>
    	)
  	}
});

var updateNode = (selection) => {
	selection.attr("cx", function(d) { return d.x; });
	selection.attr("cy", function(d) { return d.y; });
};

var updateLink = (selection) => {
	selection.attr("x1", function(d) { return d.source.x; })
	selection.attr("y1", function(d) { return d.source.y; })
	selection.attr("x2", function(d) { return d.target.x; })
	selection.attr("y2", function(d) { return d.target.y; })
};

var dragStart = (d,simulation) => {
	if (!d3.event.active) simulation.alphaTarget(0.3).restart();
	d.fx = d.x;
	d.fy = d.y;
};

var dragged = (d,simulation) => {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
};

var dragEnd = (d,simulation) => {
	if (!d3.event.active) simulation.alphaTarget(0);
	d.fx = null;
	d.fy = null;
};
