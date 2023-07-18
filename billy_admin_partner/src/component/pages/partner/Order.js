import React from 'react';

const Order = () => {
    return (
        <div>
            <div>
        <h3>Orders</h3>
        <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
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
        </div>
    );
};

export default Order;