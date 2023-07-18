import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from '../../../actions/restaurantAction';
import Loader from '../../layout/Loader/Loader';

const ResetPassword = ({ history, props }) => {
    const { Id } = useParams();
    const { token } = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const { error, success, loading } = useSelector(
        (state) => state.forgotPassword
    );

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setError] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            setError(true);
            return false;
        }
        const myForm = new FormData();
        myForm.set("restaurantId", Id);
        myForm.set("restPasswordToken", token);
        myForm.set("newpassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
    
        dispatch(resetPassword(myForm));
    };

    useEffect(() => {
        if (error) {
            swal({
                title: "Login",
                text: error,
                icon: "warning",
            });
            dispatch(clearErrors());
          }
      
          if (success) {
            swal({
                title: "Profile",
                text: "Password Updated Successfully",
                icon: "success",
            });
            navigate("/partner/login");
            // history.push("/login");
          }
    }, [dispatch, error, alert, history, success]);
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
                                    <h6 className="text-center">Reset Password</h6>
                                    <form className="pt-3" onSubmit={resetPasswordSubmit}>
                                    <div className="form-group">
                                                <input type="password" className="form-control form-control-lg" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="New Password"
                                                    name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                                    {errors && !newPassword && <span className="invalid-input" style={{color:'red'}}>Please fill out this field!</span>}
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-lg" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Confirm Password"
                                                    name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                                    {errors && !confirmPassword && <span className="invalid-input" style={{color:'red'}}>Please fill out this field!</span>}
                                            </div>
                                        <div className="mt-3">
                                            <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" >Reset</button>
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
    // <div>
    //         {/* {match.params.token}Hello */}
    //         <div>ID: { Id }</div>
    //         <div>ResetToken: { token }</div>
    //         Hello
    //     </div>

export default ResetPassword;