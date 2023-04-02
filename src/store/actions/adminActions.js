import actionTypes from "./actionTypes";

const adminLoginSuccess = (adminInfo) => ({
  type: actionTypes.ADMIN_LOGIN_SUCCESS,
  adminInfo: adminInfo
})

const adminLoginFail = () => ({
  type: actionTypes.ADMIN_LOGIN_FAIL
})

export { adminLoginSuccess, adminLoginFail }