import React from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { Link } from "react-router-dom";

const Category = () => {
    const defaultMaterialTheme = createTheme();
    return (
        <div>
      <div className="card">
        <div className='p-3' style={{ cursor: 'pointer' }}>
          <a className="card-title" style={{ textDecoration: 'None' }} href='/admin/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>Category</a>
        </div>
      </div><br />
      <div className="card">
        <div className="card-body">
        <div style={{ display: 'flex' }}>
          <Link to="ManageCategory"  className='add_link'>
          <button style={{backgroundColor:'white',border:'none',color:'blue'}}>Add Category</button>
          {/* <a href='deliveryBoy/managedeliveryBoy'>Add Delivery Boy</a> */}
              </Link>
            </div><br />
          <div style={{ display: 'flex' }}>
       </div>

            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
                title="Category"
                columns={[
                  { title: 'S.No #', render: rowData => rowData.tableData.id+1 },
                  { title: 'Restaurant', field: 'restaurant' },
                  { title: 'Category Name', field: 'categoryName' },
                   {
                    title: 'Added On', render: rowData => 
                    <div>
                     2023-01-26
                    </div>
                  },
                  {
                    title: 'Category Status', render: rowData => 
                    <div style={{ display: 'flex' }}>
                     <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.categoryStatus === true ? "true" : ""} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
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
                    
                    { restaurant: 'Dominos', categoryName: 'Veg Pizza',categoryStatus:true,approvalStatus: 0},
                    { restaurant: 'Dominos', categoryName: 'Non Pizza',categoryStatus:false,approvalStatus: 1},
                    
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

export default Category;