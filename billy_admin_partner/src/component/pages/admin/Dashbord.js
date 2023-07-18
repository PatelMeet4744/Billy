import { useDispatch, useSelector } from "react-redux";
import { getcustomer } from '../../../actions/customerAction';
import { getrestaurant } from '../../../actions/restaurantAction';
import { getItems } from '../../../actions/ItemAction';
import { getdeliveryboy } from '../../../actions/deliveryBoyAction';
import React, { useState, useEffect, Fragment } from 'react'

const Dashbord = () => {
    const dispatch = useDispatch();
    const {Items} = useSelector((state) => state.Item);
    const {deliveryboy} = useSelector((state) => state.deliveryboy);
    const {restaurant} = useSelector((state) => state.restaurant);
  const {
    customer,
    error,
    loading,
  } = useSelector((state) => state.customer);

  
  useEffect(() => {
    dispatch(getcustomer());
    dispatch(getrestaurant());
    dispatch(getItems());
    dispatch(getdeliveryboy());
    // setUsers(customer);
  }, [dispatch, error]);

    return (
        <div>
        <div class="row">
            <div class="col-md-6 col-lg-3 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <h1 class="font-weight-light mb-4">
                        </h1>
                        <div class="d-flex flex-wrap align-items-center">
                            <div>
                                <h4 class="font-weight-normal">Total User</h4>
                                <h4>{customer && customer.length}</h4>
                            </div>                            
                            <i class="mdi mdi-account icon-lg text-primary ml-auto"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-3 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <h1 class="font-weight-light mb-4">
                        </h1>
                        <div class="d-flex flex-wrap align-items-center">
                            <div>
                                <h4 class="font-weight-normal">Total Restaurant</h4>
                                {/* <p class="text-muted mb-0 font-weight-light">Last 7 Days Sale</p> */}
                                <h4>{customer && customer.length}</h4>
                            </div>
                            <i class="mdi mdi-food icon-lg text-primary ml-auto"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-3 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <h1 class="font-weight-light mb-4">
                        </h1>
                        <div class="d-flex flex-wrap align-items-center">
                            <div>
                                <h4 class="font-weight-normal">Total Items</h4>
                                {/* <p class="text-muted mb-0 font-weight-light">Last 30 Days Sale</p> */}
                                <h4>{Items && Items.length}</h4>
                            </div>
                            <i class="mdi mdi-silverware-variant icon-lg text-info ml-auto"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-3 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <h1 class="font-weight-light mb-4">
                        </h1>
                        <div class="d-flex flex-wrap align-items-center">
                            <div>
                                <h4 class="font-weight-normal">Total Delivery Boy</h4>
                                {/* <p class="text-muted mb-0 font-weight-light">Last 365 Days Sale</p> */}
                                <h4>{deliveryboy && deliveryboy.length}</h4>
                            </div>
                            <i class="mdi mdi-truck-delivery icon-lg text-success ml-auto"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-3 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <h1 class="font-weight-light mb-4">
                            {/* <?php
						echo $row['dish'];
						echo "<br/>";
						echo '<span style="font-size:15px;">(' . $row['t'] . ' Times)</span>';
						?> */}
                        </h1>
                        <div class="d-flex flex-wrap align-items-center">
                            <div>
                                <h4 class="font-weight-normal">Most Liked Dish</h4>

                            </div>
                            <i class="mdi mdi-food icon-lg text-primary ml-auto"></i>
                        </div>

                    </div>
                </div>
            </div>

            <div class="col-md-6 col-lg-3 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <h1 class="font-weight-light mb-4">
                            {/* <?php
						echo $row['name'];
						echo "<br/>";
						echo '<span style="font-size:15px;">(' . $row['t'] . ' Times)</span>';
						?> */}
                        </h1>
                        <div class="d-flex flex-wrap align-items-center">
                            <div>
                                <h4 class="font-weight-normal">Most Active User</h4>
                            </div>
                            <i class="mdi mdi-account icon-lg text-primary ml-auto"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Latest 5 Order</h4>
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th width="5%">Order Id</th>
                                            <th width="20%">Name/Email/Mobile</th>
                                            <th width="20%">Address/Zipcode</th>
                                            <th width="5%">Price</th>
                                            <th width="10%">Payment Type</th>
                                            <th width="10%">Payment Status</th>
                                            <th width="10%">Order Status</th>
                                            <th width="15%">Added On</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>meet<br/>19bmiit0015@gmail.com<br/>9665457841</td>
                                            <td>Surat<br/>395854</td>
                                            <td>455</td>
                                            <td>COD</td>
                                            <td><span style={{backgroundColor:'red',padding:'5px',color:'white'}} >Pending</span></td>
                                            <td>Pending</td>
                                            <td>25/10/2022</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    );
};

export default Dashbord;