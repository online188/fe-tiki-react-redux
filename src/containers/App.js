import { userIsAdminRedir, userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { ConnectedRouter as Router } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { history } from '../redux';
import { path } from '../utils';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import InfoAccount from './Client/HomePage/Header/account/Profile/InfoAccount';
import Discount from './Client/HomePage/Header/account/voucher/Discount';
import SearchResult from './Client/HomePage/Header/search/Result';
import Register from './Client/HomePage/Header/account/Register';
import LoginAuth from './Client/HomePage/Header/account/Login';
import OrderSuccess from './Client/Check_order/OrderSuccess';
import ProductDetail from './Client/product/ProductDetail';
import VerifyEmail from './Client/Check_order/VerifyEmail';
import NotFound from './Client/HomePage/NotFound/Index';
import HomePage from './Client/HomePage/HomePage';
import Payment from './Client/payment/Payment';
import Login from './System/Auth/Login';
import System from '../routes/System';
import Cart from './Client/cart/Cart';
import Home from '../routes/Home';
import './App.scss';
import ScrollToTop from './Client/HomePage/ScrollToTop';
import { GetUser } from 'services/authService';
import { getUser } from 'store/actions';

function App(props) {
    // Need to apply the hocs here to avoid applying them inside the render method
    const LoginComponent = userIsNotAuthenticated(Login);
    const SystemComponent = userIsAuthenticated(userIsAdminRedir(System));

    const dispatch = useDispatch();

    const token = localStorage.getItem('token');
    // get user
    useEffect(() => {
        getAccount();
    }, []);

    const getAccount = async () => {
        if (token) {
            await GetUser()
                .then((res) => {
                    dispatch(getUser(res));
                })
                .catch((err) => {
                    localStorage.removeItem('token');
                    console.log(err);
                });
        }
    };

    // console.log(
    //     'Check state.auth: ',
    //     useSelector((state) => state.auth)
    // );

    // setStateAuthUser(useSelector((state) => state.auth.user));

    return (
        <Router history={history}>
            <ScrollToTop />
            <ToastContainer autoClose={3000} />
            <Switch>
                <Route path={path.HOME} exact component={Home} />
                <Route path={path.LOGIN} component={LoginComponent} />
                <Route path={path.SYSTEM} component={SystemComponent} />

                {/* client  */}
                <Route exact path={path.HOMEPAGE} component={HomePage} />
                <Route exact path={path.DETAIL_PRODUCT} component={ProductDetail} />
                <Route exact path={path.SEARCH} component={SearchResult} />
                <Route exact path={path.DISCOUNT_DETAIL} component={Discount} />

                {/* Auth*/}
                <Route path={path.REGISTER} component={Register} />
                <Route path={path.LOGIN_AUTH} component={LoginAuth} />

                <Route path={path.ACCOUNT} component={InfoAccount} />
                <Route path={path.CHANGE_PASSWORD} component={InfoAccount} />
                <Route path={path.CHANGE_ADDRESS} component={InfoAccount} />
                <Route path={path.INFO_PAYMENT} component={InfoAccount} />
                <Route path={path.ORDER} component={InfoAccount} />
                <Route path={path.NOTIFICATION} component={InfoAccount} />
                <Route path={path.ACTIVITY} component={InfoAccount} />
                <Route path={path.TIKI_XU} component={InfoAccount} />
                <Route path={path.VOUCHER} component={InfoAccount} />

                {/* Order with login  */}
                <Route path={path.CART} component={Cart} />
                <Route path={path.PAYMENT} component={Payment} />
                <Route path={path.MY_ORDER} component={OrderSuccess} />
                <Route path={path.VERIFY_EMAIL} component={VerifyEmail} />

                <Route exact path="*">
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
}
export default App;
