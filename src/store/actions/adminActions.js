import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService } from '../../services/userService';
import { toast } from "react-toastify"

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
				toast.success("Create a new user succeed!")
				dispatch(createUserSuccess());
				dispatch(fetchAllUsersStart());
			} else {
				toast.error("Create a new user failed!")
				dispatch(createUserFailed());
			}
		} catch (e) {
			toast.error("Create a new user failed!")
			dispatch(createUserFailed());
			console.log(e);
		}
	};
}

const createUserSuccess = () => ({
	type: actionTypes.CREATE_USER_SUCCESS
})

const createUserFailed = () => ({
	type: actionTypes.CREATE_USER_FAILED
})

const fetchAllUsersStart = () => {
	return async (dispatch, getState) => {
		try {
			const response = await getAllUsers('ALL');
			if (response && response.errCode === 0) {
				dispatch(fetchAllUsersSuccess(response.users.reverse()));
			} else {
				toast.error("Fetch all user failed!")
				dispatch(fetchAllUsersFailed());
			}
		} catch (e) {
				toast.error("Fetch all user failed!")
				dispatch(fetchAllUsersFailed());
			console.log(e);
		}
	};
};

const fetchAllUsersSuccess = (data) => ({
	type: actionTypes.FETCH_ALL_USERS_SUCCESS,
	users: data
})

const fetchAllUsersFailed = () => ({
	type: actionTypes.FETCH_ALL_USERS_FAILED
})

const editUser = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await editUserService(data);
			if (response && response.errCode === 0) {
				toast.success("Update user succeed!")
				dispatch(editUserSuccess());
				dispatch(fetchAllUsersStart());
			} else {
				toast.error("Update user failed!")
				dispatch(editUserFailed());
			}
		} catch (e) {
			toast.error("Update user failed!")
			dispatch(editUserFailed());
			console.log(e);
		}
	};
}

const editUserSuccess = () => ({
	type: actionTypes.EDIT_USER_SUCCESS
})

const editUserFailed = () => ({
	type: actionTypes.EDIT_USER_FAILED
})

const deleteUser = (userId) => {
	return async (dispatch, getState) => {
		try {
			const response = await deleteUserService(userId);
			if (response && response.errCode === 0) {
				toast.success("Delete user succeed!")
				dispatch(deleteUserSuccess());
				dispatch(fetchAllUsersStart());
			} else {
				toast.error("Delete user failed!")
				dispatch(deleteUserFailed());
			}
		} catch (e) {
			toast.error("Delete user failed!")
			dispatch(deleteUserFailed());
			console.log(e);
		}
	};
}

const deleteUserSuccess = () => ({
	type: actionTypes.DELETE_USER_SUCCESS
})

const deleteUserFailed = () => ({
	type: actionTypes.DELETE_USER_FAILED
})

export {
  fetchGenderStart,
  fetchPositionStart,
  fetchRoleStart,
	createNewUser,
	fetchAllUsersStart,
	editUser,
	deleteUser
};
