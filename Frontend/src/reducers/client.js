const initialState = []
export default function student(state=initialState, action){
	const _state = Object.assign({}, state);
	switch(action.type){
		case 'GET_ALL_SUCCESS':
			_state.clients = action.clients;
			_state.isDone = false;
			return _state;

		case 'CREATE_SUCCESS':
			delete _state.message;
			return _state;

		case 'CREATE_FAILED':
			_state.message = action.message;
			return _state;

		case 'DELETE_SUCCESS':
		case 'UPDATE_SUCCESS':
			_state.isDone = true;
			return _state;

		case 'DELETE_FAILED':
		case 'UPDATE_FAILED':
			_state.isDone = false;
			return _state;


		default:
			return _state;

	}
}

