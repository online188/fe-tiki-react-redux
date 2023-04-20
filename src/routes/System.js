import MenuLeftCollapse from 'containers/System/Header/menuLeft/MenuLeftCollapse';
import ProductManage from '../containers/System/Product/ProductManage';
import Dashboard from '../containers/System/Dashboard/Dashboard';
import OrderManage from '../containers/System/Order/OrderManage';
import UserManage from '../containers/System/Admin/UserManage';
import NewsManage from '../containers/System/News/NewsManage';
import { Redirect, Route, Switch } from 'react-router-dom';
import ArticleManage from '../containers/System/Article/ArticleManage';
import CategoryManage from '../containers/System/Category/CategoryManage';
import StatisticalManage from '../containers/System/Statistical/Statistical';
import Notification from 'containers/System/Header/notification/Notification';
import MenuLeft from 'containers/System/Header/menuLeft/MenuLeft';
import Multimedia from '../containers/System/Multimedia/Index';
import VoteManage from 'containers/System/Vote/VoteManage';
import Discount from 'containers/System/discount/Discount';
import Setting from '../containers/System/Setting/Index';
import React, { useState, useEffect } from 'react';
import Bill from 'containers/System/Sale/Bill';
import * as actions from './../store/actions';
import { connect } from 'react-redux';
import { path } from 'utils';
import './style.scss';
import ProductManageNew from 'containers/System/ProductNew/ProductManage';
import OrderManageNew from 'containers/System/OrderNew/OrderManage';

const System = (props) => {
    const { systemMenuPath, isLoggedIn, userInfo, processLogout } = props;
    const [menuLeft, setMenuLeft] = useState(true);
    const [rightContent, setRightContent] = useState('rightContent');
    const [widthMenuLeft] = useState('menuLeft');
    const avatar = 'https://avatars.githubusercontent.com/u/83853020?v=4';

    const toggleMenu = () => {
        setMenuLeft(!menuLeft);
        setRightContent(menuLeft ? 'fullMenuLeft' : 'rightContent');
    };

    useEffect(() => {
        document.title = 'Hệ thống quản lý Tiki';
    }, []);

    return (
        <div className="main-container">
            <div className="module">
                {menuLeft && <MenuLeft widthMenuLeft={widthMenuLeft} toggleMenu={toggleMenu} />}
                {!menuLeft ? <MenuLeftCollapse /> : ''}

                <div className={`system-container ${rightContent}`}>
                    <div className="menuAdmin">
                        <div className="collapse_module">
                            <span onClick={() => toggleMenu()}>
                                <i className="fas fa-bars"></i>
                            </span>
                        </div>

                        <div className="account">
                            <Notification />
                            <div className="acc">
                                <img src={avatar} alt="" className="rounded-circle mr-2" />
                                <span>
                                    {userInfo?.firstName ? userInfo.firstName : 'HoangNam'}
                                    <i className="fas fa-caret-down small"></i>
                                </span>
                            </div>
                            <div className="logout btn" onClick={processLogout}>
                                Thoát
                            </div>
                        </div>
                    </div>

                    <div className="system-list">
                        <Switch>
                            <Route path={`${path.DASHBOARD}`} component={Dashboard} />
                            <Route path={`${path.USER_MANAGE}`} component={UserManage} />
                            <Route path={`${path.PRODUCT_MANAGE}`} component={ProductManage} />
                            <Route path={`${path.PRODUCT_MANAGE_NEW}`} component={ProductManageNew} />
                            <Route path={`${path.ORDER_MANAGE}`} component={OrderManage} />
                            <Route path={`${path.ORDER_MANAGE_NEW}`} component={OrderManageNew} />
                            <Route path={`${path.ARTICLE_MANAGE}`} component={ArticleManage} />
                            <Route path={`${path.NEWS_MANAGE}`} component={NewsManage} />
                            <Route path={`${path.CATEGORY_MANAGE}`} component={CategoryManage} />
                            <Route path={`${path.MULTIMEDIA_MANAGE}`} component={Multimedia} />
                            <Route path={`${path.STATISTICAL}`} component={StatisticalManage} />
                            <Route path={`${path.SALE_MANAGE}`} component={Bill} />
                            <Route path={`${path.VOTE_MANAGE}`} component={VoteManage} />
                            <Route path={`${path.DISCOUNT_MANAGE}`} component={Discount} />
                            <Route path={`${path.SETTING}`} component={Setting} />

                            <Route
                                component={() => {
                                    return <Redirect to={systemMenuPath} />;
                                }}
                            />
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(System);
