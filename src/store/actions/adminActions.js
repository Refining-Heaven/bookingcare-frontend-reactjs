import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService } from '../../services/userService';

// Gender
const fetchGenderStart = () => {
	return async (dispatch, getState) => {
		//dispatch: fire event, getState: xử lý data
		try {
			dispatch({
				type: actionTypes.FETCH_GENDER_START,
			});
			const response = await getAllCodeService('GENDER');
			if (response && response.errCode === 0) {
				dispatch(fetchGenderSuccess(response.data));
			} else {
				dispatch(fetchGenderFailed());
			}
		} catch (e) {
			dispatch(fetchGenderFailed());
			console.log(e);
		}
	};
};

const fetchGenderSuccess = (genderData) => ({
	type: actionTypes.FETCH_GENDER_SUCCESS,
	data: genderData,
});

const fetchGenderFailed = () => ({
	type: actionTypes.FETCH_GENDER_FAILED,
});

// Position
const fetchPositionStart = () => {
	return async (dispatch, getState) => {
		//dispatch: fire event, getState: xử lý data
		try {
			dispatch({
				type: actionTypes.FETCH_POSITION_START,
			});
			const response = await getAllCodeService('POSITION');
			if (response && response.errCode === 0) {
				dispatch(fetchPositionSuccess(response.data));
			} else {
				dispatch(fetchPositionFailed());
			}
		} catch (e) {
			dispatch(fetchPositionFailed());
			console.log(e);
		}
	};
};

const fetchPositionSuccess = (positionData) => ({
	type: actionTypes.FETCH_POSITION_SUCCESS,
	data: positionData,
});

const fetchPositionFailed = () => ({
	type: actionTypes.FETCH_POSITION_FAILED,
});

// Role
const fetchRoleStart = () => {
	return async (dispatch, getState) => {
		//dispatch: fire event, getState: xử lý data
		try {
			dispatch({
				type: actionTypes.FETCH_ROLE_START,
			});
			const response = await getAllCodeService('ROLE');
			if (response && response.errCode === 0) {
				dispatch(fetchRoleSuccess(response.data));
			} else {
				dispatch(fetchRoleFailed());
			}
		} catch (e) {
			dispatch(fetchRoleFailed());
			console.log(e);
		}
	};
};

const fetchRoleSuccess = (roleData) => ({
	type: actionTypes.FETCH_ROLE_SUCCESS,
	data: roleData,
});

const fetchRoleFailed = () => ({
	type: actionTypes.FETCH_ROLE_FAILED,
});

const createNewUser = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await createNewUserService(data);
			if (response && response.errCode === 0) {
				dispatch(createUserSuccess());
			} else {
				dispatch(createUserFailed());
			}
		} catch (e) {
			dispatch(createUserFailed());
			console.log(e);
		}
	};
}

const createUserSuccess = () => ({
	type: 'CREATE_USER_SUCCESS'
})

const createUserFailed = () => ({
	type: 'CREATE_USER_FAILED'
})

export {
  fetchGenderStart,
  fetchPositionStart,
  fetchRoleStart,
	createNewUser
};
