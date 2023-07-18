import React from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { Link } from "react-router-dom";

const Variant = () => {
    const defaultMaterialTheme = createTheme();
    return (
        <div>
        <div className="card">
          <div className='p-3' style={{ cursor: 'pointer' }}>
            <a className="card-title" style={{ textDecoration: 'None' }} href='/admin/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>Variant</a>
          </div>
        </div><br />
        <div className="card">
          <div className="card-body">
          <div style={{ display: 'flex' }}>
            <Link to="ManageVariant"  className='add_link'>
            <button style={{backgroundColor:'white',border:'none',color:'blue'}}>Add Variant</button>
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
                    { title: 'Variant Name', field: 'variantName' },
                    { title: 'Variant uom', field: 'variantuom' },
                    { title: 'Variant Price', field: 'variantPrice' },
                    { title: 'Variant Sales Price', field: 'variantSalesPrice' },
                     {
                      title: 'Added On', render: rowData => 
                      <div>
                       2023-01-26
                      </div>
                    },
                    {
                      title: 'variant Status', render: rowData => 
                      <div style={{ display: 'flex' }}>
                       <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.variantStatus === true ? "true" : ""} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
                      </div>
                    }
                    
                  ]}
                  data={
                  //   complain
                    [
                      
                      { restaurant: 'Dominos', variantName: 'Large',variantuom:'Size',variantPrice:500,variantSalesPrice:500,variantStatus:true},
                      { restaurant: 'Dominos', variantName: 'small',variantuom:'Size',variantPrice:400,variantSalesPrice:400,variantStatus:true},
                     
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

export default Variant;