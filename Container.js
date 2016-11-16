import React from 'react'
import Nodes from './Nodes'

export default React.createClass({

	getInitialState() {
		return {
			data: require('json!./data.json')
		}
	},

	render() {
  	return (
			<div>
				<p>This is some container component</p>
				<Nodes data={ this.state.data } />
			</div>
    )
  }
})
