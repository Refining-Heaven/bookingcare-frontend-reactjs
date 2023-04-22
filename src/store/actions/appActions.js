import actionTypes from './actionTypes';

// Không truyền data
export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE
});

// Truyền data
export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal
});

export const changeLanguageApp = (language) => ({
    type: actionTypes.CHANGE_LANGUAGE,
    language: language
})