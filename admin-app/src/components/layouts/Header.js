import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import {CHAIRMAN_LOGOUT} from '../../store/types/ChairmanType';
import {EXAM_LOGOUT} from '../../store/types/ExamType';

const Header = () =>{
    const dispatch = useDispatch();
    const {chairman} = useSelector((state)=>state.ChairmanReducer);
    const {exam} = useSelector((state)=>state.ExamReducer);
    const logout = async () =>{
        if(chairman){
            localStorage.removeItem('chairmanToken');
            dispatch({type: CHAIRMAN_LOGOUT});
        }
        else if(exam){
            localStorage.removeItem('examToken');
            dispatch({type: EXAM_LOGOUT});
        }
    }
    return(
        <>
            <nav class="main-header navbar navbar-expand navbar-white navbar-light">
                {/* <!-- Left navbar links --> */}
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                    </li>
                </ul>
                <div className="dept_name">
                     <h1> Dept of {chairman? chairman.dept_id.short_name:exam? exam.dept_id.short_name: ""}</h1>
                </div>
                {/* <!-- Right navbar links --> */}
                <ul class="navbar-nav ml-auto">
                
                {/* <!-- Messages Dropdown Menu --> */}
                <li class="nav-item dropdown">
                    <a class="nav-link" data-toggle="dropdown" href="#">
                    <i class="far fa-comments"></i>
                    <span class="badge badge-danger navbar-badge">3</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <a href="#" class="dropdown-item">
                        {/* <!-- Message Start --> */}
                        <div class="media">
                        <img src="../../dist/img/user1-128x128.jpg" alt="User Avatar" class="img-size-50 mr-3 img-circle"/>
                        <div class="media-body">
                            <h3 class="dropdown-item-title">
                            Brad Diesel
                            <span class="float-right text-sm text-danger"><i class="fas fa-star"></i></span>
                            </h3>
                            <p class="text-sm">Call me whenever you can...</p>
                            <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                        </div>
                        </div>
                        {/* <!-- Message End --> */}
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item">
                        {/* <!-- Message Start --> */}
                        <div class="media">
                        <img src="../../dist/img/user8-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3"/>
                        <div class="media-body">
                            <h3 class="dropdown-item-title">
                            John Pierce
                            <span class="float-right text-sm text-muted"><i class="fas fa-star"></i></span>
                            </h3>
                            <p class="text-sm">I got your message bro</p>
                            <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                        </div>
                        </div>
                        {/* <!-- Message End --> */}
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item">
                        {/* <!-- Message Start --> */}
                        <div class="media">
                        <img src="/assets/images/front_images/user3-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3"/>
                        <div class="media-body">
                            <h3 class="dropdown-item-title">
                            Nora Silvester
                            <span class="float-right text-sm text-warning"><i class="fas fa-star"></i></span>
                            </h3>
                            <p class="text-sm">The subject goes here</p>
                            <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                        </div>
                        </div>
                        {/* <!-- Message End --> */}
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item dropdown-footer">See All Messages</a>
                    </div>
                </li>
                {/* <!-- Notifications Dropdown Menu --> */}
                <li class="nav-item">
                <a onClick={logout} class="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                    Logout
                    </a>
                </li>

                </ul>
            </nav>
        </>
    );
}

export default Header;