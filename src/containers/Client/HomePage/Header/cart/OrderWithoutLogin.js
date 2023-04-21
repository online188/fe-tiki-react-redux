import { numberFormat, totalMoney } from 'components/Formatting/FormatNumber';
import ModalOrderNow from 'containers/Client/product/ModalOrderNow';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItemCart } from 'store/actions';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { path } from 'utils';
import './style.scss';

function OrderWithoutLogin(props) {
    const [hoverCart, setHoverCart] = useState(false);
    const [orderNow, setOrderNow] = useState(false);

    const dispatch = useDispatch();
    const carts = useSelector((state) => state.client.carts);

    //delete item cart
    const DeleteItemCart = (id) => {
        dispatch(deleteItemCart(id));
    };

    //viewCart
    const viewCart = (data) => {
        setOrderNow(!orderNow);
    };

    // console.log(carts.length);
    return (
        <div className="header__cart-wrap">
            <ModalOrderNow show={orderNow} toggle={viewCart} />
            <span className="cart nav-item dropdown active" onMouseEnter={() => setHoverCart(true)}>
                <div className="itemCart">
                    <i className="header__cart-icon fas fa-shopping-cart" style={{ fontSize: '17px' }}>
                        {carts?.length > 0 && <span className="numbCart badge badge-pill badge-danger">{carts.length}</span>}
                    </i>
                </div>
            </span>
            {carts?.length > 0 && (
                <div className="header__cart-list" onMouseLeave={() => setHoverCart(false)}>
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
                                            <div onClick={() => DeleteItemCart(item.id)} className="header__cart-item-remove">
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
                        Tổng tiền :<span className="ml-3 font-weight-bold text-danger">{numberFormat(totalMoney(carts))}</span>
                    </h6>
                    <div onClick={viewCart} className="btn btn-success button-ViewCart">
                        Xem giỏ hàng
                    </div>
                </div>
            )}

            {carts.length === 0 && (
                <div className="header__cart-list" onMouseLeave={() => setHoverCart(false)}>
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
export default OrderWithoutLogin;
