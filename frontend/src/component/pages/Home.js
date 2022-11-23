import React from 'react';
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <div className="row">
                <div className="col-lg-8 mx-auto">
                    <div className="auth-form-light text-left" style={{ padding: '10% 10% 10% 10%' }}>
                        <div className="brand-logo">
                            <img src="assets/images/Billy_logo/BillyLogo.png" width="20%" height="20%" alt="logo" />
                        </div>
                        {/* Order food from favourite restaurant near you */}
                        <h6 className="font-weight-light mt-5" style={{ fontSize: 30, color: 'gray' }}>Welcome to Billy</h6>
                        <div style={{ marginTop: '8%' }}>
                            <center>
                            <NavLink to="/admin/login">
                                <a className="btn" style={{ textDecoration: 'none', color: '#f6881f', fontSize: 15 }} href="../../index.html"><h3>Admin Portal</h3></a>
                                {/* <a class="mt-3" style="color:#f6881f;font-size:15px;text-decoration: none;" href="../../index.html"><h3>Admin Portal</h3></a> */}
                                </NavLink>
                            </center>
                        </div>
                        <div style={{ marginTop: '3%' }}>
                            <center>
                            <NavLink to="/partner/login">
                                <a className="btn" style={{ textDecoration: 'none', color: '#f6881f', fontSize: 15 }} href="../../index.html"><h3>Partner Portal</h3></a>
                            </NavLink>
                            </center>
                        </div>
                        <h6 className="font-weight-light mt-5" style={{ fontSize: 20, color: 'gray' }}>POPULAR CITIES IN INDIA</h6>
                        <h6 style={{ fontSize: 22, color: 'darkslategray' }}>Bardoli</h6>
                    </div>
                </div>
                <div className="col-4" style={{ padding: '0%' }}>
                    <img src="assets/images/bg_image.jpg" height="100%" width="100%" alt="logo" />
                </div>
            </div>
    );
};

export default Home;