import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import React, { useState, useEffect } from 'react';
import MarkdownIt from 'markdown-it';
import _ from 'lodash';
const mdParser = new MarkdownIt();

const ModalEditArticle = (props) => {
    const {category, DetailCategory, handleChangeCategory, categoryId, productId, setProductId, setCategoryId} = props;
    
    //save data markdown
    const [id, setId] = useState('');
    const [descriptionHTML, setDescriptionHTML] = useState('');
    const [descriptionMarkdown, setDescriptionMarkdown] = useState('');
    const [specificationHTML, setSpecificationHTML] = useState('');
    const [specificationMarkdown, setSpecificationMarkdown] = useState('');
    
    //fetch product
    useEffect(() => {
        let article = props.currentArticle;
        if(article && !_.isEmpty(article)){
            setId(article.id);
            setProductId(article.productId);
            setCategoryId(article.categoryId);
            setDescriptionHTML(article.descriptionHTML);
            setDescriptionMarkdown(article.descriptionMarkdown);
            setSpecificationHTML(article.specificationHTML);
            setSpecificationMarkdown(article.specificationMarkdown);
        }
    }, [ props.currentArticle, setProductId, setCategoryId]);

    const toggle =()=>{
        props.toggleParent();
    }

    // edit info product
    const editInfoProduct=()=>{
        props.editInfoProduct({
            id: id,
            productId: productId,
            categoryId: categoryId,
            descriptionHTML: descriptionHTML,
            descriptionMarkdown: descriptionMarkdown,
            specificationHTML: specificationHTML,
            specificationMarkdown: specificationMarkdown,
        });
        toggle();
    }

    //onchange editor
    function editorDescription({html, text}){
        setDescriptionHTML(html);
        setDescriptionMarkdown(text);
    }

    function editorSpecification({html, text}){
        setSpecificationHTML(html);
        setSpecificationMarkdown(text);
    }
    
    return (
        <Modal isOpen={props.isOpen} toggle={()=>toggle()} size="lg">
            <ModalHeader toggle={()=>toggle()}>Cập nhật bài viết - chi tiết sản phẩm</ModalHeader>
            <ModalBody className='body-article'>
            
            <div className='d-flex col-12 p-0'>
                <label className='mr-3'>Chọn sản phẩm</label>
                <div className="form-group d-flex p-0">
                    <select className="form-control" style={{height:'30px'}}
                        value={categoryId}
                        onChange={(e)=>handleChangeCategory(e)}
                        disabled
                    >     
                        {
                            category?.length > 0 ?
                            category.map((item, index) => {
                                return (
                                    <option key={index} value={index +3}>{item.name}</option>
                                )
                            }) :
                            <option value="">Không có danh mục</option>
                        }                
                    </select>
                </div>

                {
                    category?.length > 0 ?
                    <div className='form-group d-flex col-3 p-0'>
                        <select className="form-control" style={{height:'30px'}}
                            value={productId}
                            onChange={(e)=>setProductId(e.target.value)}
                            disabled
                        >
                            {
                                DetailCategory?.length > 0 ?
                                DetailCategory.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    )
                                }) :
                                <option value="">Không có sản phẩm</option>
                            }                                     
                        </select>
                    </div> :
                    <span>Không có sản phẩm nào ! </span>
                }  
            </div>
            
            <div className="input-group p-0">
                <div className="form-group col-12 p-0">
                    <label>Thông số kỹ thuật</label>
                    <MdEditor style={{ height: '200px' }} renderHTML={text => mdParser.render(text)}
                        onChange={editorSpecification}
                        value={specificationMarkdown}
                    />
                </div>
            </div>

            <div className="input-group p-0">
                <div className="form-group col-12 p-0">
                    <label>Mô tả sản phẩm</label>
                    <MdEditor style={{ height: '200px' }} renderHTML={text => mdParser.render(text)}
                        onChange={editorDescription}
                        value={descriptionMarkdown}
                    />
                </div>
            </div>   
            </ModalBody>

            <ModalFooter>
                <Button color="primary" className="btn" onClick={() => {editInfoProduct()}}>Cập nhật</Button>
                <Button color="secondary" className="btn">Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}
export default ModalEditArticle;
