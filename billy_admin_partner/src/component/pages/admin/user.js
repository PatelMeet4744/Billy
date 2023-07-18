import React, { useState, useEffect, Fragment } from 'react'
// import swal from 'sweetalert';
// import Table from '../../layout/Table';
import { useDispatch, useSelector } from "react-redux";
import { getcustomer } from '../../../actions/customerAction';
import Loader from '../../layout/Loader/Loader';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import axios from 'axios';
import swal from 'sweetalert';

const User = () => {

  const dispatch = useDispatch();
  const {
    customer,
    error,
    loading,
  } = useSelector((state) => state.customer);

  // const [users, setUsers] = useState("");

  useEffect(() => {
    dispatch(getcustomer());
    // setUsers(customer);
  }, [dispatch, error]);

  // const getScopes = async () => {
  //   try {
  //     const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
  //     axios.defaults.headers.common["Authorization"] = token;
  //     const result = await axios.get('http://localhost:4000/api/customer', '', '');
  //     // alert(JSON.stringify(result.data.data));
  //     if (result.data.message === "Success") {
  //       setUsers(result.data.data);
  //       // alert("The value is",JSON.stringify(users));
  //     } else {
  //       swal({
  //         title: "Scope",
  //         text: result.errors[0].msg,
  //         icon: "warning",
  //         dangerMode: true
  //       });
  //     }
  //   }
  //   catch (error) {
  //     console.log(error);
  //     swal({
  //       title: "Scope",
  //       text: "Something went wrong!",
  //       icon: "warning",
  //       dangerMode: true
  //     });
  //   }
  // }

  const activefun = async (id, status) => {
    const newstatus = (status === true ? "false" : "true");

    const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
    axios.defaults.headers.common["Authorization"] = token;
    const result = await axios.put(`http://localhost:4000/api/customer/${id}/${newstatus}`, '', '');
    // return alert(JSON.stringify(result));
    if (result.data.message === "Success") {
      swal({
        title: "Customer",
        text: "The Customer Status Update",
        icon: "info",
        // dangerMode: true
      });
      dispatch(getcustomer());
      // getScopes();
    } else {
      swal({
        title: "Scope",
        text: result.errors[0].msg,
        icon: "warning",
        dangerMode: true
      });
    }
    // alert(status);
    // alert(id);
  }
  // const column = [
  //   {heading: 'S.No #', value: 'index'},
  //   {heading: 'Name', value: 'customerName'},
  //   {heading: 'Email', value: 'customerEmailID'},
  //   {heading: 'Mobile', value: 'customerContact'},
  //   {heading: 'Wallet', value: 'customerContact'},
  //   {heading: 'Added On', value: 'createdAt'},
  //   {heading: 'Actions', value: 'action'},
  // ]
  // const id = 'customerId';
  // const actions = [
  //   {value: 'active', colun: 'customerStatus'}
  // ]
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
                        <div class="form-check form-switch ml-5 mt-0"><input class="form-check-input" style={{ backgroundColor: 'orange', border: '1px orange solid' }} checked={rowData.customerStatus === true ? "true" : ""} onClick={() => activefun(rowData.customerId, rowData.customerStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div></div>
                    }
                  ]}
                  data={
                    customer
                  }
                  options={{
                    exportFileName: 'Customer',
                    headerStyle: {
                      borderBlockColor: 'orange',
                      // backgroundColor:'orange',
                      // color:'#fff'
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
          {/* {
           <Fragment>
            {loading ? (
              <Loader/>
            ):(
              users.length > 0 ?
            <Table users={customer} id={id} column={column} actions={actions} activefun={activefun}/>
            : <></>
            )
            }
           </Fragment>
          } */}
          {/* <div className="col-12">
              <div className="table-responsive">
                <table id="order-listing" className="table">
                  <thead>
                    <tr>
                      <th width="10%">S.No #</th>
                      <th width="17%">Name</th>
                      <th width="17%">Email</th>
                      <th width="13%">Mobile</th>
                      <th width="11%">Wallet</th>
                      <th width="14%">Added On</th>
                      <th width="18%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users.length > 0 ? users.map((item, index) => (
                        <tr key={item.customerId}>
                          <th user="row">{index + 1}</th>
                          <td>{item.customerName}</td>
                          <td>{item.customerEmailID}</td>
                          <td>{item.customerContact}</td>
                          <td>400</td>
                          <td>{item.createdAt}</td>
                          <td>
                            {item.customerStatus === false ? (
                              <a><label class="badge badge-info hand_cursor">Deactive</label></a>
                            ) :
                              <a><label className="badge badge-danger hand_cursor">Active</label></a>
                            }

                          </td>
                        </tr>
                      ))
                        : <tr> <td colspan="3" style={{ textAlign: "center" }}><strong>No Records
                          Founds!</strong></td></tr>
                    }
                  </tbody>
                </table>
              </div>
            </div> */}
        </div>
      </div>
      </div>
  )

}

export default User;