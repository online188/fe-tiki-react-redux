import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { path } from 'utils';
import React from 'react';
import './NotFound.scss';

import image from '../../../../assets/images/Loading.gif';
import { useEffect } from 'react';
import { GetUser } from 'services/authService';
import { getUser } from 'store/actions';
import { useDispatch } from 'react-redux';

const Protect = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const token = localStorage.getItem('token');

    useEffect(() => {
        getAccount();
        // GetUser().then((res) => {
        //     console.log('res: ', res);
        //     // localStorage.removeItem('token');
        // });
    }, []);

    const getAccount = async () => {
        await GetUser();
        if (token) {
            await GetUser()
                .then((res) => {
                    if (res) {
                        dispatch(getUser(res));
                    }
                    // localStorage.removeItem('token');
                })
                .catch((err) => {
                    // localStorage.removeItem('token');
                    console.log(err);
                });
        }
    };

    return (
        <>
            {/* <Header /> */}
            <div className="login-bg ">
                <img src={image} className="w-25" alt="" />
            </div>
        </>
    );
};
export default Protect;
