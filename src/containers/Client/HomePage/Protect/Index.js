import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { path } from 'utils';
import React from 'react';
import './NotFound.scss';

import image from '../../../../assets/images/Loading.gif';

const Protect = () => {
    const history = useHistory();

    return (
        <>
            <Header />
            <div className="container main">
                <div className="err">
                    <img src={image} className="w-25" alt="" />
                </div>

                <div className="btn-quit">
                    <div onClick={() => history.goBack()}>
                        <button type="button" className="btn btn-primary">
                            <i className="fa fa-angle-left mr-2"></i> Quay lại trang trước
                        </button>
                    </div>
                    <Link to={path.HOMEPAGE}>
                        <button type="button" className="btn btn-success">
                            Trang chủ
                        </button>
                    </Link>

                    <Link to={path.HOMEPAGE}>
                        <button type="button" className="btn btn-warning">
                            Mua hàng
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};
export default Protect;
