// increment likes
export function increment(index) {
	return {
		type: 'INCREMENT_LIKES',
		index
	}
}

// add comment
export function addComment(postId, author, comment) {
	return {
		type: 'ADD_COMMENT',
		postId,
		author,
		comment
	};
}

// remove comment
export function removeComment(postId, i) {
	return {
		type: 'REMOVE_COMMENT',
		i,
		postId
	};
}

//sample code
const fetch_hello_success = message => ({
	type: 'FETCH_HELLO_SUCCESS',
	message
})

//A single generic failure message can be used for all network failures,
//unless you specifically need to do something when a particular one fails.
const report_failure = (what, error) => ({
	type: 'REPORT_FAILURE',
	what, error
})

export const fetch_hello = () => dispatch => {
	return fetch("/hello").then(response => {
		if (!response.ok) throw(new Error(response.statusText));
		return response.json();
	}).then(data =>
		dispatch(fetch_hello_success(data.message))
	).catch(error =>
		dispatch(report_failure("fetch_hello", error))
	);
}



export const fetch_insta = () => dispatch => {
	return fetch("/api/instagram").then(response => {
		console.log(response)
	}).then(data =>
		console.log(data)
	).catch(error =>
		console.log(error)
	);
}
