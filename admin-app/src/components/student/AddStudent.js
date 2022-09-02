import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from 'sweetalert2'
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { createAction, deleteAction, fetchRecentStudent } from "../../store/actions/StudentAction";
import { REMOVE_STUDENT_ERRORS, REMOVE_STUDENT_MESSAGE } from "../../store/types/StudentType";
import Loader from "../loader/Loader";

const AddStudent = () => {
    const dispatch = useDispatch();
    const {chairman} = useSelector((state)=>state.ChairmanReducer);
    const { studentErrors, message, recentStudents, loading } = useSelector((state)=> state.StudentReducer);
    const [state,setState] = useState({
        name:"",
        roll:"",
        reg:"",
        session:""
    });
    const handleInput = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }
    const deleteStudent = (id) =>{
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteAction(id));
        }
      })
  }
    const createStudent = (e) =>{
        e.preventDefault();
        const {name,roll,reg,session} = state;
        const formData = new FormData();
        formData.append('dept_id',chairman.dept_id._id);
        formData.append('name',name);
        formData.append('roll',roll);
        formData.append('reg', reg);
        formData.append('session', session);
        dispatch(createAction(formData));
    }
    useEffect(()=>{
        dispatch(fetchRecentStudent());
    },[message]);
    useEffect(()=>{
        if(message){
            toast.success(message, { duration: 3000 });
            dispatch({type: REMOVE_STUDENT_MESSAGE});
            setState({name:"", roll:"", reg:"", session:""});
        }
        if(studentErrors && studentErrors.length > 0){
            studentErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_STUDENT_ERRORS});
        }
    },[message]);

    return (
        <>
        <Helmet>
            <title>Create student - result processing</title>
            <meta name="description" content="Student add Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={true}/>
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Add Student</h4>
                    <h3><NavLink to="/chairman/all-student" className="btn btn-sm btn-success float-right text-bold">All Student</NavLink></h3>
                </div>
                <form role="form" onSubmit={createStudent}>
                    <div class="card-body">
                    <div class="form-group row">
                        <label for="exampleInputName" className="col-sm-2  col-form-label">Student Name</label>
                        <div className="col-sm-8">
                           <input type="text" name="name" value={state.name} onChange={handleInput} class="form-control" id="exampleInputName" placeholder="Enter Student Name"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Student Roll</label>
                        <div className="col-sm-8">
                           <input type="text" name="roll" value={state.roll} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Enter Student Roll"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Student Reg</label>
                        <div className="col-sm-8">
                           <input type="text" name="reg" value={state.reg} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Enter Student Reg"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">Session</label>
                        <div className="col-sm-8">
                          <select value={state.session} class="form-control" name="session" onChange={handleInput}>
                              <option value="">Select Session</option>
                              <option value="2016-17">2016-17</option>
                              <option value="2017-18">2017-18</option>
                              <option value="2018-19">2018-19</option>
                              <option value="2019-20">2019-20</option>
                              <option value="2020-21">2020-21</option>
                          </select>
                        </div> 
                    </div>
                    <div class="form-group col-6 offset-sm-2">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                    </div>
                </form>
                </div>
                </div>
            </div>
            </div>
        </section>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 className="float-left">Recently added Student</h4>
                  </div>
                  <div class="card-body">
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
                     {
                      !loading?
                      recentStudents.length > 0 ?
                      recentStudents.map((student, index)=>(
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
                        :'No resent students found'
                      :(<Loader/>)
                      } 
                      </tbody>
                    </table>
                    
                  </div>
                </div>
                </div>
              </div>
            </div>
        </section>
        </>
    );
}

export default AddStudent;