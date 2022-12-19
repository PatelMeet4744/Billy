import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getcustomer } from '../../../actions/customerAction';
import Loader from '../../layout/Loader/Loader';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';

const Customer = () => {

  const dispatch = useDispatch();
  const {
    customer,
    error,
    loading,
  } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getcustomer());
  }, [dispatch, error]);

  const defaultMaterialTheme = createTheme();

  return (
    <div>
      <div className="card">
        <div className='p-3' style={{ cursor: 'pointer' }}>
          <a className="card-title" style={{ textDecoration: 'None' }} href='/admin/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>Customer</a>
        </div>
      </div><br />
      <div className="card">
        <div className="card-body">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                  title="Customer"
                  columns={[
                    { title: 'S.No #', render: rowData => rowData.tableData.id+1 },
                    { title: 'Name', field: 'customerName' },
                    { title: 'Email', field: 'customerEmailID' },
                    { title: 'Mobile', field: 'customerContact' },
                    { title: 'Wallet', field: 'customerContact' },
                    { title: 'Added On', render: rowData => rowData.createdAt.split('T')[0] },
                    {
                      title: 'Actions', render: rowData => <div style={{ display: 'flex' }}>
                      {/* <a><label class="badge badge-success hand_cursor">Edit</label></a>&nbsp;
                        <a><label class="badge badge-danger delete_red hand_cursor">Delete</label></a> */}
                        {/* <div class="form-check form-switch ml-5 mt-0"><input class="form-check-input" style={{ backgroundColor: 'orange', border: '1px orange solid' }} checked={rowData.customerStatus === true ? "true" : ""} onClick={() => activefun(rowData.customerId, rowData.customerStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div> */}
                        </div>
                    }
                  ]}
                  data={
                    customer
                  }
                  options={{
                    exportFileName: 'Customer',
                    headerStyle: {
                      borderBlockColor: 'orange'
                    },
                    rowStyle: {
                      fontSize: '14px'
                    },
                    exportButton: true
                  }}
                />
              </ThemeProvider>
            )
            }
          </Fragment>
        </div>
      </div>
      </div>
  )

}

export default Customer;