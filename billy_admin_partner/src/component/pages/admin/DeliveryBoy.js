import React, { useState, useEffect } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import Table from '../../layout/Table';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import Loader from '../../layout/Loader/Loader';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getdeliveryboy,deletedeliveryBoy,clearErrors } from '../../../actions/deliveryBoyAction';
import { DELETE_DELIVERYBOY_RESET } from '../../../constants/deliveryBoyConstants';

const User = ({ history }) => {
  // const [deliveryboy, setDeliveryboy] = useState("");

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
    const result = await axios.put(`http://localhost:4000/api/deliveryBoy/${id}/${newstatus}`, '', '');
    // return alert(JSON.stringify(result));
    if (result.data.message === "Success") {
      swal({
        title: "Delivery Boy",
        text: "The Delivery Status Update",
        icon: "info",
        // dangerMode: true
      });
      dispatch(getdeliveryboy());
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
    alert(deliveryboy.length)
    dispatch(getdeliveryboy());
    if (isDeleted) {
      swal({
        title: "Delivery Boy Deleted",
        text: error,
        icon: "info",
    });
      dispatch({ type: DELETE_DELIVERYBOY_RESET });
    }
    // alert(JSON.stringify(deliveryboy));
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  // const getScopes = async () => {
  //   try {
  //     const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
  //     axios.defaults.headers.common["Authorization"] = token;
  //     const result = await axios.get('http://localhost:4000/api/deliveryBoy?page=1&pageSize=10', '', '');
  //     // alert(JSON.stringify(result.data.data));
  //     if (result.data.message === "Success") {
  //       setDeliveryboy(result.data.data);
  //       alert( deliveryboy)
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

  // const column = [
  //   { heading: 'S.No #', value: 'index' },
  //   { heading: 'Name', value: 'deliveryBoyName' },
  //   { heading: 'Mobile', value: 'deliveryBoyMobile' },
  //   { heading: 'Added On', value: 'createdAt' },
  //   { heading: 'Actions', value: 'action' }
  // ]
  // const id = 'deliveryBoyId';
  // const actions = [
  //   {value: 'update',colun: 'deliveryBoyId'},
  //   {value: 'delete',colun: 'deliveryBoyId'},
  //   {value: 'active', colun: 'deliveryBoyStatus'}
  // ]
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
          {/* <a href='deliveryBoy/managedeliveryBoy'>Add Delivery Boy</a> */}
              </Link>
            </div><br />

            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
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
                  deliveryboy
                  //   [
                  //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                  //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                  //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                  //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                  //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                  //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                  //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                  //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                  //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },

                  //   { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4' },
                  // ]
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
      )

}

      export default User;