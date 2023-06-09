import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import userReducer from './userReducer';
import adminReducer from './adminReducer';
import clientReducer from './clientReducer';
import authReducer from './authReducer';
import ratingReducer from './ratingReducer';
import discountReducer from './discountReducer';
import orderReducer from './orderReducer';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo'],
};

export default (history) =>
    combineReducers({
        router: connectRouter(history),
        user: userReducer,
        // user: persistReducer(userPersistConfig, userReducer),
        admin: adminReducer,
        client: clientReducer,
        auth: authReducer,
        rating: ratingReducer,
        discount: discountReducer,
        order: orderReducer,
    });
