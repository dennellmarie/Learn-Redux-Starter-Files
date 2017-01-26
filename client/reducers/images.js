// in actionCreators I am fetching from the API
// I can get the API information and send it to the reducer with 
// the dispatch
// the reducer gets the correct information and maps it
// into the single objects with the information I want
// and the Photocomponent is only registering 24 undefined images
// but I need help getting that reducer information 
// to show on the Photo component

// how do I get the dispatch information to show on the screen?
// I've been able to pass info from actions to reducers,
// but need it to get to the component

function images(state = [], action) {
	switch(action.type) {
		case 'NEW_ARRAY' :
			return action.data
		// return the updated state
		default:
		return state;
	}
}

export default images;


// function images(state = [], action) {
// 	switch(action.type) {
// 		case 'NEW_ARRAY' :
// 			const i = action.index;
// 			return [
// 				...state.slice(0, i), // before the one we're updating
// 				{...state[i], likes: state[i].likes + 1},
// 				...state.slice(i + 1), // after the one we're updating
// 			];
// 		// return the updated state
// 		default:

// 		return state;
// 	}
// }