import React, { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2'
import Loader from "../loader/Loader";
import { REMOVE_SUBJECT_MESSAGE } from "../../store/types/SubjectType";
import { deleteAction, fetchSubjects } from "../../store/actions/SubjectAction";

const AllSubject = () => {
  const {message, loading, subjects} = useSelector((state)=> state.SubjectReducer);
  const { exam } = useSelector((state)=>state.ExamReducer);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchSubjects(exam.dept_id._id));
  },[]);
  const deleteSubject = (id) =>{
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
      dispatch({type: REMOVE_SUBJECT_MESSAGE});
    }
  },[message]);

    return (
        <>
        <Helmet>
            <title>Subjects | Result Processing</title>
            <meta name="description" content="Subjects | Result Processing" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 className="float-left">All Subject</h4>
                    <h3><NavLink exact to="/exam/add-subject"><button type="button" class="btn btn-primary float-right text-bold">Add Subject</button></NavLink></h3>
                  </div>
                  
                  <div class="card-body">
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>SL.</th>
                        <th>Subject Name</th>
                        <th>Roll Number</th>
                        <th>Registration Number</th>
                        <th>Session</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                    {
                      !loading?
                      subjects.length > 0 ?
                      subjects.map((subject, index)=>(
                        <tr key={subject._id}>
                          <td>{ index+1}</td>
                          <td>{ subject.name }</td>
                          <td>{ subject.roll }</td>
                          <td>{ subject.reg }</td>
                          <td>{ subject.session }</td>
                          <td>
                            <NavLink exact to={`/chairman/edit-stduent/${subject._id}`} ><button className="text-success" ><i className="fas fa-edit"></i></button></NavLink>&nbsp;
                            <button onClick={() => deleteSubject(subject._id)} className="text-danger"><i className="fas fa-trash"></i></button>&nbsp;
                          </td>
                        </tr>
                        ))
                        :'No Subjects found'
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

export default AllSubject;