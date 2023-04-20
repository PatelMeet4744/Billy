import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import Loader from '../../layout/Loader/Loader';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getdeliveryboy,deletedeliveryBoy,clearErrors } from '../../../actions/deliveryBoyAction';
import { DELETE_DELIVERYBOY_RESET } from '../../../constants/deliveryBoyConstants';

const User = ({ history }) => {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const {
    deliveryboy,
    error,
    loading,
  } = useSelector((state) => state.deliveryboy);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteDeliveryBoy);

  const deleteDeliveryBoyHandler = async (id) => {
    dispatch(deletedeliveryBoy(id));
  }
  const activedeactive = async (id, status) => {
    const newstatus = (status === true ? "false" : "true");

    const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
    axios.defaults.headers.common["Authorization"] = token;
    const result = await axios.put(`http://${process.env.REACT_APP_IP}/api/deliveryBoy/${id}/${newstatus}`, '', '');
    if (result.data.message === "Success") {
      Swal.fire({
        position: 'middle',
        icon: 'success',
        title: 'DeliveryBoy Status',
        text: 'The Delivery Status Update',
        showConfirmButton: false,
        timer: 2000
    })
      dispatch(getdeliveryboy());
    } else {
      Swal.fire({
        position: 'middle',
        icon: 'success',
        title: 'DeliveryBoy',
        text: result.errors[0].msg,
        showConfirmButton: false,
        timer: 2000
    })
    }
  }
  useEffect(() => {
    dispatch(getdeliveryboy());
    if (isDeleted) {
    Swal.fire({
      position: 'middle',
      icon: 'success',
      title: 'DeliveryBoy Deleted',
      text: error,
      showConfirmButton: false,
      timer: 2000
  })
      dispatch({ type: DELETE_DELIVERYBOY_RESET });
    }
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  
  const defaultMaterialTheme = createTheme();
  return (
    <div>
      <div className="card">
        <div className='p-3' style={{ cursor: 'pointer' }}>
          <a className="card-title" style={{ textDecoration: 'None' }} href='/admin/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>DeliveryBoy</a>
        </div>
      </div><br />
      <div className="card">
        <div className="card-body">
          <div style={{ display: 'flex' }}>
          <Link to="managedeliveryBoy"  className='add_link'>
          <button style={{backgroundColor:'white',border:'none',color:'blue'}}>Add Delivery Boy</button>
              </Link>
            </div><br />

            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                title="Delivery Boy"
                columns={[
                  { title: 'S.No #', render: rowData => rowData.tableData.id+1 },
                  { title: 'Name', field: 'deliveryBoyName' },
                  { title: 'Mobile', field: 'deliveryBoyMobile' },
                  { title: 'Added On', render: rowData => rowData.createdAt.split('T')[0] },
                  {
                    title: 'Actions', render: rowData => 
                    <div style={{ display: 'flex' }}>
                    <Link to={"/admin/deliveryBoy/managedeliveryBoy/" + rowData.deliveryBoyId}><a><label class="badge badge-success hand_cursor">Edit</label></a></Link>&nbsp;
                      <a onClick={()=>deleteDeliveryBoyHandler(rowData.deliveryBoyId)}><label style={{cursor:'pointer'}} class="badge badge-danger delete_red hand_cursor">Delete</label></a>
                      <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.deliveryBoyStatus === true ? "true" : ""} onClick={() => activedeactive(rowData.deliveryBoyId, rowData.deliveryBoyStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
                    </div>
                  },
                ]}
                data={
                  deliveryboy
                }
                options={{
                  exportButton: true,
                  rowData:{
                    hover:{
                      color:'red'
                    }
                  },
                  headerStyle: {
                    borderBlockColor: 'orange',
                    // backgroundColor:'orange',
                    // color:'#fff'
                  },
                  rowStyle:{
                   fontSize: '14px'
                  },
                }}
              />
            </ThemeProvider>
          </div>
        </div>
      </div>
      )

}

      export default User;