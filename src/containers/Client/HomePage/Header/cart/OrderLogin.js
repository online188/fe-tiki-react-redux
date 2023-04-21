import { numberFormat, totalMoney } from 'components/Formatting/FormatNumber';
import { DeleteItemCartByUser, GetCartByUser } from 'store/actions';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { path } from 'utils';
import './style.scss';

function OrderLogin(props) {
    const dispatch = useDispatch();
    const [hoverCart, setHoverCart] = useState(false);
    const carts = useSelector((state) => state.client.cartsUser);
    const user = useSelector((state) => state.auth.user);

    // get cart by user
    let userId = user ? user.id : '';
    useEffect(() => {
        try {
            dispatch(GetCartByUser(userId));
        } catch (e) {
            console.log('get cart by user fail', e);
        }
    }, [dispatch, userId]);

    // delete item cart
    const deleteItemCart = (productId) => {
        dispatch(DeleteItemCartByUser(productId));
        setTimeout(() => {
            dispatch(GetCartByUser(userId));
        }, 1000);
    };

    return (
        <div className="header__cart-wrap">
            <span className="cart nav-item dropdown active">
                <div className="itemCart">
                    <i className="header__cart-icon fas fa-shopping-cart" style={{ fontSize: '17px' }}>
                        <span className="numbCart badge badge-pill badge-danger">{carts?.length > 0 && carts.length}</span>
                    </i>
                </div>
            </span>
            {carts?.length > 0 && (
                <div className="header__cart-list">
                    <h6 className="header__cart-heading">Sản phẩm đã thêm</h6>
                    <hr />
                    {carts.map((item, index) => {
                        return (
                            <div className="" key={index}>
                                <div className="info">
                                    <div className="infoCart">
                                        <div className="col-md-2 p-0">
                                            <img className="w-100 rounded" src={item.image} alt="" />
                                        </div>

                                        <div className="col-md-6 mt-1 pl-2 p-0 content">
                                            <small>{item.name}</small>
                                            <div className="text-muted small mt-3">Trả góp 0% - Tặng phụ kiện - Voucher 5% </div>
                                        </div>

                                        <div className="col-md-4 p-0 price">
                                            <div className="header__cart-item-price-wrap">
                                                <h6 className="header__cart-item-price">{numberFormat(item.sale)}</h6>
                                                <span className="header__cart-item-multiply">x</span>
                                                <span className="header__cart-item-qnt">{item.qty}</span>
                                            </div>
                                            <div onClick={() => deleteItemCart(item.id)} className="header__cart-item-remove">
                                                Xóa
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        );
                    })}

                    <h6>
                        Tổng tiền :<span className="ml-3 font-weight-bold text-danger">{carts?.length > 0 ? numberFormat(totalMoney(carts)) : 0}</span>
                    </h6>
                    <Link to={`${path.CART}`} className="btn btn-success">
                        Xem giỏ hàng
                    </Link>
                </div>
            )}

            {carts.length === 0 && (
                <div className="header__cart-list">
                    <div>
                        <img className="header__cart-no-cart-img" src="https://salt.tikicdn.com/desktop/img/mascot@2x.png" alt="" />
                        <p className="header__cart-list-no-cart-msg">Chưa có sản phẩm nào trong giỏ hàng</p>
                        <Link to={`${path.HOMEPAGE}`}>
                            <button type="button" className="btn btn-primary">
                                Mua hàng
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
export default OrderLogin;
