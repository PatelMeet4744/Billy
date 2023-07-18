import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getcomplain } from '../../../actions/complainAction';
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import axios from 'axios';

const Banner = () => {
    const dispatch = useDispatch();
    const {
      complain,
      error,
      loading,
    } = useSelector((state) => state.complain);
  
    useEffect(() => {
      dispatch(getcomplain());
  
    }, []);


    const defaultMaterialTheme = createTheme();
    return (
        <div>
      <div className="card">
        <div className='p-3' style={{ cursor: 'pointer' }}>
          <a className="card-title" style={{ textDecoration: 'None' }} href='/admin/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>Banner</a>
        </div>
      </div><br />
      <div className="card">
        <div className="card-body">
        <div style={{ display: 'flex' }}>
          <Link to="managebanner"  className='add_link'>
          <button style={{backgroundColor:'white',border:'none',color:'blue'}}>Add Banner</button>
          {/* <a href='deliveryBoy/managedeliveryBoy'>Add Delivery Boy</a> */}
              </Link>
            </div><br />
          <div style={{ display: 'flex' }}>
       </div>

            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
                title="Banner"
                columns={[
                  { title: 'S.No #', render: rowData => rowData.tableData.id+1 },
                  { title: 'Restaurant', field: 'restaurant' },
                  { title: 'BannerName', field: 'bannerName' },
                  { title: 'BannerImage', field: 'imageUrl', render: rowData => <a href={`http://localhost:4000${rowData.bannerImage}`} target="_blank"><img src={`http://localhost:4000${rowData.bannerImage}`} alt="CuisinesImage" style={{ width: 60, height: 30 }} /></a> },
                  {
                    title: 'Added On', render: rowData => 
                    <div>
                     2023-01-26
                    </div>
                  },
                  {
                    title: 'Banner Status', render: rowData => 
                    <div style={{ display: 'flex' }}>
                     <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.bannerStatus === true ? "true" : ""} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
                    </div>
                  },
                  {
                    title: 'Approval Status', render: rowData => 
                    <div style={{ display: 'flex' }}>
                     <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.approvalStatus === 1 ? "true" : ""} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
                    </div>
                  },
                  
                  
                ]}
                data={
                //   complain
                  [
                    
                    { restaurant: 'Dominos', bannerName: 'FirstBanner', bannerImage: '/uploads/banner/images/1670600202838-slider_2.jpg',bannerStatus:true,approvalStatus: 0},
                    { restaurant: 'Dominos', bannerName: 'SecondBanner', bannerImage: '/uploads/banner/images/1670600202838-slider_2.jpg',bannerStatus:false,approvalStatus: 1},
                    
                    // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                    // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                    // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                    // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                    // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                    // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                    // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                    // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },

                    // { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4' },
                  ]
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

export default Banner;