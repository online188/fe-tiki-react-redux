import { handleLoginApi } from 'services/userService';
import { getUser, userLoginSuccess } from 'store/actions';
import { push } from 'connected-react-router';
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Login.scss';
import { loginAcc } from 'services/authService';
import instance from 'axios';
import { path } from 'utils';

const Login = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    //login
    // const handleLogin=async()=>{
    //     setErrMessage('');
    //     try{
    //         let data= await handleLoginApi(userName, password);
    //         if(data?.data.errCode !==0){
    //             setErrMessage(data.data.errMessage);
    //         }
    //         if(data?.data.errCode ===0){
    //             props.userLoginSuccess(data.user)
    //         }
    //     }catch(error){
    //         if(error.response){
    //             if(error.response.data){
    //                 setErrMessage(error.response.data.message);
    //             }
    //         }
    //     }
    // }

    const history = useHistory();
    const dispatch = useDispatch();
    const handleLogin = async () => {
        try {
            let res = await loginAcc({ email: userName, password });
            if (res?.data.errCode !== 0) {
                setErrMessage(res.data.errMessage);
            }
            localStorage.setItem('token', res.data.accessToken);
            console.log(res.data);
            const user = await instance.get(`${path.PORT}/user`, {
                headers: {
                    Authorization: `Bearer ${res.data.accessToken}`,
                },
            });
            // console.log(user);
            dispatch(getUser(user));
            setTimeout(() => {
                if (res.data.status === 200) {
                    history.push(`${path.DASHBOARD}`);
                }
            }, 1500);
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    setErrMessage(error.response.data.message);
                }
            }
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            handleLogin();
        }
    };

    //show-hide password
    const showPass = () => {
        setIsShowPassword(!isShowPassword);
    };

    return (
        <div className="login-bg">
            <div className="login-container">
                <div className="login-content row">
                    <div className="login col-12 text-login"> Đăng nhập hệ thống </div>
                    <div className="col-12 form-group login-input">
                        <label>Tên đăng nhập:</label>
                        <input type="text" className="form-control" placeholder="Enter your username..." value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>

                    <div className="col-12 form-group login-input">
                        <label>Mật khẩu:</label>
                        <div className="custom-input-password">
                            <input
                                type={isShowPassword ? 'text' : 'password'}
                                className="form-control"
                                placeholder="Enter your password... "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e)}
                            />
                            <span onClick={() => showPass()}>
                                <i className={isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                            </span>
                        </div>
                    </div>
                    <div className="col-12 text-danger"> {errMessage}</div>

                    <div className="col-12">
                        <button className="btn-login" onClick={() => handleLogin()}>
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(userLoginSuccess(userInfo)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
