import { numberFormat, totalMoney } from 'components/Formatting/FormatNumber';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import Header from '../HomePage/Header/Header';
import { CheckoutOrder } from 'store/actions';
import { useHistory } from 'react-router';
import { path } from 'utils';
import moment from 'moment';
import './style.scss';

const Payment = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const cartsUser = useSelector((state) => state.client.cartsUser);
    const delivery = useSelector((state) => state.client.delivery);
    const payment = useSelector((state) => state.client.payment);
    const user = useSelector((state) => state.auth.user);
    const [loadingOrder, setLoadingOrder] = useState(false);

    const date = new Date();
    const dateOrder = date.valueOf() + 7 * 60 * 60;
    const [deliveryMethod, setDeliveryMethod] = useState('GIAO HÀNG TẬN NƠI');
    const [paymentMethod, setPaymentMethod] = useState('Tiền mặt');
    const [coupon, setCoupon] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const dateDelivery = date.setDate(date.getDate() + 3);
    const dateDeliveryFormat = moment(dateDelivery).locale('vi').format('dddd, DD/MM/YYYY');

    // Fee delivery
    const handleDelivery = (e) => {
        setDeliveryMethod(e.target.value);
        if (e.target.value === 'GIAO HÀNG TẬN NƠI') {
            setDeliveryFee(0);
            setCoupon(0);
        } else {
            setDeliveryFee(0);
            setCoupon(0);
        }
    };

    // payment -checkout order
    const handlePayment = () => {
        let newCart = cartsUser.map((cart) => {
            return {
                id: Math.floor(Math.random() * 1000000),
                productId: cart.productId,
                image: cart.image,
                name: cart.name,
                price: cart.price,
                sale: cart.sale,
                qty: cart.qty,
                userId: cart.userId,
            };
        });
        setLoadingOrder(true);
        dispatch(
            CheckoutOrder({
                arrOrder: newCart,
                username: user.username,
                phone: user.phoneNumber,
                address: user.address,
                email: user.email,
                delivery: deliveryMethod,
                payment: paymentMethod,
                date: dateOrder,
                timeTrack: dateOrder,
                dateDelivery: dateDelivery,
            })
        );

        setTimeout(() => {
            setLoadingOrder(false);
            history.push(path.MY_ORDER);
        }, 2000);
    };

    useEffect(() => {
        document.title = 'Thanh toán đơn hàng';
    }, []);

    return (
        <>
            <Header />
            <LoadingOverlay active={loadingOrder} spinner text="Đang xử lý đơn hàng...">
                <div className="paymentInfo">
                    <div className="container">
                        <div className="paymentDetail row">
                            <div className="delivery col-md-9">
                                <div className="deliveryMethod">
                                    <div>
                                        <h6 className="text-dark">1. Chọn hình thức giao hàng</h6>
                                        <div className="option_delivery row">
                                            {delivery?.length > 0 &&
                                                delivery.map((item, index) => {
                                                    return (
                                                        <div className="standard col-md-6" key={index}>
                                                            <div className="bg-light p-3 text-center">
                                                                <input
                                                                    type="radio"
                                                                    className="form-check-input"
                                                                    name="delivery"
                                                                    id={item.valueVi}
                                                                    value={item.valueVi}
                                                                    onChange={handleDelivery}
                                                                    defaultChecked={index === 0}
                                                                />
                                                                <label>{item.valueVi}</label>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                        </div>

                                        <div className="info_prod">
                                            <div className="col-md-6 p-0 row">
                                                {cartsUser?.length > 0 ? (
                                                    cartsUser.map((item, index) => {
                                                        return (
                                                            <div className="d-flex border-bottom align-items-center py-2" key={index}>
                                                                <div className="col-md-3 p-0">
                                                                    <img className="w-75" src={item.image} alt="" />
                                                                </div>

                                                                <div className="col-md-5 p-0">
                                                                    <small>{item.name}</small>
                                                                    <p>Số lượng: X{item.qty} </p>
                                                                </div>

                                                                <div className="col-md-4 p-0 text-right">
                                                                    <span>{numberFormat(item.sale)}</span>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <div className="col-md-12 p-0">
                                                        <p>Không có sản phẩm nào trong giỏ hàng</p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="col-md-6 p-0 my-3 row">
                                                <div className="col-md-8 ">
                                                    <span className="text-success">Giao vào {dateDeliveryFormat}</span>
                                                    <p>Được giao bởi HoangNam</p>
                                                    <span className="text-danger">{deliveryMethod ? deliveryMethod : ''}</span>
                                                </div>

                                                <div className="col-md-4 p-0 text-right">
                                                    <span>{numberFormat(deliveryFee)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h6 className="text-dark mt-3 mb-3">2. Chọn hình thức thanh toán</h6>
                                        <div className="option_payment border mt-3 p-3">
                                            {payment?.length > 0 ? (
                                                payment.map((item, index) => {
                                                    return (
                                                        <div className="form-check mb-3" key={index}>
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="payment"
                                                                id={item.valueVi}
                                                                value={item.valueVi}
                                                                onChange={() => setPaymentMethod(item.valueVi)}
                                                            />
                                                            <label className="form-check-label" htmlFor="money">
                                                                {item.valueVi}
                                                            </label>
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <div className="col-md-12 p-0">Không có hình thức thanh toán nào</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="payment-info col-md-3 pr-0">
                                <div className="addrOrder">
                                    <div className="border-bottom">Địa chỉ giao hàng</div>
                                    <div className="mt-2">
                                        <b>{user ? user.username : ''}</b>
                                        <p className="mb-0">Địa chỉ: {user ? user.address : ''}</p>
                                        <p className="mb-0">Điện thoại: {user ? user.phoneNumber : ''}</p>
                                        <p className="mb-0">Email: {user ? user.email : ''}</p>
                                    </div>
                                </div>

                                <div className="paymentCalc">
                                    <div className="changeOrder">
                                        <div>
                                            <div>Đơn hàng</div>
                                            <small className="text-success">{cartsUser?.length > 0 ? cartsUser.length : 0} Sản phẩm</small>
                                        </div>
                                        <button type="button" className="btn btn-success btn-sm">
                                            Thay đổi
                                        </button>
                                    </div>
                                    <div className="valueOrder">
                                        <div>
                                            <span>Tạm tính</span>
                                        </div>
                                        <h6>{cartsUser?.length > 0 ? numberFormat(totalMoney(cartsUser)) : 0}</h6>
                                    </div>
                                    <div className="valueOrder">
                                        <div>
                                            <span>Phí vận chuyển</span>
                                        </div>
                                        <h6>{numberFormat(deliveryFee)}</h6>
                                    </div>
                                    <div className="valueOrder">
                                        <div>
                                            <span>Giảm giá</span>
                                        </div>
                                        <h6>-{numberFormat(coupon)}</h6>
                                    </div>{' '}
                                    <hr />
                                    <div className="totalMoney">
                                        <div>
                                            <span>Thành tiền</span>
                                        </div>
                                        <h5 className="text-danger">{cartsUser?.length > 0 ? numberFormat(totalMoney(cartsUser) - coupon + deliveryFee) : 0}</h5>
                                    </div>
                                    <div className="text-right text-secondary small">(Đã bao gồm VAT)</div>
                                </div>
                                <button onClick={() => handlePayment()} type="button" className="btn btn-danger btn-block mt-3 mb-1">
                                    Tiến hành thanh toán
                                </button>
                                <small className="text-secondary">( Vui lòng kiểm tra đơn hàng trước khi thanh toán )</small>
                            </div>
                        </div>
                    </div>
                </div>
            </LoadingOverlay>
        </>
    );
};
export default Payment;
