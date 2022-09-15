import React, { useRef } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
import { findStudentGPA } from "./QueryGPA";
import { fetchExamResults } from "../../store/actions/ResultAction";
import { REMOVE_RESULT_ERRORS } from "../../store/types/ResultType";
import ReactToPrint  from "react-to-print";

const ViewResult = () => {
  const componentRef = useRef();
  const {message, resultErrors, loading, results} = useSelector((state)=> state.ResultReducer);
  const { exam } = useSelector((state)=>state.ExamReducer);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(resultErrors && resultErrors.length > 0){
        resultErrors.map((error)=>{
            toast.error(error.msg, {duration: 5000});
        });
        dispatch({type: REMOVE_RESULT_ERRORS});
    }
},[resultErrors]);
  useEffect(()=>{
    dispatch(fetchExamResults(exam._id));
  },[]);

  // console.log(results)
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
                    <h3>

                    <ReactToPrint
                      trigger={() => <button type="button" class="btn btn-primary float-right text-bold">Print Result</button>}
                      content={() => componentRef.current}
                      documentTitle="Result"
                    />
                                    
                      </h3>
                  </div>
                  
                  <div class="card-body" ref={componentRef}>
                    <h3 className="text-center">Dept. of { exam.dept_id.dept_name }</h3>
                    <h4 className="text-center">Islamic University, Kustia</h4>
                    <h5 className="text-center">Session: { exam.session } &nbsp;&nbsp; Semister: { exam.semister }th</h5>
                    {/* <h4 className="text-center"></h4> */}
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
                        <th>CGPA</th>
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
                        :'No Results found'
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