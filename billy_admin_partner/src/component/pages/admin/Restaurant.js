import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getrestaurant } from '../../../actions/restaurantAction';
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import axios from 'axios';

const Restaurant = () => {

    const dispatch = useDispatch();
    const {
        restaurant,
        error,
        loading,
      } = useSelector((state) => state.restaurant);

      const activedeactive = async (id, status) => {
        const newstatus = (status === true ? "false" : "true");
    
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const result = await axios.put(`http://localhost:4000/api/restaurant/${id}/${newstatus}`, '', '');
        // return alert(JSON.stringify(result));
        if (result.data.message === "Success") {
          swal({
            title: "Restaurant",
            text: "The Restaurant Status Update",
            icon: "info",
            // dangerMode: true
          });
          dispatch(getrestaurant())
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
        dispatch(getrestaurant())
      }, []);
      const defaultMaterialTheme = createTheme();
    return (
      <div>
      <div className="card">
        <div className='p-3' style={{ cursor: 'pointer' }}>
          <a className="card-title" style={{ textDecoration: 'None' }} href='/admin/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>Restaurant</a>
        </div>
      </div><br />
      <div className="card">
        <div className="card-body">
          <div style={{ display: 'flex' }}>

          
            </div>

            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
                title="Restaurants"
                columns={[
                  { title: 'S.No #', render: rowData => <Link to={"managerestaurant/" + rowData.restaurantId} className='add_link'><button style={{backgroundColor:'white',border:'none',color:'blue'}}>{rowData.tableData.id+1}</button></Link> },
                  { title: 'restaurantName', field: 'restaurantName' },
                  { title: 'restaurantImage', field: 'imageUrl', render: rowData => <a href={`http://localhost:4000${rowData.restaurantImage}`} target="_blank"><img src={`http://localhost:4000${rowData.restaurantImage}`} alt="Cuisines Banner" style={{ width: 60, height: 30 }} /></a> },
                  { title: 'restaurantAddress', field: 'restaurantAddress' },
                  { title: 'restaurantContact', field: 'restaurantContact' },
                  
                  { title: 'Added On', render: rowData => rowData.createdAt.split('T')[0]  },
                  {
                    title: 'Actions', render: rowData => <div style={{ display: 'flex' }}>
                      
                      <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.restaurantStatus === true ? "true" : ""} onClick={() => activedeactive(rowData.restaurantId, rowData.restaurantStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
                    </div>
                  },

                ]}
                data={
                  restaurant
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

export default Restaurant;