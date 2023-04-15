import { filterOrderByStatus, getAllOrder, getStatusOrder, SendBillCustomer, updateOrderStatus } from 'store/actions';
import { numberFormat } from 'components/Formatting/FormatNumber';
import { formatDateNew } from 'components/Formatting/FormatDate';
import { useSelector, useDispatch } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import React, { useState, useEffect } from 'react';
import { TabContent, TabPane } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import VerifyOrder from './VerifyOrder';
import SortOrder from './SortOrder';
import TabOrder from './TabOrder';
import SendBill from './SendBill';
import './style.scss';

const OrderManage = (props) => {
    const [activeTab, setActiveTab] = useState('62');
    const [modalVerifyOrder, setModalVerifyOrder] = useState(false);
    const [updateOrder, setUpdateOrder] = useState([]);

    const [modalSendBill, setModalSendBill] = useState(false);
    const [BillCustomer, setBillCustomer] = useState([]);
    const [loadBill, setLoadBill] = useState(false);

    //fetch data order
    const dispatch = useDispatch();
    const order = useSelector((state) => state.client.orders);
    const status = useSelector((state) => state.client.statusOrder);
    const filterOrder = useSelector((state) => state.client.filterOrder);

    console.log('filterOrder old:', filterOrder);

    useEffect(() => {
        dispatch(getAllOrder());
        dispatch(getStatusOrder());
        dispatch(filterOrderByStatus('S0'));
    }, [dispatch]);

    // verify order
    const verifyOrder = (order) => {
        setUpdateOrder(order);
        setModalVerifyOrder(!modalVerifyOrder);
    };
    const UpdateOrder = (data) => {
        dispatch(updateOrderStatus(data));
        setTimeout(() => {
            dispatch(getAllOrder());
            dispatch(filterOrderByStatus(updateOrder && updateOrder.status));
        }, 1000);
    };

    // send bill
    const sendBill = (order) => {
        setModalSendBill(!modalSendBill);
        setBillCustomer(order);
    };
    const Bill = (data) => {
        setLoadBill(true);
        dispatch(SendBillCustomer(data));
        setTimeout(() => {
            dispatch(filterOrderByStatus(data && data.status));
            setLoadBill(false);
        }, 5000);
    };

    //pagination
    const orderPerPage = 9;
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * orderPerPage;
    const pageCount = Math.ceil(filterOrder.length / orderPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    // search
    const [search, setSearch] = useState('');
    const bySearch = (order, search) => {
        if (search) {
            return order.code.toUpperCase().includes(search.toUpperCase());
        } else return order;
    };
    const filteredList = (filterOrder, search) => {
        return filterOrder.filter((order) => bySearch(order, search));
    };

    return (
        <div className="orderManage p-2 bg-white">
            <VerifyOrder isOpen={modalVerifyOrder} toggle={verifyOrder} updateOrder={updateOrder} verifyOrder={UpdateOrder} />

            <LoadingOverlay active={loadBill} spinner text="Đang gửi hoá đơn, vui lòng đợi trong giây lát...">
                <SendBill isOpen={modalSendBill} toggle={sendBill} bill={BillCustomer} sendBill={Bill} />

                <h5 className="orderTitle mb-2">Đơn hàng</h5>
                <TabOrder status={status} activeTab={activeTab} setActiveTab={setActiveTab} order={order} />

                <TabContent activeTab={activeTab} className="listOrder">
                    <TabPane tabId={activeTab} className="tableOrder">
                        {/* Chưa làm phần tìm kiếm này */}
                        <SortOrder setSearch={setSearch} />

                        <div className="list-order mt-3">
                            <table className="table table-striped table-bordered table-hover">
                                <thead className="text-white">
                                    <tr>
                                        <td>STT</td>
                                        <td>Mã ĐH</td>
                                        <td>Khách hàng</td>
                                        <td>Sản phẩm</td>
                                        <td>Đơn giá </td>
                                        <td>SL</td>
                                        <td>Tổng tiền</td>
                                        <td>Ngày đặt</td>
                                        <td>Ngày giao (DK)</td>
                                        <td>Trạng thái</td>
                                        <td>Tác vụ</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filterOrder?.length > 0 ? (
                                        filteredList(filterOrder, search)
                                            .slice(pagesVisited, pagesVisited + orderPerPage)
                                            .map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.code}</td>
                                                        <td className="text-primary font-weight-bold">{item.username}</td>
                                                        <td>{item.name}</td>
                                                        <td>{numberFormat(item.sale)}</td>
                                                        <td>{item.qty}</td>
                                                        <td>{numberFormat(item.sale * item.qty)}</td>
                                                        <td>{item.date ? formatDateNew(item.date) : ''}</td>
                                                        <td>{item.dateDelivery ? formatDateNew(item.dateDelivery) : ''}</td>
                                                        <td className="font-weight-bold small">
                                                            {item.status === 'S1' && <span className="badge badge-warning">Chờ xử lý</span>}
                                                            {item.status === 'S2' && <span className="badge badge-success">Đã xác nhận</span>}
                                                            {item.status === 'S3' && <span className="badge badge-primary">Đang giao</span>}
                                                            {item.status === 'S4' && <span className="badge badge-success">Đã giao</span>}
                                                            {item.status === 'S5' && <span className="badge badge-danger">Đã hủy</span>}
                                                            {item.status === 'S6' && <span className="badge badge-warning">Hoàn trả</span>}
                                                        </td>
                                                        <td style={{ width: '10%' }}>
                                                            {item.status === 'S1' && (
                                                                <>
                                                                    <span onClick={() => verifyOrder(item)} className="actionOrder text-primary">
                                                                        Xác nhận
                                                                    </span>
                                                                    <div className="actionOrder text-danger">Huỷ đơn</div>
                                                                </>
                                                            )}

                                                            {item.status === 'S2' && (
                                                                <>
                                                                    <span onClick={() => verifyOrder(item)} className="actionOrder text-primary">
                                                                        Giao hàng
                                                                    </span>
                                                                    <div className="actionOrder text-danger">Huỷ đơn</div>
                                                                </>
                                                            )}

                                                            {item.status === 'S3' && (
                                                                <>
                                                                    <span onClick={() => verifyOrder(item)} className="actionOrder text-primary">
                                                                        Chốt đơn
                                                                    </span>
                                                                    <div className="actionOrder text-danger">Huỷ đơn</div>
                                                                </>
                                                            )}

                                                            {item.status === 'S4' && item.bill === '0' && (
                                                                <span onClick={() => sendBill(item)} className="actionOrder text-primary">
                                                                    Gửi hoá đơn
                                                                </span>
                                                            )}

                                                            {item.status === 'S4' && item.bill === '1' && (
                                                                <span className="actionOrder text-success" disabled>
                                                                    Đã gửi HĐ
                                                                </span>
                                                            )}

                                                            {item.status === 'S5' && <span className="actionOrder text-primary">Mua lại</span>}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                    ) : (
                                        <tr>
                                            <td colSpan="10" className="text-center">
                                                Chưa có đơn hàng nào...
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {filterOrder?.length > 0 && filteredList(filterOrder, search).length > orderPerPage && (
                            <ReactPaginate
                                previousLabel={'<'}
                                nextLabel={'>'}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={'paginationBttns'}
                                previousLinkClassName={'previousBttn'}
                                nextLinkClassName={'nextBttn'}
                                disabledClassName={'paginationDisabled'}
                                activeClassName={'paginationActive'}
                            />
                        )}
                    </TabPane>
                </TabContent>
            </LoadingOverlay>
        </div>
    );
};
export default OrderManage;
