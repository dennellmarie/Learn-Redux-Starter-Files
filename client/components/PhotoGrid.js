import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Photo from './Photo';

const PhotoGrid = React.createClass({
	render() {
		return (
			<div className="photo-grid">
				{this.props.images.map((image, i) => <Photo {...this.props} key={i} i={i} image={image} />)}
			</div>
		)
	}
});

export default connect(
	state => ({
			images: state.images,
		})	
)(PhotoGrid);