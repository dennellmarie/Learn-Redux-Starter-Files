 import React from 'react';

import { render } from 'react-dom';

// import css
import css from './styles/style.styl';

// import components
import App from './components/App';
import Single from './components/Single';
import PhotoGrid from './components/PhotoGrid';

import Instafeed from 'instafeed.js';

// import Raven for Sentry error handling
import Raven from 'raven-js';
import { sentry_url, logException } from './data/config';

Raven.config(sentry_url).install();

// gives error message in report
//Raven.captureMessage('something bad happened');
// let's you attach user's error message to specific error event
//Raven.showReportDialog();

// import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

var feed = new Instafeed({
			  get: 'user',
			  userId: 4357624, // Ex: 1374300081
			  accessToken: 'f128ca3677b44a0a8dc11db1b138d7f4'
			});
			feed.run();

render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={PhotoGrid}></IndexRoute>
				<Route path="/view/:postId" component={Single}></Route>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);



