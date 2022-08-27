import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
const Sidebar = () => {
    let { pathname } = useLocation();
    const {chairman} = useSelector((state)=>state.ChairmanReducer);
    return (
        <>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* <!-- Brand Logo --> */}
                <NavLink to="/admin/dashboard" className="brand-link">
                    <img src="/assets/images/admin_images/AdminLTELogo.png"
                        alt="AdminLTE Logo"
                        className="brand-image img-circle elevation-3"
                        style={{opacity: .8 }} />
                    <span className="brand-text font-weight-light">Admin Panel</span>
                </NavLink>

                {/* <!-- Sidebar --> */}
                <div className="sidebar">
                {/* <!-- Sidebar user (optional) --> */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                    <img src={`${process.env.REACT_APP_API_PATH}/images/chairman_images/avatar5.png`} className="img-circle elevation-2" alt="User Image"/>
                    </div>
                    <div class="info">
                    <a href="#" className="d-block">{chairman.name}</a>
                    </div>
                </div>

                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    {/* <!-- Add icons to the links using the .nav-icon class */}
                        {/* with font-awesome or any other icon font library --> */}
                    <li className="nav-item has-treeview">
                        <NavLink exact to={chairman?`/chairman/dashboard`:""} activeClassName="active" className="nav-link">
                        <i className="nav-icon fas fa-tachometer-alt"></i>
                        <p>
                            Dashboard
                        </p>
                        </NavLink>
                    </li>
                    <li className="nav-item has-treeview menu-open">
                        <a href="#" className="nav-link">
                        <i className="nav-icon fas fa-copy"></i>
                        <p>
                            Teachers
                            <i className="fas fa-angle-left right"></i>
                        </p>
                        </a>
                        <ul className="nav nav-treeview">
                            <li className="nav-item">
                                <NavLink exact to="/admin/user/all?page=1" activeClassName="active" className={pathname==='/admin/user/create'?'active nav-link':'nav-link'}>
                                <i className="far fa-circle nav-icon"></i>
                                <p>All Teacher</p>
                                </NavLink>
                            </li>                       
                        </ul>
                    </li>
                    <li className="nav-item has-treeview menu-open">
                        <a href="#" className="nav-link">
                        <i className="nav-icon fas fa-copy"></i>
                        <p>
                            Students
                            <i className="fas fa-angle-left right"></i>
                        </p>
                        </a>
                        <ul className="nav nav-treeview">
                        <li className="nav-item">
                            <NavLink exact to="/admin/banner/all?page=1" activeClassName="active" className={ pathname==='/admin/banner/create' || pathname.includes('/admin/banner/edit/') ?'nav-link active':'nav-link'}>
                            <i className="far fa-circle nav-icon"></i>
                            <p>All Student</p>
                            </NavLink>
                        </li>                                                     
                        </ul>
                    </li>
                    </ul>
                </nav>
                {/* <!-- /.sidebar-menu --> */}
                </div>
                {/* <!-- /.sidebar --> */}
            </aside>
        </>
    );
}

export default Sidebar;