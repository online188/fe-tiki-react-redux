import image from '../../../../assets/images/taoanhdep_dicungtiki.jpg';
import { NavLink } from 'react-router-dom';
import { MenuAdmin } from './DataMenu';
import React from 'react';
import './MenuLeft.scss';

const MenuLeft = (props) => {
    const { widthMenuLeft } = props;
    const iconSideNav = 'https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg';
    return (
        <div className={`menu-horizon ${widthMenuLeft}`}>
            {/* <div className="logoAdmin"><img src={image} alt="" /></div> */}
            <div className="logoAdmin" style={{ backgroundImage: `url(${image})` }}></div>

            <div className="sideNav">
                <img src={iconSideNav} className="sidebar-bg" alt="" />
                <div className="menu-horizon-header">
                    <div className="dashboard my-4">
                        {MenuAdmin?.length > 0 &&
                            MenuAdmin.map((item, index) => {
                                return (
                                    <NavLink to={`${item.path}`} key={index} className="menu-left" activeClassName="active">
                                        <div className="itemModule">
                                            <i className={`${item.icon}`}></i>
                                            <span>{item.name}</span>
                                        </div>
                                        {item.subMenu?.length > 0 && (
                                            <span>
                                                <i className="fas fa-angle-right small"></i>
                                            </span>
                                        )}
                                    </NavLink>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MenuLeft;
