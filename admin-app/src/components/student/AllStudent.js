import React, { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom";
import Swal from 'sweetalert2'
import Loader from "../loader/Loader";
import { REMOVE_STUDENT_MESSAGE } from "../../store/types/StudentType";
import { deleteAction, fetchSessionStudent } from "../../store/actions/StudentAction";


const AllStudent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log("hhhh",searchParams.get("session"));
  const {message, loading, students} = useSelector((state)=> state.StudentReducer);
  const {chairman} = useSelector((state)=>state.ChairmanReducer);
  const dispatch = useDispatch();
  const [state,setState] = useState({
      session:""
  });
  const handleInput = (e) =>{
      setState({
          ...state,
          [e.target.name]: e.target.value
      });
      setSearchParams({session: e.target.value});
      dispatch(fetchSessionStudent(e.target.value, chairman.dept_id._id));
  }
  useEffect(()=>{
    setState({ session: searchParams.get("session") });
    dispatch(fetchSessionStudent(searchParams.get("session"), chairman.dept_id._id));
  },[]);
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
  useEffect(()=>{
    if(message){
      toast.success(message, { duration: 3000 });
      dispatch({type: REMOVE_STUDENT_MESSAGE});
    }
  },[message]);

    return (
        <>
        <Helmet>
            <title>Students | Result Processing</title>
            <meta name="description" content="Students | Result Processing" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 className="float-left">All Student</h4>
                    <h3><NavLink exact to="/chairman/add-student"><button type="button" class="btn btn-primary float-right text-bold">Add Student</button></NavLink></h3>
                  </div>
                  
                  <div class="card-body">
                    <form role="form" >
                        <div class="form-group row">
                            <div className="col-sm-3">
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
                    {
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

export default AllStudent;