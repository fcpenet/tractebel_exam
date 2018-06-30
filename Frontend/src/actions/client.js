export const getAll = () => {
	return dispatch => {
		let headers = {
			'Content-Type': 'application/json'
		}
		return fetch('/clients/all/', {headers, method: 'GET'})
			.then(res => res.json())
			.then(clients => {
				if(clients){
					return dispatch({
						type: 'GET_ALL_SUCCESS',
						clients,
					})
				}
			});
		}
	}

export const create = (name, telephone) => {
	return dispatch => {
		let headers = {
			'Content-Type': 'application/json',
			'Accept' : 'application/json'};
		let body = JSON.stringify({
			name: name,
			telephone: telephone
			});
		return fetch('/clients/create', {headers, method: 'POST', body})
			.then(res => res.json())
			.then(client => {
				console.log(client);
				if(client.error){
					return dispatch({
						type: 'CREATE_FAILED',
						message: client.message
					})
				}
				else{
					return dispatch({
						type: 'CREATE_SUCCESS',
						message: client.message
					})

				}
			});
		}
	}
