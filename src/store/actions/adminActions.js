import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService } from '../../services/userService';
import { getTopDoctorHomeService, getAllDoctors, saveInfoDoctor, getInfoDoctor } from '../../services/doctorService'
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

//
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

const fetchTopDoctor = () => {
	return async (dispatch, getState) => {
		try {
			const response = await getTopDoctorHomeService('6')
			if (response && response.errCode === 0) {
				dispatch(fetchTopDoctorSuccess(response.data))
			} else {
				dispatch(fetchTopDoctorFailed())
			}
		} catch (e) {
			dispatch(fetchTopDoctorFailed())
			console.log(e);
		}
	};
}

const fetchTopDoctorSuccess = (data) => ({
	type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
	dataDoctors: data
})

const fetchTopDoctorFailed = () => ({
	type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
})

const fetchAllDoctors = () => {
	return async (dispatch, getState) => {
		try {
			const response = await getAllDoctors()
			if (response && response.errCode === 0) {
				dispatch(fetchAllDoctorsSuccess(response.data))
			} else {
				dispatch(fetchAllDoctorsFailed())
			}
		} catch (e) {
			dispatch(fetchAllDoctorsFailed())
			console.log(e);
		}
	};
}

const fetchAllDoctorsSuccess = (data) => ({
	type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
	dataDoctors: data
})

const fetchAllDoctorsFailed = () => ({
	type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
})

const saveInfoOfDoctor = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await saveInfoDoctor(data)
			if (response && response.errCode === 0) {
				toast.success("Save doctor info succeed!")
				dispatch(saveInfoDoctorSuccess())
			} else {
				toast.error("Save doctor info failed!")
				dispatch(saveInfoDoctorFailed())
			}
		} catch (e) {
			toast.error("Save doctor info failed!")
			dispatch(saveInfoDoctorFailed())
			console.log(e);
		}
	};
}

const saveInfoDoctorSuccess = () => ({
	type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
})

const saveInfoDoctorFailed = () => ({
	type: actionTypes.SAVE_INFO_DOCTOR_FAILED,
})

const getInfoOfDoctor = (doctorId) => {
	return async (dispatch, getState) => {
		try {
			const response = await getInfoDoctor(doctorId)
			if (response && response.errCode === 0) {
				dispatch(getInfoDoctorSuccess(response.data))
			} else {
				dispatch(getInfoDoctorFailed())
			}
		} catch (e) {
			dispatch(getInfoDoctorFailed())
			console.log(e);
		}
	};
}

const getInfoDoctorSuccess = (data) => ({
	type: actionTypes.GET_INFO_DOCTOR_SUCCESS,
	dataDoctor: data
})

const getInfoDoctorFailed = () => ({
	type: actionTypes.GET_INFO_DOCTOR_FAILED,
})	

export {
  fetchGenderStart,
  fetchPositionStart,
  fetchRoleStart,
	createNewUser,
	fetchAllUsersStart,
	editUser,
	deleteUser,
	fetchTopDoctor,
	fetchAllDoctors,
	saveInfoOfDoctor,
	getInfoOfDoctor
};
