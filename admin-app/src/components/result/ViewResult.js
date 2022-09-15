import React, { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Loader from "../loader/Loader";
import { findStudentGPA } from "./QueryGPA";
import { fetchExamResults } from "../../store/actions/ResultAction";

const ViewResult = () => {
  const {message, loading, results} = useSelector((state)=> state.ResultReducer);
  const { exam } = useSelector((state)=>state.ExamReducer);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchExamResults(exam._id));
  },[]);

  console.log(results)
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
                        <th>Name</th>
                        <th>Roll</th>
                        {results && results.length>0?
                         results[0].records.map((result,index)=>(
                            <th>{ result.subject[0].subject_code }</th>
                         ))
                        :""}
                        <th>GPA</th>
                      </tr>
                      </thead>
                      <tbody>
                      {
                      !loading?
                      results && results.length > 0 ?
                      results.map((result, index)=>(
                        <tr>
                          <td>{ index+1 }</td>
                          <td>{ result.records[0].student[0].name }</td>
                          <td>{ result.records[0].student[0].roll }</td>
                          {result.records.map((mark)=>(
                             <td>{ mark.marks.final_mark }</td>
                          ))}
                          <td>{ findStudentGPA(result.records) }</td>
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