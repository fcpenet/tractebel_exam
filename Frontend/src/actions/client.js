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

export const update = (id, name, telephone) => {
	return dispatch => {
		let headers = {
			'Content-Type': 'application/json',
			'Accept' : 'application/json'};
		let body = JSON.stringify({
			name: name,
			telephone: telephone
			});
		return fetch('/clients/'+id, {headers, method: 'PUT', body})
			.then(res => res.json())
			.then(client => {
				console.log(client);
				if(client.error){
					return dispatch({
						type: 'UPDATE_FAILED',
						message: client.message
					})
				}
				else{
					return dispatch({
						type: 'UPDATE_SUCCESS',
						message: client.message
					})

				}
			});
		}
	}

export const destroy = (id) => {
	return dispatch => {
		let headers = {
			'Content-Type': 'application/json',
			'Accept' : 'application/json'};
		return fetch('/clients/'+id, {headers, method: 'DELETE'})
			.then(res => res.json())
			.then(client => {
				console.log(client);
				if(client.error){
					return dispatch({
						type: 'DELETE_FAILED',
						message: client.message
					})
				}
				else{
					return dispatch({
						type: 'DELETE_SUCCESS',
						message: client.message
					})

				}
			});
		}
}

