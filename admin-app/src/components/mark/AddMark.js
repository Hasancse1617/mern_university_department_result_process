// import React, { useState } from "react";
// import { useEffect } from "react";
// import { Helmet } from "react-helmet";
// import toast, {Toaster} from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink, useParams } from "react-router-dom";
// import Loader from "../loader/Loader";
// import { REMOVE_MARK_MESSAGE } from "../../store/types/MarkType";
// import { fetchStudentMark } from "../../store/actions/MarkAction";

// const AddMark = () => {
//   const { id } = useParams();
//   const {message, loading, marks} = useSelector((state)=> state.MarkReducer);
//   const { exam } = useSelector((state)=>state.ExamReducer);
//   const dispatch = useDispatch();
//   useEffect(()=>{
//     dispatch(fetchStudentMark(id));
//   },[]);

//     return (
//         <>
//         <Helmet>
//             <title>Marks | Result Processing</title>
//             <meta name="description" content="Marks | Result Processing" />
//         </Helmet>
//         <Toaster position="top-right" reverseOrder={false}/>
//         <section class="content">
//           <div class="container-fluid">
//             <div class="row">
//               <div class="col-12">
//                 <div class="card">
//                   <div class="card-header">
//                     <h4 className="float-left">All Mark</h4>
//                   </div>
                  
//                   <div class="card-body">
//                   <h4 className="float-left">Subject Code: CSE-401</h4>
//                   <table id="example2" class="table table-bordered table-hover">
//                       <thead>
//                       <tr>
//                         <th>SL.</th>
//                         <th>Mark Code</th>
//                         <th>Total Mark</th>
//                         <th>Credit</th>
//                         <th>1st Examinar</th>
//                         <th>2nd Examinar</th>
//                         <th>3rd Examinar</th>
//                         <th>Action</th>
//                       </tr>
//                       </thead>
//                       <tbody>
//                       {/* {
//                       !loading?
//                       marks.length > 0 ?
//                       marks.map((mark, index)=>(
//                           <tr key={mark._id}>
//                           <td>{ index+1}</td>
//                           <td>{ mark.mark_code }</td>
//                           <td>{ mark.mark_mark }</td>
//                           <td>{ mark.mark_credit }</td>
//                           <td>{ mark.first_examinar.name }</td>
//                           <td>{ mark.second_examinar.name }</td>
//                           <td>{ mark.third_examinar.name }</td>
//                           <td>
//                             <NavLink exact to={`/exam/edit-mark/${mark._id}`} ><button title="Edit" className="text-success" ><i className="fas fa-edit"></i></button></NavLink>&nbsp;
//                             <button onClick={() => deleteMark(mark._id)} className="text-danger"><i className="fas fa-trash"></i></button>&nbsp;</td>
//                         </tr>
//                         ))
//                         :'No marks found'
//                       :(<Loader/>)
//                        }  */}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//                 </div>
//               </div>
//             </div>
//         </section>
//         </>
//     );
// }

// export default AddMark;