import { numberFormat } from 'components/Formatting/FormatNumber';
import { DetailCategory, fetchAllCategory } from 'store/actions';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { TabContent, TabPane } from 'reactstrap';
import TabCategory from './TabCategory';
import './style/style.scss';
import Rate from '../Rate';
import { useHistory } from 'react-router';

const ProductSuggestion = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [productShow, setProductShow] = useState([]);
    const [btnLoadMore, setLoadMore] = useState(false);
    const [resetButton, setResetButton] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const category = useSelector((state) => state.admin.categories);
    const Products = useSelector((state) => state.admin.detailCategory);
    // Detect screen size on page load
    const numberLoadMore = useSelector((state) => state.user.numberLoad);

    const history = useHistory();
    const viewDetail = (product) => {
        return history.push(`/products/${product.id}`);
    };

    useEffect(() => {
        dispatch(fetchAllCategory());
        dispatch(DetailCategory(1));
    }, [dispatch]);

    //detail category
    const detailCategory = (id) => {
        setActiveTab(id);
        dispatch(DetailCategory(id));
    };

    // Initial product
    useEffect(() => {
        initialProduct();
    }, [Products]);

    const initialProduct = () => {
        setProductShow(Products.slice(0, numberLoadMore));
        setLoadMore(false);
        setResetButton(false);
    };

    // Load more product
    const loadMore = () => {
        const visibleProduct = productShow.length;
        const totalProduct = Products.length;
        setLoading(true);

        setTimeout(() => {
            const loadProduct = [...productShow, ...Products.slice(visibleProduct, visibleProduct + numberLoadMore)];
            setProductShow(loadProduct);
            setLoading(false);

            // Check if there is no more product
            const allProduct = loadProduct.length === totalProduct;
            setLoadMore(allProduct);
            setResetButton(allProduct);
        }, 1000);
    };

    // Reload initial product
    const resetList = () => {
        initialProduct();
    };

    return (
        <div className="suggest__list mt-4">
            <div className="tabSuggest">
                <div className="Prod__Suggest">
                    {' '}
                    <h5 className="m-0">Gợi Ý Hôm Nay</h5>{' '}
                </div>
                <TabCategory activeTab={activeTab} category={category} detailCategory={detailCategory} />
            </div>

            <TabContent activeTab={activeTab} className="bg-white">
                {category?.length > 0 ? (
                    category.map((item, index) => {
                        return (
                            <TabPane tabId={item.id} key={index}>
                                <div className="row list px-3 ">
                                    {Products?.length > 0 ? (
                                        productShow.map((item, index) => {
                                            return (
                                                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2  list__prod mb-3" onClick={() => viewDetail(item)} key={index}>
                                                    {/* <img src={item.image} className="w-75" alt="" /> */}
                                                    <div className="home-product-item__img" style={{ backgroundImage: `url(${item.image})` }}></div>
                                                    <p className="text-secondary mt-3 mb-1">{item.name}</p>
                                                    <Rate />

                                                    <div className="price">
                                                        <span className="price_prod">{numberFormat(item.sale)}</span>
                                                        <span className="badge badge-danger">-6%</span>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <span className="text-success"> Đang cập nhật sản phẩm... </span>
                                    )}
                                </div>
                                {!btnLoadMore && item.id === activeTab && (
                                    <div className="view__more" onClick={loadMore}>
                                        <button type="button" className="btn btn-outline-primary border border-primary">
                                            {loading ? (
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    <span className="ml-3">Đang tải...</span>
                                                </div>
                                            ) : (
                                                <span>Xem thêm</span>
                                            )}
                                        </button>
                                    </div>
                                )}

                                {resetButton && (
                                    <div className="reset">
                                        <button onClick={resetList} type="button" className="btn btn-outline-primary border border-primary">
                                            Tải lại
                                        </button>
                                    </div>
                                )}
                            </TabPane>
                        );
                    })
                ) : (
                    <span> Loading... </span>
                )}
            </TabContent>
        </div>
    );
};
export default ProductSuggestion;
