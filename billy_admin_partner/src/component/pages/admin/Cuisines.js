import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getcuisines, deletecuisines } from '../../../actions/cuisinesAction';
import swal from 'sweetalert';
import axios from 'axios';
import { Link } from "react-router-dom";
import { DELETE_CUISINES_RESET } from '../../../constants/cuisinesConstants';

const Cuisines = ({ history }) => {

  const dispatch = useDispatch();
  const {
    cuisines,
    error,
    loading,
  } = useSelector((state) => state.cuisines);
  const {
    error: deleteError,
    isDeleted
  } = useSelector((state) => state.deleteCuisines);

  const activedeactive = async (id, status) => {
    const newstatus = (status === true ? "false" : "true");

    const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
    axios.defaults.headers.common["Authorization"] = token;
    const result = await axios.put(`http://localhost:4000/api/cuisines/${id}/${newstatus}`, '', '');
    // return alert(JSON.stringify(result));
    if (result.data.message === "Success") {
      swal({
        title: "Cuisines",
        text: "The Cuisines Status Update",
        icon: "info"
      });
      dispatch(getcuisines());
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

  const deleteProductHandler = async (cuisinesId,cuisinesImage,cuisinesBanner) => {
    
    
    const formData = new FormData();
    formData.append('cuisinesImage', cuisinesImage);
    formData.append('cuisinesBanner', cuisinesBanner);
    dispatch(deletecuisines(cuisinesId, formData));
    // alert(deleteError);
  }

  useEffect(() => {
    // alert(isDeleted)
    dispatch(getcuisines());

    if (deleteError) {
      // alert(deleteError);
    }

    if (isDeleted) {
      swal({
        title: "Cuisines Deleted",
        text: "Cuisines Deleted Successfully",
        icon: "info",
    });
      dispatch({ type: DELETE_CUISINES_RESET });
    }
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const defaultMaterialTheme = createTheme();
  return (
    <div>
      <div className="card">
        <div className='p-3' style={{ cursor: 'pointer' }}>
          <a className="card-title" style={{ textDecoration: 'None' }} href='/admin/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>Cuisines</a>
        </div>
      </div><br />
      <div className="card">
        <div className="card-body">
          <div style={{ display: 'flex' }}>

              <Link to="managecuisines" className='add_link'>
              <button style={{backgroundColor:'white',border:'none',color:'blue'}}>Add Cuisines</button>
                {/* <a href='deliveryBoy/managedeliveryBoy'>Add Cuisines</a> */}
              </Link>

            </div><br />

            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
                title="Cuisines"
                columns={[
                  { title: 'S.No #', render: rowData => rowData.tableData.id+1 },
                  { title: 'CuisinesImage', field: 'imageUrl', render: rowData => <a href={`http://localhost:4000${rowData.cuisinesImage}`} target="_blank"><img src={`http://localhost:4000${rowData.cuisinesImage}`} alt="CuisinesImage" style={{ width: 40, borderRadius: '50%' }} /></a> },
                  { title: 'CuisinesBanner', field: 'imageUrl', render: rowData => <a href={`http://localhost:4000${rowData.cuisinesBanner}`} target="_blank"><img src={`http://localhost:4000${rowData.cuisinesBanner}`} alt="Cuisines Banner" style={{ width: 60, height: 30 }} /></a> },
                  { title: 'CuisinesName', field: 'cuisinesName' },
                  { title: 'Description', field: 'cuisinesDescription' },
                  { title: 'Added On', render: rowData => rowData.createdAt.split('T')[0]  },
                  {
                    title: 'Actions', render: rowData => <div style={{ display: 'flex' }}>
                      <Link to={"/admin/cuisines/managecuisines/" + rowData.cuisinesId}><a><label class="badge badge-success hand_cursor">Edit</label></a></Link>&nbsp;
                       
                      <a onClick={()=>deleteProductHandler(rowData.cuisinesId,rowData.cuisinesImage,rowData.cuisinesBanner)}><label style={{cursor:'pointer'}} class="badge badge-danger delete_red hand_cursor">Delete</label></a>
                      <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.cuisinesStatus === true ? "true" : ""} onClick={() => activedeactive(rowData.cuisinesId, rowData.cuisinesStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
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
                  cuisines
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

export default Cuisines;