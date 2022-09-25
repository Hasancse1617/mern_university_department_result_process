import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashInfo } from "../../store/actions/ChairmanAction";

const Dashboard = () => {
    const dispatch = useDispatch();
    const {chairman, dashInfo} = useSelector((state)=>state.ChairmanReducer);
    const {exam} = useSelector((state)=>state.ExamReducer);
    const {teacher} = useSelector((state)=>state.TeacherReducer);
    useEffect(()=>{
        if(chairman){
            dispatch(fetchDashInfo(chairman.dept_id._id));
        }
    },[])
    return (
        <>
            <Helmet>
                <title> {chairman?"Chairman":exam?"Exam":""} Dashboard - Result Processing</title>
                <meta name="description" content="User Login Here" />
            </Helmet>
            <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-12 text-center">
                        {/* <h1 class="m-0 text-dark">Dept of {chairman.dept_id.dept_name}</h1> */}
                    </div>
                </div>
            </div>
            </div>
            
            <section class="content">
            <div class="container-fluid">
                {exam || teacher? 
                <div class="row">
                    <div class="col-lg-4 col-6">
                        <div class="small-box small-box-2 bg-info">
                            <div class="inner inner-2 text-center">
                                <h4>Exam ID: {exam? exam.exam_id: teacher? teacher.exam.exam_id:""}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-6">
                        <div class="small-box small-box-2  bg-success">
                            <div class="inner inner-2 text-center">
                                <h4>Session: {exam? exam.session: teacher? teacher.exam.session: ""}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-6">
                        <div class="small-box small-box-2 bg-warning">
                            <div class="inner inner-2 text-center">
                                <h4>Semister: {exam? exam.semister: teacher? teacher.exam.semister: ""}th</h4>
                            </div>                      
                        </div>
                    </div>
                </div>:""}
                {chairman?
                <div class="row">
                    <div class="col-lg-4 col-6">
                        <div class="small-box bg-info">
                        <div class="inner text-center">
                            <h3>{ dashInfo.total_teacher < 9 ?"0"+dashInfo.total_teacher: dashInfo.total_teacher }</h3>

                            <p>Total Teacher</p>
                        </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-6">
                        <div class="small-box bg-success">
                        <div class="inner text-center">
                            <h3>{ dashInfo.total_exam < 9 ?"0"+dashInfo.total_exam: dashInfo.total_exam }</h3>

                            <p>Total Exam</p>
                        </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-6">
                        <div class="small-box bg-danger">
                        <div class="inner text-center">
                            <h3>{ dashInfo.total_student < 9 ?"0"+dashInfo.total_student: dashInfo.total_student }</h3>

                            <p>Total Student</p>
                        </div>
                        </div>
                    </div>
                </div>:""}
            </div>
            </section>
            {/* <!-- /.content --> */}
        </>
    );
}

export default Dashboard;