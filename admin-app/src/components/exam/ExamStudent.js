import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
import { REMOVE_EXAM_MESSAGE } from "../../store/types/ExamType";
import { fetchExamStudents } from "../../store/actions/ExamAction";


const ExamStudent = () => {
  const {message, loading, examStudents, exam} = useSelector((state)=> state.ExamReducer);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchExamStudents(exam.session));
  },[]);

  useEffect(()=>{
    if(message){
      toast.success(message, { duration: 3000 });
      dispatch({type: REMOVE_EXAM_MESSAGE});
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
                      </tr>
                      </thead>
                      <tbody>
                    {
                      !loading?
                      examStudents.length > 0 ?
                      examStudents.map((student, index)=>(
                        <tr key={student._id}>
                          <td>{ index+1}</td>
                          <td>{ student.name }</td>
                          <td>{ student.roll }</td>
                          <td>{ student.reg }</td>
                          <td>{ student.session }</td>
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

export default ExamStudent;