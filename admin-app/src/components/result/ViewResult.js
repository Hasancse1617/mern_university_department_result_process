import React, { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Loader from "../loader/Loader";
import { fetchExamSubjects } from "../../store/actions/ResultAction";

const ViewResult = () => {
  const {message, loading, resultSubjects} = useSelector((state)=> state.ResultReducer);
  const { exam } = useSelector((state)=>state.ExamReducer);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchExamSubjects(exam._id));
  },[]);
  
    return (
        <>
        <Helmet>
            <title>Exam Results | Result Processing</title>
            <meta name="description" content="Subjects | Result Processing" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 className="float-left">Exam Result</h4>
                   
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
                      resultSubjects && resultSubjects.length > 0 ?
                      resultSubjects.map((subject, index)=>(
                          <tr key={subject._id}>
                          <td>{ index+1}</td>
                          <td>{ subject.subject_code }</td>
                          <td>
                              <h3><NavLink to={`/exam/view-mark/${subject.subject_code}/${subject._id}`}><button type="button" class="btn btn-primary text-bold">View Mark</button></NavLink></h3>
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

export default ViewResult;