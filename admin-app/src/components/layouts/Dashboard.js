import React from "react";
import { Helmet } from "react-helmet";
import {useSelector} from "react-redux";

const Dashboard = () => {
    const {chairman} = useSelector((state)=>state.ChairmanReducer);
    const {exam} = useSelector((state)=>state.ExamReducer);
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
                {exam? <div class="row">
                    <div class="col-lg-4 col-6">
                        <div class="small-box small-box-2 bg-info">
                            <div class="inner inner-2 text-center">
                                <h4>Exam ID: {exam.exam_id}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-6">
                        <div class="small-box small-box-2  bg-success">
                            <div class="inner inner-2 text-center">
                                <h4>Session: {exam.session}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-6">
                        <div class="small-box small-box-2 bg-warning">
                            <div class="inner inner-2 text-center">
                                <h4>Semister: {exam.semister}</h4>
                            </div>                      
                        </div>
                    </div>
                </div>:""}
                {chairman?
                <div class="row">
                    <div class="col-lg-3 col-6">
                        <div class="small-box bg-info">
                        <div class="inner">
                            <h3>150</h3>

                            <p>New Orders</p>
                        </div>
                        <div class="icon">
                            <i class="ion ion-bag"></i>
                        </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-6">
                        <div class="small-box bg-success">
                        <div class="inner">
                            <h3>53<sup style={{fontSize: 20+"px"}}>%</sup></h3>

                            <p>Bounce Rate</p>
                        </div>
                        <div class="icon">
                            <i class="ion ion-stats-bars"></i>
                        </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-6">
                        <div class="small-box bg-warning">
                        <div class="inner">
                            <h3>44</h3>

                            <p>User Registrations</p>
                        </div>
                        <div class="icon">
                            <i class="ion ion-person-add"></i>
                        </div>
                        
                        </div>
                    </div>
                    <div class="col-lg-3 col-6">
                        <div class="small-box bg-danger">
                        <div class="inner">
                            <h3>65</h3>

                            <p>Unique Visitors</p>
                        </div>
                        <div class="icon">
                            <i class="ion ion-pie-graph"></i>
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