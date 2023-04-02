import actionTypes from './actionTypes';

const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})


const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})

const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

export { addUserSuccess, userLoginSuccess, userLoginFail, processLogout }