import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { restaurantlogin } from '../../../actions/restaurantAction';
import Loader from '../../layout/Loader/Loader';
import { CLEAR_ERRORS } from '../../../constants/restaurantConstants'
import { Link } from 'react-router-dom';

const Login = ({ history, location }) => {

    const dispatch = useDispatch();

    const { error, loading, isAuthenticated, admin } = useSelector(
        (state) => state.restaurantDetail
    );

    let navigate = useNavigate();
    const [ownerEmailID, setownerEmailID] = useState("");
    const [ownerPassword, setownerPassword] = useState("");
    const [errors, setError] = useState("");
    
    // const redirect = location.search ? location.search.split("=")[1] : "admin/dashbord";

    useEffect(() =>{
        if (error) {
            swal({
                title: "Login",
                text: error,
                icon: "warning",
            });
            dispatch({ type: CLEAR_ERRORS });
        }
        // alert(JSON.stringify(admin.token));
        // sessionStorage.clear();
        redirection();
    }, [dispatch, error, isAuthenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!ownerEmailID || !ownerPassword) {
            setError(true);
            return false;
        }

        dispatch(restaurantlogin(ownerEmailID,ownerPassword));
        if (isAuthenticated) {
            history.push('/admin/dashboard');
        }
}

const handleNavigate = async (e) => {
    e.preventDefault();
    // alert("Hello")
    navigate("/Resturant/Registration");
}
const handleForgotNavigate = async (e) => {
    e.preventDefault();
    // alert("Hello")
    navigate("/partner/forgotpassword");
}

const handlehomeNavigate = async (e) => {
    e.preventDefault();
    // alert("Hello")
    navigate("/");
}
const redirection = () => {
    try {
        if (sessionStorage.getItem("x-auth-token") && sessionStorage.getItem("restaurant")) {
            navigate("/partner/dashboard");
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
                                    <h6 className="text-center">Partner Login</h6>
                                    <form className="pt-3">
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" value={ownerEmailID} onChange={(e) => setownerEmailID(e.target.value)} required />
                                            {errors && !ownerEmailID && <span className="invalid-input" style={{color:'red'}}>Please fill out this field!</span>}
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" value={ownerPassword} onChange={(e) => setownerPassword(e.target.value)} required />
                                            {errors && !ownerPassword && <span className="invalid-input" style={{color:'red'}}>Please fill out this field!</span>}
                                        </div>
                                        <span style={{color:'orange',cursor:'pointer'}} onClick={handleForgotNavigate}>Forgot Password</span> 
                                        {/* <a style={{textDecoration:'None'}} href="/partner/forgotpassword"><a style={{backgroundColor:'white',border:'none',color:'orange',textDecoration:'None'}}>Forgot Password</a></a> */}
                                        <div className="mt-3">
                                            <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={handleLogin}>SIGN IN</button>
                                        </div>
                                        <div className="mt-3"><center>
                                            <span style={{color:'orange',cursor:'pointer'}} onClick={handleNavigate}>If you have not account click here</span> 
                                            </center>
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