import actionTypes from '../actions/actionTypes';

const initialState = {
	isLoadingGender: false,
	genders: [],
	roles: [],
	positions: [],
};

const adminReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_GENDER_START:
			state.isLoadingGender = true;
			return {
				...state,
			};
		case actionTypes.FETCH_GENDER_SUCCESS:
			state.genders = action.data;
			state.isLoadingGender = false;
			return {
				...state,
			};
		case actionTypes.FETCH_GENDER_FAILED:
			state.genders = [];
			state.isLoadingGender = [];
			return {
				...state,
			};
        case actionTypes.FETCH_POSITION_START:
			return {
				...state,
			};
		case actionTypes.FETCH_POSITION_SUCCESS:
			state.positions = action.data;
			return {
				...state,
			};
		case actionTypes.FETCH_POSITION_FAILED:
			state.positions = [];
			return {
				...state,
			};
        case actionTypes.FETCH_ROLE_START:
			state.isLoadingGender = true;
			return {
				...state,
			};
		case actionTypes.FETCH_ROLE_SUCCESS:
			state.roles = action.data;
			return {
				...state,
			};
		case actionTypes.FETCH_ROLE_FAILED:
			state.roles = [];
			return {
				...state,
			};
			case actionTypes.CREATE_USER_SUCCESS:
				return {
					...state,
				};
				case actionTypes.CREATE_USER_FAILED:
					return {
						...state,
					};
		default:
			return state;
	}
};

export default adminReducer;
