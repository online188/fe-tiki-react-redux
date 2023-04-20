import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

const locationHelper = locationHelperBuilder({});

// authenticatedSelector: True => ko redirect, ở lại trang con
export const userIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: (state) => state.auth.user !== null,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectPath: '/login',
});

// authenticatedSelector: False => redirect, nhẩy vô trang cần đến
// authenticatedSelector: True => ở lại trang con là trang login
export const userIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: (state) => state.auth.user === null,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false,
});
