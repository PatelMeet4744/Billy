import React, { useState, useEffect, Fragment } from 'react'
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import Loader from '../../layout/Loader/Loader';
import { useDispatch, useSelector } from "react-redux";
import { getdeliveryboy } from '../../../actions/deliveryBoyAction';

const DeliveryBoy = () => {
  const [deliveryboys, setDeliveryboys] = useState("");

  const dispatch = useDispatch();
  const {
    deliveryboy,
    error,
    loading,
  } = useSelector((state) => state.deliveryboy);

  const deletefun = async (id) => {
    alert(id);
    alert("Delete is calling");
  }
 
  useEffect(() => {
    dispatch(getdeliveryboy());
  }, []);

  const defaultMaterialTheme = createTheme();
  return (
    
    <Fragment>
            {loading ? (
              <Loader />
            ) : (
      <div className="card">
        <div className="card-body">
          <div style={{ display: 'flex' }}>
            <h4 className="card-title">Delivery Boy Data table</h4>
            {/* <a href='deliveryboy/manage' style={{top:'50px' ,right:'0px'}}>Add Delivery Boy</a> */}
          </div>
          
            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                title="Delivery Boy"
                columns={[
                  // { title: 'S.No #', field: 'index' },
                  { title: 'Name', field: 'deliveryBoyName' },
                  { title: 'Mobile', field: 'deliveryBoyMobile' },
                  { title: 'Added On', field: 'createdAt' },
                  {
                    title: 'Actions', render: rowData => <div style={{ display: 'flex' }}><a><label class="badge badge-success hand_cursor">Edit</label></a>&nbsp;
                      <a><label class="badge badge-danger delete_red hand_cursor">Delete</label></a>
                      <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.deliveryBoyStatus === true ? "true" : ""}  type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
                    </div>
                  }
                ]}
                data={
                  deliveryboy
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
    )
            }
          </Fragment>
  )

}

export default DeliveryBoy;