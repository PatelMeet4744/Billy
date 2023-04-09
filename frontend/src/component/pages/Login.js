import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from "react-redux";
import { restaurantlogin } from '../../actions/restaurantAction';
import { adminlogin } from '../../actions/adminAction';
import Loader from '../layout/Loader/Loader'; 

// const Login = ({ history, location }) => {
function Login(props){
        // alert(JSON.stringify(props));
    const dispatch = useDispatch();
    const loginuser = props.name;
    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.admin
    );

    let navigate = useNavigate();
    const [adminEmailID, setadminEmailID] = useState("");
    const [adminPassword, setadminPassword] = useState("");
    const [errors, setError] = useState("");

    const { restaurnaterror, restaurantloading } = useSelector(
        (state) => state.restaurantDetail
    );

    const [ownerEmailID, setownerEmailID] = useState("");
    const [ownerPassword, setownerPassword] = useState("");
    
    // const redirect = location.search ? location.search.split("=")[1] : "admin/dashbord";

    useEffect(() =>{
        if (error) {
            Swal.fire({
                position: 'top',
                icon: 'warning',
                title: 'Login Fail',
                text: error,
                dangerMode: true
            })
        }
        if (restaurnaterror) {
            Swal.fire({
                position: 'top',
                icon: 'warning',
                title: 'Login Fail',
                text: restaurnaterror,
                dangerMode: true
            })
        }
        // sessionStorage.clear();
        redirection();
    }, [dispatch, error, isAuthenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!adminEmailID || !adminPassword) {
            setError(true);
            return false;
        }
        if(props.name == "Admin"){
            dispatch(adminlogin(adminEmailID,adminPassword));
        }else{
            dispatch(restaurantlogin(adminEmailID,adminPassword));
        }
        
        if (isAuthenticated) {
            // history.push('/admin/dashboard');
        }
}

const redirection = () => {
    try {
        if (sessionStorage.getItem("x-auth-token") && sessionStorage.getItem("admin")) {
            navigate("/admin/dashboard");
        }else if(sessionStorage.getItem("x-auth-token") && sessionStorage.getItem("restaurant")){
            navigate("/partner/dashboard");
        }
    }
    catch (error) {
        Swal.fire({
            dangerMode: true,
            icon: 'warning',
            title: "Login",
            text: "Something went wrong!",
        })
        console.error(error.message);
    }
}
const handlehomeNavigate = async (e) => {
    e.preventDefault();
    // alert("Hello")
    navigate("/");
}
const handleForgotNavigate = async (e) => {
    e.preventDefault();
    // alert("Hello")
    navigate("/partner/forgotpassword");
}
const handleNavigate = async (e) => {
    e.preventDefault();
    // alert("Hello")
    navigate("/Resturant/Registration");
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
                                <i className="mdi mdi-home menu-icon" onClick={handlehomeNavigate} style={{color:'#f6881f', fontSize:"25px", borderRadius:'5px',backgroundColor:'#E5E4E2',cursor:'pointer'}} />
                                    <div className="brand-logo text-center">
                                        <img src="/assets/images/Billy_logo/BillyLogo.png" alt="logo" />
                                    </div>
                                    <h6 className="text-center">
                                    {loginuser.length == 0 ? ("Partner Login" ) :
                                        ("Admin Login")
                                        }
                                    </h6>
                                    <form className="pt-3">
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" value={adminEmailID} onChange={(e) => setadminEmailID(e.target.value)} required />
                                            {errors && !adminEmailID && <span className="invalid-input">Please Enter Email!</span>}
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" value={adminPassword} onChange={(e) => setadminPassword(e.target.value)} required />
                                            {errors && !adminPassword && <span className="invalid-input">Please Enter Password!</span>}
                                        </div>
                                        {loginuser.length == 0 ? (<span style={{color:'orange',cursor:'pointer'}} onClick={handleForgotNavigate}>Forgot Password</span> ) :
                                        <></> 
                                        }
                                        {/* <a style={{textDecoration:'None'}} href="/partner/forgotpassword"><a style={{backgroundColor:'white',border:'none',color:'orange',textDecoration:'None'}}>Forgot Password</a></a> */}
                                        <div className="mt-3">
                                            <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={handleLogin}>SIGN IN</button>
                                        </div>
                                        {loginuser.length == 0 ? (<div className="mt-3"><center>
                                            <span style={{color:'orange',cursor:'pointer'}} onClick={handleNavigate}>If you have not account click here</span> 
                                            </center>
                                        </div> ) :
                                        <></> 
                                        }
                                        
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