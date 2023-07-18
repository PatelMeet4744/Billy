import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getquestion, deletequestion } from '../../../actions/questionAction';
import swal from 'sweetalert';
import { DELETE_QUESTION_RESET } from "../../../constants/questionConstants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Question = ({ history }) => {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const {
    question,
    error,
    loading,
  } = useSelector((state) => state.question);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deletequestion);

  const deleteQuestionHandler = async (id) => {
    dispatch(deletequestion(id));
    dispatch(getquestion());
    swal({
      title: "Question Deleted Successfully",
      text: error,
      icon: "info",
  });
  navigate("/admin/question");
  }


  useEffect(() => {
    dispatch(getquestion());
    if (isDeleted) {
      swal({
        title: "Question Deleted Successfully",
        text: error,
        icon: "info",
    });
      dispatch({ type: DELETE_QUESTION_RESET });
    }
  }, [dispatch, alert, error, deleteError, history, isDeleted]);
  const defaultMaterialTheme = createTheme();
  return (
    <div>
      <div className="card">
        <div className='p-3' style={{ cursor: 'pointer' }}>
          <a className="card-title" style={{ textDecoration: 'None' }} href='/admin/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>Question</a>
        </div>
      </div><br />
      <div className="card">
        <div className="card-body">
          <div style={{ display: 'flex' }}>
            <Link to="managequestion" className='add_link'>
            <button style={{backgroundColor:'white',border:'none',color:'blue'}}>Add Question</button>
            {/* <a href='deliveryBoy/managedeliveryBoy'>Add Question</a> */}
            </Link>

          </div><br />

          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
              title="Question"
              columns={[
                { title: 'S.No #', render: rowData => rowData.tableData.id + 1 },
                { title: 'Question', field: 'questionName' },
                { title: 'Added On', render: rowData => rowData.createdAt.split('T')[0] },
                {
                    title: 'Actions', render: rowData => 
                    <div style={{ display: 'flex' }}>
                        <Link to={"/admin/question/managequestion/" + rowData.questionId}><a><label class="badge badge-success hand_cursor">Edit</label></a></Link>&nbsp;
                       <a onClick={()=>deleteQuestionHandler(rowData.questionId)}><label style={{cursor:'pointer'}} class="badge badge-danger delete_red hand_cursor">Delete</label></a>
                    </div>
                  },
                // {
                //   title: 'Actions', render: rowData => <div style={{ display: 'flex' }}>
                //     <a><label class="badge badge-success hand_cursor">Edit</label></a>&nbsp;
                //     <a onClick={()=>deleteQuestionHandler(rowData.questionId)}><label style={{cursor:'pointer'}} class="badge badge-danger delete_red hand_cursor">Delete</label></a>
                //     {/* <a ><label style={{ cursor: 'pointer' }} class="badge badge-danger delete_red hand_cursor">Delete</label></a> */}
                //   </div>
                // },
                // { title: 'Avatar', field: 'imageUrl', render: rowData => <img src={rowData.imageUrl} style={{width: 40, borderRadius: '50%'}}/> },
                // { title: 'Name', field: 'name' },
                // { title: 'Surname', field: 'surname' },
                // { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                // {
                //   title: 'Birth Place',
                //   field: 'birthCity',
                //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                // },
                // {
                //   title: 'Action', render: rowData => <div><a href={"admin/item/" + rowData.name} >Edit</a><a href='Home/dashbord'>Delete</a></div>
                // }
              ]}
              data={
                question
              }
              options={{
                exportButton: true,
                headerStyle: {
                  borderBlockColor: 'orange',
                  // backgroundColor: 'lightgrey',
                  // color:'#fff'
                },
                rowStyle: {
                  fontSize: '14px'
                },
              }}
            />
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default Question;