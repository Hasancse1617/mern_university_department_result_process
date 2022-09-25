import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { resignAction } from "../../store/actions/ChairmanAction";
import {CHAIRMAN_LOGOUT} from '../../store/types/ChairmanType';
import {EXAM_LOGOUT} from '../../store/types/ExamType';
import {TEACHER_LOGOUT} from '../../store/types/TeacherType';

const Header = () =>{
    const dispatch = useDispatch();
    const { chairman } = useSelector((state)=>state.ChairmanReducer);
    const { exam } = useSelector((state)=>state.ExamReducer);
    const { teacher } = useSelector((state)=>state.TeacherReducer);
    const logout = async () =>{
        if(chairman){
            localStorage.removeItem('chairmanToken');
            dispatch({type: CHAIRMAN_LOGOUT});
        }
        else if(exam){
            localStorage.removeItem('examToken');
            dispatch({type: EXAM_LOGOUT});
        }
        else if(teacher){
            localStorage.removeItem('teacherToken');
            dispatch({type: TEACHER_LOGOUT});
        }
    }

    const resignChairman = () =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to resign from the post of department chairman!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, resign!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(resignAction(chairman._id));
                localStorage.removeItem('chairmanToken');
                dispatch({type: CHAIRMAN_LOGOUT});
            }
        })
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
                     <h1> Dept of {chairman? chairman.dept_id.short_name:exam? exam.dept_id.short_name:teacher?teacher.dept_id.short_name: ""}</h1>
                </div>
                {/* <!-- Right navbar links --> */}
                <ul class="navbar-nav ml-auto">
                
                {/* <!-- Messages Dropdown Menu --> */}
                <li class="nav-item dropdown">
                    <a class="nav-link" data-toggle="dropdown" href="#">
                    <i class="far fa-bell"></i>
                      {/* <span class="badge badge-danger navbar-badge">3</span> */}
                    </a>
                </li>
                {/* <!-- Notifications Dropdown Menu --> */}
                {chairman?<li class="nav-item">
                    <h6><b><a onClick={resignChairman} className="nav-link text-danger" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                      Resign
                    </a></b></h6>
                </li>:""}
                <li class="nav-item">
                    <h6><b><a onClick={logout} className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                      Logout
                    </a></b></h6>
                </li>
                </ul>
            </nav>
        </>
    );
}

export default Header;