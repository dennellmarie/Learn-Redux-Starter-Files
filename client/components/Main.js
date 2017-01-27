import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import InstagramLogin from 'react-instagram-login';
import * as actions from '../actions/actionCreators';
import store from '../store';

export class Main extends React.Component {
	constructor(props) {
        super(props);
        this.insta_click = this.insta_click.bind();
    }

    insta_click() {
        store.dispatch(actions.fetch_insta());
    }


	render() {
		return (
			<div>
				<h1>
					<Link to="/">Petstagram</Link>
				</h1>
				 
			    <FontAwesome name="instagram"/>
			    <button className="login" onClick={this.insta_click}>Login</button>
    		    
				{React.cloneElement(this.props.children, this.props)}
			</div>
		);
	}
}


export default connect()(Main);