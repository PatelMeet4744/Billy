import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getcomplain } from '../../../actions/complainAction';
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import axios from 'axios';

const Complain = () => {
    const dispatch = useDispatch();
  const {
    complain,
    error,
    loading,
  } = useSelector((state) => state.complain);

  useEffect(() => {
    dispatch(getcomplain());

  }, []);

  const activedeactive = async (id, status) => {
    const newstatus = (status === true ? "false" : "true");

    const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
    axios.defaults.headers.common["Authorization"] = token;
    const result = await axios.put(`http://localhost:4000/api/complain/${id}/${newstatus}`, '', '');

    if (result.data.message === "Success") {
      swal({
        title: "Complain",
        text: "The Complain Status Update",
        icon: "info",
      });
      dispatch(getcomplain());
    } else {
      swal({
        title: "Scope",
        text: result.errors[0].msg,
        icon: "warning",
        dangerMode: true
      });
    }
  }
  const defaultMaterialTheme = createTheme();
    return (
        <div>
      <div className="card">
        <div className='p-3' style={{ cursor: 'pointer' }}>
          <a className="card-title" style={{ textDecoration: 'None' }} href='/admin/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>Complain</a>
        </div>
      </div><br />
      <div className="card">
        <div className="card-body">
          <div style={{ display: 'flex' }}>
       </div>

            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
                title="Complain"
                columns={[
                  { title: 'S.No #', render: rowData => rowData.tableData.id+1 },
                  { title: 'Customer', render: rowData => <div><label>{rowData.customer['customerName']}</label><label>{rowData.customer['customerEmailID']}</label><label>{rowData.customer['customerContact']}</label></div> },
                  { title: 'Order', field: 'order' },
                  { title: 'Question', render: rowData => <div><label>{rowData.question['questionName']}</label></div> },
                  { title: 'Message', field: 'complainMessage' },
                  { title: 'Added On', render: rowData => rowData.createdAt.split('T')[0]  },
                  {
                    title: 'Actions', render: rowData => 
                      <div style={{ display: 'flex' }}>
                     <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.complainStatus === true ? "true" : ""} onClick={() => activedeactive(rowData.complainId, rowData.complainStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
                    </div>
                  },
                  
                ]}
                data={
                  complain
                }
                options={{
                  exportButton: true,
                  headerStyle: {
                    borderBlockColor: 'orange',
                    // backgroundColor:'orange',
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

export default Complain;