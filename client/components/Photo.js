import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const Photo = React.createClass({
	render() {
		const { image, i } = this.props;
		return (
			<figure className="grid-figure">
				<div className="grid-photo-wrap">
					<Link to={`/view/`}>
						<img src={image.image} alt={image.image} className="grid-photo" />
					</Link>

					<CSSTransitionGroup transitionName="like"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={500}>
						
					</CSSTransitionGroup>

				</div>

				<figcaption>
					<p>{image.title}</p>
					<div className="control-buttons">
						<button onClick={this.props.increment.bind(null, i)} className="likes">&hearts;</button>
						<Link className="button" to={`/view/`}>
							<span className="comment-count">
								<span className="speech-bubble"></span>
								
							</span>
						</Link>
					</div>
				</figcaption>

			</figure>
		)
	}
});

export default Photo;


// {comments[post.code] ? comments[post.code].length : 0}
// <span key={post.likes} className="likes-heart">
// 							{post.likes}</span>


