import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { fetchAllCategory, fetchSupplierProduct } from '../../../store/actions';

const ModalProduct = (props) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [previewImg, setPreviewImg] = useState('');
    const [price, setPrice] = useState('');
    const [sale, setSale] = useState('');
    const [qty, setQty] = useState(30);
    const [category_id, setCategory_id] = useState('');
    const [supplier_id, setSupplier_id] = useState('');

    //fetch data
    const dispatch = useDispatch();
    const listCategory = useSelector((state) => state.admin.categories);
    const listSupplier = useSelector((state) => state.admin.supplier);

    useEffect(() => {
        dispatch(fetchAllCategory());
        dispatch(fetchSupplierProduct());
    }, [dispatch]);

    //reset form
    useEffect(() => {
        setName('');
        setImage('');
        setPreviewImg('');
        setPrice('');
        setSale('');
        setQty(0);
        setCategory_id('');
        setSupplier_id('');
    }, []);

    const toggle = () => {
        props.toggleParent();
    };

    // add new product
    const handleAddNewProduct = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            image: image,
            previewImg: previewImg,
            price: price,
            sale: sale,
            qty: qty,
            category_id: category_id,
            supplier_id: supplier_id,
        };
        props.createProduct(data);
        toggle();
    };

    //upload file
    const changeImage = async (e) => {
        let file = e.target.files[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            setPreviewImg(objectUrl);
            setImage(file);
        }
    };

    //remove image
    const removeImg = () => {
        setPreviewImg('');
        setImage('');
    };

    return (
        <Modal isOpen={props.isOpen} toggle={() => toggle()} size="lg">
            <form onSubmit={handleAddNewProduct} encType="multipart/form-data">
                <ModalHeader toggle={() => toggle()}>Thêm sản phẩm</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label>Tên </label>
                            <input type="input" className="form-control" onChange={(e) => setName(e.target.value)} value={name} />
                        </div>

                        <div className="form-group col-md-3">
                            <label>Ảnh</label>
                            <input id="previewImg" type="file" hidden onChange={(e) => changeImage(e)} name="image" />
                            <label htmlFor="previewImg" className="btn btn-success w-100">
                                <i className="fas fa-upload"></i> Tải ảnh
                            </label>
                        </div>

                        <div
                            className="preview-image col-md-2 border"
                            style={{ backgroundImage: `url(${previewImg})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                        >
                            {previewImg ? (
                                <div onClick={() => removeImg()} className="col-md-12" style={{ textAlign: 'end', position: 'absolute', right: '-1.5rem', top: '-1rem' }}>
                                    <i className="far fa-times-circle text-danger"></i>
                                </div>
                            ) : (
                                <img src="https://dci.edu.vn/wp-content/themes/consultix/images/no-image-found-360x250.png" className="w-100" alt="..." />
                            )}
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-6">
                            <label>Giá</label>
                            <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" className="form-control" />
                        </div>

                        <div className="form-group col-6">
                            <label>Sale</label>
                            <input value={sale} onChange={(e) => setSale(e.target.value)} type="text" className="form-control" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-4">
                            <label>Số lượng</label>
                            <input value={qty} onChange={(e) => setQty(e.target.value)} type="text" className="form-control" />
                        </div>

                        <div className="form-group col-md-4">
                            <label>Danh mục</label>
                            <select className="form-control" onChange={(e) => setCategory_id(e.target.value)} defaultValue={category_id}>
                                {listCategory?.length > 0 ? (
                                    listCategory.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>
                                                {item.name}
                                            </option>
                                        );
                                    })
                                ) : (
                                    <option>Không có dữ liệu</option>
                                )}
                            </select>
                        </div>

                        <div className="form-group col-md-4">
                            <label>Xuất xứ</label>
                            <select className="form-control" onChange={(e) => setSupplier_id(e.target.value)} defaultValue={supplier_id}>
                                {listSupplier?.length > 0 ? (
                                    listSupplier.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {item.valueVi}
                                            </option>
                                        );
                                    })
                                ) : (
                                    <option>Không có dữ liệu</option>
                                )}
                            </select>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" className="btn" type="submit">
                        Thêm sản phẩm
                    </Button>
                    <Button color="secondary" className="btn">
                        Huỷ
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
};
export default ModalProduct;
