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

// export const fetch_insta = () => dispatch => {
// 	console.log('testing testing')
// 	return fetch('/login', {
			
// 		}).then((res) => {
// 			if (res.status < 200 || res.status >= 300) {
// 				const error = new Error(res.statusText);
// 				error.res = res;
// 				console.error(error)
// 				throw error;
// 		}
// 	return res.json();
// 	}).then(data => {
// 		// variables let dennell = json
// 		// dennell.data[]
// 		var dennellData = JSON.parse(data.getDennell)
// 		var zeusData = JSON.parse(data.getZeus)
// 		console.log("ZeusData dot data", zeusData.data)
// 		// var newArray = dennellData.data.map(pic, index) => {

// 		// }
// 		dispatch(newArray(zeusData.data)) // this is an array of obj imgs

// 		// console.log(JSON.parse(data.getZeus))
// 	}).catch(error =>
// 		console.log(error)
// 	);
// }

const fetchData = url => {
	return fetch(url, {
		method: 'GET',
		headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
	}).then(res => res.json());
}

export const fetch_insta = () => {
	return dispatch => {
		fetchData('/login').then(data => {
			let jData = JSON.parse(data.getZeus)
			console.log(JSON.parse(data.getZeus))
			dispatch(newArray(getUsefulData(jData.data)))
		})
		return dispatch({type: 'fetchPhoto'})
	}
}

const getUsefulData = arr => {
	return arr.reduce((a, item) => {
		a.push({title: item.caption.text, image: item.images.standard_resolution.url})
		return a;
	}, [])
}

const newArray = data => ({
	type: 'NEW_ARRAY',
	data
})
