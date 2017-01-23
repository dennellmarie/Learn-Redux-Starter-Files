import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import * as actions from './actions/actionCreators';

import thunk from 'redux-thunk'; 

// import the root reducer
import rootReducer from './reducers/index';

import comments from './data/comments';
import posts from './data/posts';

// create an object for the default data
const defaultState = {
	posts,
	comments
};

const enhancers = compose(
	applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);
//const store = createStore(rootReducer, applyMiddleware(thunk), defaultState, enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

// implements hot reloading of reducers
if(module.hot) {
	module.hot.accept('./reducers', () => {
		const nextRootReducer = require('./reducers/index').default;
		store.replaceReducer(nextRootReducer)
	});
};

store.dispatch(actions.fetch_hello());
export default store;

//export default createStore(reducer, applyMiddleware(thunk));

