import { investmentCost, numberFormat } from 'components/Formatting/FormatNumber';
import {GetOrderToday, RevenueToday, NewCustomerMonth} from '../../../store/actions/orderActions';
import {fetchProducts, filterOrderByStatus} from '../../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import './style.scss';

const  Dashboard = (props) => {
    const dispatch = useDispatch();
    const filterOrder = useSelector(state => state.client.filterOrder);
    const orderToday = useSelector(state => state.order.orderToday);
    const revenueToday = useSelector(state => state.order.revenueToday);
    const newCustomer = useSelector(state => state.order.newCustomerMonth);
    const listProducts = useSelector(state => state.admin.products);

    useEffect(() => {
        dispatch(filterOrderByStatus('S0'));
        dispatch(GetOrderToday());
        dispatch(RevenueToday());
        dispatch(NewCustomerMonth());
        dispatch(fetchProducts());
    }, [dispatch])

    return (
        <div className="dashboardTiki">
            <h5 className='my-2'>Tổng quan</h5>
             <div className="detail-overview">
                <div className="statistical col-12 col-sm-12 col-md-8 p-0">
                    <div className="item-statistical" style={{background:'rgb(243 152 16)'}}>
                        <img src="https://thumbs.dreamstime.com/b/shopping-cart-icon-trolley-icon-shopping-cart-icon-trolley-icon-vector-illustration-isolated-white-background-163727286.jpg" alt="" />
                        <div className="stat">
                            <h6 className="card-title small">ĐƠN HÀNG HÔM NAY</h6>
                            <h5 className="card-text font-weight-bold">{orderToday ? orderToday : 0 }</h5>
                        </div>
                    </div>

                    <div className="item-statistical" style={{background:'rgb(25 159 47)'}}>
                        <img src="https://image.shutterstock.com/image-vector/dollar-icon-symbol-vector-money-260nw-1723606144.jpg"  alt="" />
                        <div className="stat">
                            <h6 className="card-title small">DOANH THU HÔM NAY</h6>
                            <h5 className="card-text font-weight-bold">
                                {revenueToday ? numberFormat(revenueToday) : 0}
                            </h5>
                        </div>
                    </div>

                    <div className="item-statistical" style={{background:'rgb(76 117 235)'}}>
                        <img src="https://thumbs.dreamstime.com/b/user-icon-vector-people-profile-person-illustration-business-users-group-symbol-male-195161330.jpg" alt="" />
                        <div className="stat">
                            <h6 className="card-title small">KHÁCH HÀNG MỚI</h6>
                            <h5 className="card-text font-weight-bold">
                                {newCustomer ? newCustomer : 0}
                            </h5>
                        </div>
                    </div>

                    <div className="item-statistical text-danger">
                        <img src="https://previews.123rf.com/images/mariiasimakova/mariiasimakova2004/mariiasimakova200400644/145706280-investment-icon-simple-illustration-from-startup-collection-creative-investment-icon-for-web-design-.jpg"  alt="" />
                        <div className="stat">
                            <h6 className="card-title small text-dark">ĐẦU TƯ</h6>
                            <h5 className="card-text font-weight-bold">
                                {
                                    listProducts?.length>0 ? numberFormat(investmentCost(listProducts)) : 0
                                }
                            </h5>
                        </div>
                    </div>

                    <div className="item-statistical text-primary">
                        <img src="https://icon-library.com/images/revenue-icon-png/revenue-icon-png-2.jpg"  alt="" />
                        <div className="stat">
                            <h6 className="card-title small text-dark">DOANH THU</h6>
                            <h5 className="card-text font-weight-bold">
                            {
                                filterOrder?.length > 0 
                                && filterOrder.filter(item => item.status === 'S4').length > 0 ?
                                <span className="font-weight-bold">
                                    {numberFormat(filterOrder.filter(item => item.status === 'S4').reduce((total, item) => {
                                    return total + item.sale * item.qty
                                    }, 0))}
                                </span>
                                : 
                                <span className='text-primary'>0 đ</span>
                            }
                            </h5>
                        </div>
                    </div>

                    <div className="item-statistical text-success">
                        <img src="https://image.shutterstock.com/image-illustration/growth-icon-business-success-conceptselement-260nw-1464772178.jpg"  alt="" />
                        <div className="stat">
                            <h6 className="card-title small text-dark">LỢI NHUẬN</h6>
                            <h5 className="card-text font-weight-bold">
                            {
                                <span className="font-weight-bold">
                                    {numberFormat(filterOrder.filter(item => item.status === 'S4').reduce((total, item) => {
                                    return total + item.sale * item.qty
                                    }, 0) - investmentCost(listProducts))}
                                </span>
                            }
                            </h5>
                        </div>
                    </div>

                    <div className="overview">
                        <div className='reportStatus'>
                            <img src="https://previews.123rf.com/images/lifeking/lifeking1709/lifeking170900103/85172265-icona-della-linea-di-denaro-semplice-progettazione-dell-illustrazione-di-vettore-del-segno-e-di-simb.jpg" className='illustrator' alt="" />
                            <div className='item-stat-order'>
                                <span className='number'>
                                    {
                                        filterOrder?.length > 0 ?
                                        filterOrder.filter(item => item.status === 'S4').length
                                        - filterOrder.filter(item => item.status === 'S4' && item.bill === '1').length
                                        :
                                        <span className='text-primary'>0</span>
                                    }    
                                </span>
                                <span className='status'>Đơn chưa thanh toán</span>
                            </div>
                        </div>

                        <div className='reportStatus'>
                            <img src="https://previews.123rf.com/images/lifeking/lifeking1709/lifeking170900103/85172265-icona-della-linea-di-denaro-semplice-progettazione-dell-illustrazione-di-vettore-del-segno-e-di-simb.jpg" className='illustrator' alt="" />
                            <div className='item-stat-order'>
                                <span className='number'>
                                    {
                                        filterOrder?.length > 0 ?
                                        filterOrder.filter(item => item.status === 'S4' && item.bill === '1').length
                                        :
                                        <span className='text-primary'>0</span>
                                    }    
                                </span>
                                <span className='status'>Đơn đã thanh toán</span>
                            </div>
                        </div>

                        <div className='reportStatus'>
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/002/206/240/small/fast-delivery-icon-free-vector.jpg" className='illustrator' alt="" />
                            <div className='item-stat-order'>
                                <span className='number'>
                                    {
                                        filterOrder?.length > 0 ?
                                        filterOrder.filter(item => item.status === 'S3').length
                                        : 0
                                    }
                                </span>
                                <span className='status'>Đơn chưa giao</span>
                            </div>
                        </div>

                        <div className='reportStatus'>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_P9W5aTdeA3o7lq1gOyn3afbgJXrOAJ13ZQ&usqp=CAU" className='illustrator' alt="" />
                            <div className='item-stat-order'>
                                <span className='number'>
                                    {
                                        filterOrder?.length > 0 ?
                                        filterOrder.filter(item => item.status === 'S2').length
                                        + filterOrder.filter(item => item.status === 'S1').length
                                        : 0 
                                    }
                                </span>
                                <span className='status'>Đơn chưa hoàn tất</span>
                            </div>
                        </div>

                        <div className='reportStatus'>
                            <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/refund-2225859-1853324.png" className='illustrator' alt="" />
                            <div className='item-stat-order'>
                                <span className='number'>
                                    {
                                        filterOrder?.length > 0 ?
                                        filterOrder.filter(item => item.status === 'S6').length
                                        : 0
                                    }
                                </span>
                                <span className='status'>Đơn hoàn trả</span>
                            </div>
                        </div>

                        <div className='reportStatus'>
                            <img src="https://image.shutterstock.com/image-vector/shopping-cart-icon-cancel-illustration-260nw-1405493777.jpg" className='illustrator' alt="" />
                            <div className='item-stat-order'>
                                <span className='number'>
                                    {
                                        filterOrder?.length > 0 ?
                                        filterOrder.filter(item => item.status === 'S5').length
                                        : 0 
                                    }
                                </span>
                                <span className='status'>Đơn huỷ</span>
                            </div>
                        </div>
                </div>
                </div>

                <div className="col-12 col-md-4 revenue">
                    <div className='d-flex justify-content-between'>
                        <div className='item-revenue'>DOANH THU</div>
                        <div className="form-group">
                            <select className="form-control">
                                <option>Hôm nay</option>
                                <option>Tuần nay</option>
                            </select>
                        </div>
                    </div>
                    <div className="revenue-chart">
                        updating chart ...
                        <br />
                        <br />
                        <br />
                        <hr />
                    </div>  

                    <div className='item-revenue'>SẢN PHÂM BÁN CHẠY</div>
                    <div className="">
                        updating ...
                        <br />
                        <br />
                        <br />
                        <hr />
                    </div> 

                    <div className='item-revenue'>KHÁCH HÀNG TIỀM NĂNG</div>
                    <div className="">
                        updating ...
                        <br />
                        <br />
                        <br />
                    </div> 
                </div>
            </div>
        </div>
    )
}
export default Dashboard;
