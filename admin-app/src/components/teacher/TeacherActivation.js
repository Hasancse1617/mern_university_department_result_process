import React from "react";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { verifyAccount } from "../../store/actions/TeacherAction";
import toast, {Toaster} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { REMOVE_TEACHER_ERRORS, REMOVE_TEACHER_MESSAGE } from "../../store/types/TeacherType";

const TeacherActivation = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { teacherErrors, message } = useSelector((state)=>state.TeacherReducer);
    const { token } = useParams();
    const activeAccount = (e) =>{
        e.preventDefault();
        dispatch(verifyAccount(token));
    }
    useEffect(()=>{
        if(message){
          toast.success(message, { duration: 5000 });
          dispatch({type: REMOVE_TEACHER_MESSAGE});
          navigate(`/teacher/login`);
        }
        if(teacherErrors.length > 0){
            teacherErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_TEACHER_ERRORS});
        }
    },[teacherErrors,message]);
    return(
        <>
        <Toaster position="top-right" reverseOrder={true}/>
        <div className="login-box">
            <Helmet>
                <title>Teacher Activation - Result Processing system</title>
                <meta name="description" content="User Login Here" />
            </Helmet>
            <br></br>
            <br></br>
            <br></br>
            <div class="login-logo">
                <a href="../../index2.html"><b>Teacher Panel</b></a>
            </div>
            <div class="card">
                <div class="card-body login-card-body">
                {/* <p class="login-box-msg"><h5>Sign In</h5></p> */}
                <br></br>
                <form onSubmit={activeAccount}>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary btn-block">Active Your Account</button>
                    </div>           
                </form>
                <br></br>
                </div>
                {/* <!-- /.login-card-body --> */}
            </div>
        </div>
        </>
    )
}

export default TeacherActivation;