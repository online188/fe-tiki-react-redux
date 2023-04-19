import { BrowserRouter as Router, Route, Switch, NavLink, Redirect } from 'react-router-dom';
import Footer from 'containers/Client/HomePage/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Activity from '../notification/Activity';
import ChangePassword from './ChangePassword';
import Purchase from '../MyOrder/Purchase';
import Order from '../notification/Order';
import Voucher from '../voucher/Voucher';
import InfoPayment from './InfoPayment';
import { getUser } from 'store/actions';
import { MenuUser } from './DataMenu';
import TikiXu from '../coin/TikiXu';
import Header from '../../Header';
import Address from './Address';
import Profile from './Profile';
import { path } from 'utils';

const InfoAccount = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const user = useSelector((state) => state.auth.user);
    const [subMenu, setSubMenu] = useState(`${path.ACCOUNT}`);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    useEffect(() => {
        document.title = 'Thông tin tài khoản';
    }, [user]);

    if (!token) {
        return <Redirect to={path.HOMEPAGE} />;
    }

    return (
        <div className="bg-light">
            <Header />
            <Router>
                <div className="infoAccount container">
                    <div className="menuUser col-md-2">
                        <div className="avatar d-flex">
                            <img src={user?.image ? user.image : 'https://avatars.githubusercontent.com/u/83853020?v=4'} className="rounded-circle" style={{ width: '60px', height: '60px' }} alt="" />
                            <div className="info">
                                <div className="name">{user ? user.username : ''}</div>
                                <div className="editProfile small mt-1">
                                    <i className="fas fa-pencil-alt"></i>
                                    <span>Sửa hồ sơ</span>
                                </div>
                            </div>
                        </div>

                        {MenuUser?.length > 0 &&
                            MenuUser.map((item, index) => {
                                return (
                                    <div key={index} className="menu-user">
                                        <NavLink to={item.path} activeClassName={`${item.sub ? '' : 'activeMenu'}`} className="item-menu">
                                            <div className="item" onClick={() => setSubMenu(item.path)}>
                                                <img src={item.icon} alt="" />
                                                <span>{item.name}</span>
                                            </div>
                                        </NavLink>

                                        {subMenu === item.path && (
                                            <div className="subMenu">
                                                {item.sub?.length > 0 &&
                                                    item.sub.map((sub, index) => {
                                                        return (
                                                            <NavLink to={sub.path} key={index} className="item-menu" activeClassName="activeSubMenu">
                                                                <div>{sub.name}</div>
                                                            </NavLink>
                                                        );
                                                    })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </div>

                    <div className="contentUser col-md-10">
                        <Switch>
                            <Route exact path={path.ACCOUNT} component={Profile} />
                            <Route path={path.CHANGE_PASSWORD} component={ChangePassword} />
                            <Route path={path.CHANGE_ADDRESS} component={Address} />
                            <Route path={path.INFO_PAYMENT} component={InfoPayment} />

                            <Route path={path.ORDER} component={Purchase} />
                            <Route path={path.NOTIFICATION} component={Order} />
                            <Route path={path.ACTIVITY} component={Activity} />
                            <Route path={path.TIKI_XU} component={TikiXu} />
                            <Route path={path.VOUCHER} component={Voucher} />
                        </Switch>
                    </div>
                </div>
            </Router>
            <Footer />
        </div>
    );
};
export default InfoAccount;
