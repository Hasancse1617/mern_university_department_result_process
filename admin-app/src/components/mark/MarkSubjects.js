import React, { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import Loader from "../loader/Loader";
import { REMOVE_SUBJECT_MESSAGE } from "../../store/types/SubjectType";
import { deleteAction, fetchSubjects } from "../../store/actions/SubjectAction";

const MarkSubjects = () => {
  // const { id } = useParams();
  const {message, loading, subjects} = useSelector((state)=> state.SubjectReducer);
  const { exam } = useSelector((state)=>state.ExamReducer);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchSubjects(exam._id));
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
    dispatch(fetchSubjects(exam._id));
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
                    <h4 className="float-left">Subject List</h4>
                   
                  </div>
                  
                  <div class="card-body">
                  <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>SL.</th>
                        <th>Subject Code</th>
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
                          <td>{ subject.subject_code }</td>
                          <td>
                              <h3><NavLink to={`/exam/add-mark/${subject._id}`}><button type="button" class="btn btn-primary text-bold">Add Mark</button></NavLink></h3>
                          </td>
                        </tr>
                        ))
                        :'No subjects found'
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

export default MarkSubjects;