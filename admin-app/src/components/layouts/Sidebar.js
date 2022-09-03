import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
const Sidebar = () => {
    let { pathname } = useLocation();
    const {chairman} = useSelector((state)=>state.ChairmanReducer);
    const {exam} = useSelector((state)=>state.ExamReducer);
    return (
        <>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* <!-- Brand Logo --> */}
                <NavLink to={chairman?`/chairman/dashboard`:exam?"/exam/dashboard":""} className="brand-link text-center">
                    <img src="http://localhost:5000/images/logo2.png" width="20%"/><br/>
                    <span className="brand-text font-weight-light">{chairman?"Dept. Chairman":exam?"Exam Chairman":""}</span>
                </NavLink>

                {/* <!-- Sidebar --> */}
                <div className="sidebar">
                {/* <!-- Sidebar user (optional) --> */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image user-image">
                        <i className="fas fa-user"></i>
                    </div>
                    <div class="info">
                         <a href="#" className="d-block">{chairman? chairman.name :exam? exam.name :""}</a>
                    </div>
                </div>

                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    {/* <!-- Add icons to the links using the .nav-icon class */}
                        {/* with font-awesome or any other icon font library --> */}
                        <li className="nav-item has-treeview">
                            <NavLink to={chairman?`/chairman/dashboard`:exam?"/exam/dashboard":""} className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Dashboard
                                </p>
                            </NavLink>
                        </li>
                        {chairman?
                        <><li className="nav-item has-treeview menu-open">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-copy"></i>
                                <p>
                                    Exams
                                    <i className="fas fa-angle-left right"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <NavLink exact to="/chairman/all-exam" className={pathname==='/admin/user/create'?'active nav-link':'nav-link'}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>All Exams</p>
                                    </NavLink>
                                </li>                       
                            </ul>
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
                                    <NavLink exact to="/chairman/all-teacher" className={pathname==='/admin/user/create'?'active nav-link':'nav-link'}>
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
                                    <NavLink exact to="/chairman/add-student" className={ pathname==='/admin/banner/create' || pathname.includes('/admin/banner/edit/') ?'nav-link active':'nav-link'}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Add Student</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact to="/chairman/all-student?session="  className={ pathname==='/admin/banner/create' || pathname.includes('/admin/banner/edit/') ?'nav-link active':'nav-link'}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>All Student</p>
                                    </NavLink>
                                </li>                                                      
                            </ul>
                        </li></>:""}
                        {exam?<>

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
                                    <NavLink to="/exam/students" className={pathname==='/admin/user/create'?'active nav-link':'nav-link'}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Exam Students</p>
                                    </NavLink>
                                </li>                       
                            </ul>
                        </li>
                        <li className="nav-item has-treeview menu-open">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-copy"></i>
                                <p>
                                    Subjects
                                    <i className="fas fa-angle-left right"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <NavLink to="/exam/exam-student" className={pathname==='/admin/user/create'?'active nav-link':'nav-link'}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Add Subject</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/exam/exam-student" className={pathname==='/admin/user/create'?'active nav-link':'nav-link'}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>All Subject</p>
                                    </NavLink>
                                </li>                       
                            </ul>
                        </li>
                        <li className="nav-item has-treeview menu-open">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-copy"></i>
                                <p>
                                    Subjects Mark
                                    <i className="fas fa-angle-left right"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <NavLink to="/exam/exam-student" className={pathname==='/admin/user/create'?'active nav-link':'nav-link'}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Add Mark</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/exam/exam-student" className={pathname==='/admin/user/create'?'active nav-link':'nav-link'}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>All Subject</p>
                                    </NavLink>
                                </li>                       
                            </ul>
                        </li>
                         
                        </> :""}
                    </ul>
                </nav>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;