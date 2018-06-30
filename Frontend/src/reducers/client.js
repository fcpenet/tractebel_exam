const initialState = []
export default function student(state=initialState, action){
	const _state = Object.assign({}, state);
	switch(action.type){
		case 'GET_ALL_SUCCESS':
			_state.clients = action.clients;
			console.log(_state);
			return _state;

		case 'CREATE_SUCCESS':
			delete _state.message;
			return _state;

		case 'CREATE_FAILED':
			_state.message = action.message;
			return _state;

		default:
			return _state;

	}
}

