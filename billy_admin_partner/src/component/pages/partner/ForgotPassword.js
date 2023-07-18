import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from '../../../actions/restaurantAction';
import Loader from '../../layout/Loader/Loader';

const ForgotPassword = () => {
    const dispatch = useDispatch();

    const { error, message, loading } = useSelector(
        (state) => state.forgotPassword
    );

    const [email, setEmail] = useState("");
    const [errors, setError] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        // alert("Hello")
        if (!email) {
            setError(true);
            return false;
        }
        const myForm = new FormData();
        myForm.set("ownerEmailID", email);
        dispatch(forgotPassword(myForm));
    };

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (message) {
            swal({
                title: "Profile",
                text: message,
                icon: "success",
            });
        }
      }, [dispatch, error, alert, message]);

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
                                <div className="auth-form-light text-left p-5">
                                    <div className="brand-logo text-center">
                                        <img src="/assets/images/Billy_logo/BillyLogo.png" alt="logo" />
                                    </div>
                                    <h6 className="text-center">Forgot Password</h6>
                                    <form className="pt-3"  onSubmit={forgotPasswordSubmit}>
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" value={email}
                    onChange={(e) => setEmail(e.target.value)} placeholder="Email Id" />
                                            {errors && !email && <span className="invalid-input" style={{color:'red'}}>Please fill out this field!</span>}
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" >Send</button>
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
export default ForgotPassword;