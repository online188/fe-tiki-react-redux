import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.scss';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';

import axios from "axios";
import { Provider } from 'react-redux';
import reduxStore, { persistor } from './redux';
axios.defaults.withCredentials = false;

const renderApp = () => {
    ReactDOM.render(
        <Provider store={reduxStore}>
            <App persistor={persistor}/>
        </Provider>,
    document.getElementById('root')
    );
};

renderApp();
serviceWorker.unregister();
