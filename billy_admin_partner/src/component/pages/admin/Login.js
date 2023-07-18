import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { adminlogin } from '../../../actions/adminAction';
import Loader from '../../layout/Loader/Loader'; 

const Login = ({ history, location }) => {

    const dispatch = useDispatch();

    const { error, loading, isAuthenticated, admin } = useSelector(
        (state) => state.admin
    );

    let navigate = useNavigate();
    const [adminEmailID, setadminEmailID] = useState("");
    const [adminPassword, setadminPassword] = useState("");
    const [errors, setError] = useState("");
    
    // const redirect = location.search ? location.search.split("=")[1] : "admin/dashbord";

    useEffect(() =>{
        if (error) {
            swal({
                title: "Login",
                text: error,
                icon: "warning",
            });
        }
        // alert(JSON.stringify(admin.token));
        // sessionStorage.clear();
        redirection();
    }, [dispatch, error, isAuthenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!adminEmailID || !adminPassword) {
            setError(true);
            return false;
        }

        dispatch(adminlogin(adminEmailID,adminPassword));
        if (isAuthenticated) {
            history.push('/admin/dashboard');
        }
}

const handlehomeNavigate = async (e) => {
    e.preventDefault();
    // alert("Hello")
    navigate("/");
}

const redirection = () => {
    try {
        if (sessionStorage.getItem("x-auth-token") && sessionStorage.getItem("admin")) {
            navigate("/admin/dashboard");
        }
    }
    catch (error) {
        swal({
            title: "Login",
            text: "Something went wrong!",
            icon: "warning",
            dangerMode: true
        });
        console.error(error.message);
    }
}
    return (
        <Fragment>
        {loading ? (
        <Loader />
      ) : (
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth">
                        <div className="row w-100">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left p-4">
                                <i className="mdi mdi-home menu-icon" onClick={handlehomeNavigate} style={{fontSize:"25px", borderRadius:'5px',backgroundColor:'#E5E4E2',cursor:'pointer'}} />
                                    <div className="brand-logo text-center">
                                        <img src="/assets/images/Billy_logo/BillyLogo.png" alt="logo" />
                                    </div>
                                    <h6 className="text-center">Admin Login</h6>
                                    <form className="pt-3">
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" value={adminEmailID} onChange={(e) => setadminEmailID(e.target.value)} required />
                                            {errors && !adminEmailID && <span className="invalid-input" style={{color:'red'}}>Please fill out this field!</span>}
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" value={adminPassword} onChange={(e) => setadminPassword(e.target.value)} required />
                                            {errors && !adminPassword && <span className="invalid-input" style={{color:'red'}}>Please fill out this field!</span>}
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={handleLogin}>SIGN IN</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* content-wrapper ends */}
                </div>
                {/* page-body-wrapper ends */}
            </div>
            )}
</Fragment>
    );
}

export default Login;