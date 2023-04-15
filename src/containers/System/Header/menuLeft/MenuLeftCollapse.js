import { NavLink } from 'react-router-dom';
import {MenuAdmin} from './DataMenu';
import React from 'react';
import './MenuLeft.scss';

function MenuLeftCollapse(props) {
    return (
        <div className="dashboard bg-dark menuLeftCollapse">
            <div className='logoCollapse'>TIKI</div>
            {
                MenuAdmin?.length > 0 &&
                MenuAdmin.map((item, index) => {
                    return(
                        <NavLink to={item.path} activeClassName="active" className ="menu-left" exact key={index}>
                            <i className={item.icon}></i>
                        </NavLink>
                    )
                })
            }
        </div>
    );
}
export default MenuLeftCollapse;