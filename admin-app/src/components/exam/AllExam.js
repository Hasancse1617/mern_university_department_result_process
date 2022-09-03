import React, { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import $ from "jquery";
import Loader from "../loader/Loader";
import { REMOVE_EXAM_MESSAGE } from "../../store/types/ExamType";
import { deleteExam, fetchExams, statusAction } from "../../store/actions/ExamAction";


const AllExam = () => {
  const {message, loading, exams, exam_status,examId} = useSelector((state)=> state.ExamReducer);
  const {chairman} = useSelector((state)=>state.ChairmanReducer);
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(fetchExams(chairman.dept_id._id));
  },[message]);
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
        dispatch(deleteExam(id));
      }
    })
  }
  useEffect(()=>{
    if(message){
      toast.success(message, { duration: 3000 });
      dispatch({type: REMOVE_EXAM_MESSAGE});
    }
  },[message]);

  const examStatus = () =>{
    $(document).on('click', '.updateExamStatus', function(){
       const exam_id = $(this).attr('data-exam');
       const status = $(this).children("i").attr("status");
       dispatch(statusAction({exam_id,status}));
    })
  }
  useEffect(()=>{
    if(exam_status === false){
      $('#exam-'+examId).html(`<i class='fas fa-toggle-off' title="Activate Exam" style="font-size: 20px" aria-hidden='true' status=${exam_status}></i>`);
    }else{
      $('#exam-'+examId).html(`<i class='fas fa-toggle-on' title="Deactivate Exam" style="font-size: 20px" aria-hidden='true' status=${exam_status}></i>`);
    }
},[exam_status,examId]);

    return (
        <>
        <Helmet>
            <title>Exams | Result Processing</title>
            <meta name="description" content="Students | Result Processing" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 className="float-left">All Exam</h4>
                  </div>
                  
                  <div class="card-body">
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>SL.</th>
                        <th>Dept Name</th>
                        <th>Exam ID</th>
                        <th>Exam Chairman</th>
                        <th>Session</th>
                        <th>Semister</th>
                        <th>Approval Status</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                    {
                      !loading?
                      exams.length > 0 ?
                      exams.map((exam, index)=>(
                        <tr key={exam._id}>
                          <td>{ index+1}</td>
                          <td>{ exam.dept_id.short_name }</td>
                          <td>{ exam.exam_id }</td>
                          <td>{ exam.name }</td>
                          <td>{ exam.session }</td>
                          <td>{ exam.semister }</td>
                          <td>
                              {
                                (exam.status === true) ? 
                                <a class="updateExamStatus" data-exam={exam._id} id={`exam-${exam._id}`} onClick={examStatus} href="javascript:void(0)"> <i class="fas fa-toggle-on" title="Deactivate Exam" style={{fontSize: "20px"}} status={exam.status===true?'true':'false'} aria-hidden="true"></i></a>
                                :<a class="updateExamStatus" data-exam={exam._id} id={`exam-${exam._id}`} onClick={examStatus} href="javascript:void(0)"> <i class="fas fa-toggle-off" title="Activate Exam" style={{fontSize: "20px"}} status={exam.status===true?'true':'false'} aria-hidden="true"></i> </a> 
                              }
                          </td>
                          <td>
                            <button onClick={() => deleteStudent(exam._id)} title="Delete Exam" className="text-danger"><i className="fas fa-trash"></i></button>&nbsp;
                          </td>
                        </tr>
                        ))
                        :'No Exams found'
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

export default AllExam;