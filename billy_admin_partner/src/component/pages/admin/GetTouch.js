import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getcuisines } from '../../../actions/cuisinesAction';
import { getgetTouch } from '../../../actions/getTouchAction';
import axios from 'axios';
import swal from 'sweetalert';

const GetTouch = () => {

    const dispatch = useDispatch();
    const {
        gettouch,
        error,
        loading,
      } = useSelector((state) => state.gettouch);

      const activedeactive = async (id, status) => {
        const newstatus = (status === true ? "false" : "true");
    
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const result = await axios.put(`http://localhost:4000/api/getTouch/${id}/${newstatus}`, '', '');
        // return alert(JSON.stringify(result));
        if (result.data.message === "Success") {
          swal({
            title: "Get Tocuh",
            text: "The Get Tocuh Status Update",
            icon: "info",
            // dangerMode: true
          });
          dispatch(getgetTouch());
          // getScopes();
        } else {
          swal({
            title: "Scope",
            text: result.errors[0].msg,
            icon: "warning",
            dangerMode: true
          });
        }
      }
    useEffect(() => {
    dispatch(getgetTouch());
    }, []);
    const defaultMaterialTheme = createTheme();
    return (
      <div>
      <div className="card">
        <div className='p-3' style={{ cursor: 'pointer' }}>
          <a className="card-title" style={{ textDecoration: 'None' }} href='/admin/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>Get Tocuh</a>
        </div>
      </div><br />
      <div className="card">
        <div className="card-body">
         
            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
                title="Get Touch"
                columns={[
                  { title: 'S.No #', render: rowData => rowData.tableData.id+1 },
                  {title: 'RestaurantName', field : 'restaurant[restaurantName]'},
                  { title: 'Subject', field: 'getTouchSubject' },
                  { title: 'Message', field: 'getTouchMessage' },
                  {
                    title: 'Actions', render: rowData => <div style={{ display: 'flex' }}>
                      <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.getTouchStatus === true ? "true" : ""} onClick={() => activedeactive(rowData.getTouchId, rowData.getTouchStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
                    </div>
                  },
                  
                ]}
                data={
                  gettouch
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
            {/* {
            deliveryboy.length > 0 ?
            <Table users={deliveryboy} id={id} column={column} actions={actions} deletefun={deletefun} activefun={printhe}/>
            : <></>
          } */}
            {/* <div className="col-12">
              <div className="table-responsive">
                <table id="order-listing" className="table">
                  <thead>
                    <tr>
                      <th width="10%">S.No #</th>
                      <th width="17%">Name</th>
                      <th width="13%">Mobile</th>
                      <th width="14%">Added On</th>
                      <th width="18%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      deliveryboy.length > 0 ? deliveryboy.map((item, index) => (
                        <tr key={item.deliveryBoyId}>
                          <th user="row">{index + 1}</th>
                          <td>{item.deliveryBoyName}</td>
                          <td>{item.deliveryBoyMobile}</td>
                          <td>{item.createdAt}</td>
                          <td style={{ display: 'flex' }}>
                            <a><label class="badge badge-success hand_cursor">Edit</label></a>&nbsp;
                            <a><label class="badge badge-danger delete_red hand_cursor">Delete</label></a>
                            <div class="form-check form-switch ml-5"><input class="form-check-input" checked={item.deliveryBoyStatus === true ? "true" : ""} onClick={() => printhe(item.deliveryBoyId, item.deliveryBoyStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                            </div>
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
    );
};

export default GetTouch;