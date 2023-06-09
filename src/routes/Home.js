import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = (props) => {
    const isLoggedIn = useSelector((state) => state.auth?.user?.roleId === 'Admin');
    let linkToRedirect = isLoggedIn ? '/system/dashboard' : '/home';

    return <Redirect to={linkToRedirect} />;
};
export default Home;
