import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getorders } from '../../../actions/orderAction';
import Loader from '../../layout/Loader/Loader';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from "react-router-dom";

const Orders = ({ history }) => {
    const dispatch = useDispatch();

    const {
        Orders,
        error,
        loading,
      } = useSelector((state) => state.Orders);

      useEffect(() => {
        dispatch(getorders());
        // alert(JSON.stringify(Orders))
      }, [dispatch, alert, error, , history]);

      const defaultMaterialTheme = createTheme();
    return (
        <div>
      <div className="card">
        <div className='p-3' style={{ cursor: 'pointer' }}>
          <a className="card-title" style={{ textDecoration: 'None' }} href='/admin/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>Order</a>
        </div>
      </div><br />
      <div className="card">
        <div className="card-body">
          
          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
              title="Orders"
              columns={[
                { title: 'S.No #', render: rowData => rowData.tableData.id + 1 },
                { title: 'Customer', render: rowData => <div><label>{rowData.orderMaster.customer.customerName}</label><br/><label>{rowData.orderMaster.customer.customerEmailID}</label><br/><label>{rowData.orderMaster.customer.customerContact}</label></div>  },
                { title: 'Item Name', render: rowData => rowData.item.itemName },
                { title: 'Restaurant', render: rowData => <div><label>{rowData.item.restaurant.restaurantName}</label><br/><label>{rowData.item.restaurant.restaurantContact}</label><br/><label>{rowData.item.restaurant.ownerName}</label></div>},
                { title: 'Category', render: rowData => <div><label>{rowData.item.category.categoryName}</label></div>},
                { title: 'Total', render: rowData => (rowData.variant.variantSalesPrice + rowData.addon[0].addonFinalPrice + rowData.addextra[0].addextraFinalPrice) * rowData.orderQty},
                { title: 'Qty', render: rowData => rowData.orderQty},
                
                { title: 'Added On', render: rowData => rowData.createdAt.split('T')[0] },
              ]}
              data={
                Orders
              }
              options={{
                exportButton: true,
                headerStyle: {
                  borderBlockColor: 'orange',
                  // backgroundColor: 'lightgrey',
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

export default Orders;