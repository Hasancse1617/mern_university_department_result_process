import React, { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom";
import Swal from 'sweetalert2';
import $ from "jquery";
import Loader from "../loader/Loader";
import { REMOVE_STUDENT_MESSAGE } from "../../store/types/StudentType";
import { deleteAction, fetchTeachers, statusAction } from "../../store/actions/StudentAction";


const AllTeacher = () => {
  const {message, loading, teachers, teacher_status,teacherId} = useSelector((state)=> state.StudentReducer);
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(fetchTeachers());
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

  const teacherStatus = () =>{
    $(document).on('click', '.updateTeacherStatus', function(){
       const teacher_id = $(this).attr('data-teacher');
       const status = $(this).children("i").attr("status");
       dispatch(statusAction({teacher_id,status}));
    })
  }
  useEffect(()=>{
    if(teacher_status === false){
      $('#teacher-'+teacherId).html(`<i class='fas fa-toggle-off' title="Activate Teacher" style="font-size: 20px" aria-hidden='true' status=${teacher_status}></i>`);
    }else{
      $('#teacher-'+teacherId).html(`<i class='fas fa-toggle-on' title="Deactivate Teacher" style="font-size: 20px" aria-hidden='true' status=${teacher_status}></i>`);
    }
},[teacher_status,teacherId]);

    return (
        <>
        <Helmet>
            <title>Teachers | Result Processing</title>
            <meta name="description" content="Students | Result Processing" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 className="float-left">All Teacher</h4>
                  </div>
                  
                  <div class="card-body">
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>SL.</th>
                        <th>Teacher Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                    {
                      !loading?
                      teachers.length > 0 ?
                      teachers.map((teacher, index)=>(
                        <tr key={teacher._id}>
                          <td>{ index+1}</td>
                          <td>{ teacher.name }</td>
                          <td>{ teacher.email }</td>
                          <td>
                              {
                                (teacher.status === true) ? 
                                <a class="updateTeacherStatus" data-teacher={teacher._id} id={`teacher-${teacher._id}`} onClick={teacherStatus} href="javascript:void(0)"> <i class="fas fa-toggle-on" title="Deactivate Teacher" style={{fontSize: "20px"}} status={teacher.status===true?'true':'false'} aria-hidden="true"></i></a>
                                :<a class="updateTeacherStatus" data-teacher={teacher._id} id={`teacher-${teacher._id}`} onClick={teacherStatus} href="javascript:void(0)"> <i class="fas fa-toggle-off" title="Activate Teacher" style={{fontSize: "20px"}} status={teacher.status===true?'true':'false'} aria-hidden="true"></i> </a> 
                              }
                          </td>
                          <td>
                            <button onClick={() => deleteStudent(teacher._id)} title="Delete Teacher" className="text-danger"><i className="fas fa-trash"></i></button>&nbsp;
                          </td>
                        </tr>
                        ))
                        :'No Teachers found'
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

export default AllTeacher;