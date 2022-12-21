import React, { useState, useEffect, Fragment } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getquestion } from '../../../actions/questionAction';
import Loader from '../../layout/Loader/Loader';

const Question = () => {

  const dispatch = useDispatch();
  const {
    question,
    error,
    loading,
  } = useSelector((state) => state.question);

  useEffect(() => {
    dispatch(getquestion());
  }, []);

  const defaultMaterialTheme = createTheme();
  return (
    <div>
      <div className="card">
        <div className='p-3' style={{ cursor: 'pointer' }}>
          <a className="card-title" style={{ textDecoration: 'None' }} href='/admin/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>Question</a>
        </div>
      </div><br />
      <Fragment>
            {loading ? (
              <Loader />
            ) : (
      <div className="card">
        <div className="card-body">
          <div style={{ display: 'flex' }}>
            <button style={{backgroundColor:'white',border:'none',color:'blue'}}>Add Question</button>
          </div><br />
          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              title="Question"
              columns={[
                { title: 'S.No #', render: rowData => rowData.tableData.id + 1 },
                { title: 'Question', field: 'questionName' },
                { title: 'Added On', render: rowData => rowData.createdAt.split('T')[0] },
              ]}
              data={
                question
              }
              options={{
                exportButton: true,
                headerStyle: {
                  borderBlockColor: 'orange'
                },
                rowStyle: {
                  fontSize: '14px'
                },
              }}
            />
          </ThemeProvider>
        </div>
      </div>
      )
            }
          </Fragment>
    </div>
  );
};

export default Question;