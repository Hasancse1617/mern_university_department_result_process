import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchMarkSubjects } from "../../store/actions/MarkAction";

const Dashboard = () => {
    const dispatch = useDispatch();
    const {chairman} = useSelector((state)=>state.ChairmanReducer);
    const {exam} = useSelector((state)=>state.ExamReducer);
    const {teacher} = useSelector((state)=>state.TeacherReducer);

    useEffect(()=>{
        dispatch(fetchMarkSubjects(teacher.exam._id));
    },[]);
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
                                <h4>Semister: {exam? exam.semister: teacher? teacher.exam.semister: ""}</h4>
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
                
                {teacher?
                <div class="row">
                <div class="col-12">
                    <div class="card">
                    <div class="card-header">
                        <h4 className="float-left">Add students subject marks</h4>
                        <h3><NavLink exact to="/chairman/add-student"><button type="button" class="btn btn-primary float-right text-bold">Add Student</button></NavLink></h3>
                    </div>
                    
                    <div class="card-body">
                        <form role="form" >
                            <div class="form-group row">
                                <div className="col-sm-3">
                                <select  class="form-control" name="session" >
                                    <option value="">Select Subject</option>
                                    <option value="2016-17">2016-17</option>
                                </select>
                                </div> 
                                <div className="col-sm-3">
                                <select  class="form-control" name="session" >
                                    <option value="">Select Examinar Type</option>
                                    <option value="2016-17">First Examinar</option>
                                    <option value="2016-17">Second Examinar</option>
                                    <option value="2016-17">Third Examinar</option>
                                </select>
                                </div> 
                            </div>
                        </form>
                        <table id="example2" class="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th>SL.</th>
                            <th>Student Name</th>
                            <th>Roll Number</th>
                            <th>Registration Number</th>
                            <th>Session</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* {
                        !loading?
                        students.length > 0 ?
                        students.map((student, index)=>(
                            <tr key={student._id}>
                            <td>{ index+1}</td>
                            <td>{ student.name }</td>
                            <td>{ student.roll }</td>
                            <td>{ student.reg }</td>
                            <td>{ student.session }</td>
                            <td>
                                <NavLink exact to={`/chairman/edit-stduent/${student._id}`} ><button className="text-success" ><i className="fas fa-edit"></i></button></NavLink>&nbsp;
                                <button onClick={() => deleteStudent(student._id)} className="text-danger"><i className="fas fa-trash"></i></button>&nbsp;
                            </td>
                            </tr>
                            ))
                            :'No Students found'
                        :(<Loader/>)
                        } */}
                        </tbody>
                        </table>
                        
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