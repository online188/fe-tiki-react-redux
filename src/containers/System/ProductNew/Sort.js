import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../../../store/actions';

const Sort = (props) => {
    const { pageNumber, productPerPage, search, setSearch } = props;

    const dispatch = useDispatch();

    // Search
    const handleSearch = () => {
        try {
            if (search !== '') {
                dispatch(actions.fetchPaginationProducts(pageNumber, productPerPage, search));
            } else {
                return;
            }
        } catch (e) {
            console.log('error:', e);
        }
    };
    // press enter search
    const enterSearch = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            handleSearch();
        }
    };
    return (
        <div className="d-flex col-md-9 p-0 mb-3">
            <div className="input-group col-5 p-0">
                <label className="p-0">Tìm kiếm</label>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    // onFocus={() => setSuggest(true)}
                    onKeyDown={enterSearch}
                    type="text"
                    className="form-control ml-2"
                    placeholder="Search..."
                    style={{ height: '30px' }}
                />
            </div>
        </div>
    );
};
export default Sort;
