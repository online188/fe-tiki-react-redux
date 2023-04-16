import actionTypes from '../actions/actionTypes';

// eslint-disable-next-line no-restricted-globals
let screenWidth = screen.width;
let numberLoad = 12;
if (screenWidth < 768) {
    // Mobile layout
    numberLoad = 4;
} else if (screenWidth < 992) {
    // Tablet layout
    numberLoad = 8;
} else if (screenWidth < 1200) {
    // Desktop layout
    numberLoad = 12;
} else {
    // Large desktop layout
    numberLoad = 12;
}

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    numberLoad,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload,
            };
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        default:
            return state;
    }
};

export default appReducer;
