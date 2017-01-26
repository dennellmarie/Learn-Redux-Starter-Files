import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import posts from './posts';
import comments from './comments';
import images from './images'

const rootReducer = combineReducers({posts, comments, images, routing: routerReducer});

export default rootReducer;

// get rid of all these reducers and make it one