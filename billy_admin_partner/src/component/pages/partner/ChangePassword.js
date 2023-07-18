import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from '../../../actions/restaurantAction';
import Loader from '../../layout/Loader/Loader';
import { UPDATE_PASSWORD_RESET } from "../../../constants/restaurantConstants";

const ChangePassword = ({ history }) => {
    const dispatch = useDispatch();

    const { error, isUpdated, loading } = useSelector((state) => state.restaurantProfile);
    let navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setError] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError(true);
            return false;
        }

        var restaurant = sessionStorage.getItem('restaurant')
        var restaurantId = JSON.parse(restaurant).restaurantId

        const formData = new FormData();
        formData.append('restaurantId', restaurantId);
        formData.append('ownerPassword', oldPassword);
        formData.append('newpassword', newPassword);
        formData.append('confirmPassword', confirmPassword);

        dispatch(updatePassword(restaurantId,oldPassword,newPassword,confirmPassword));
    };

    useEffect(() => {
        if (error) {
            swal({
                title: "Login",
                text: error,
                icon: "warning",
            });
        }    
        if (isUpdated) {
        //   ("Profile Updated Successfully");
          swal({
            title: "Profile",
            text: "Password Updated Successfully",
            icon: "success",
        });
        sessionStorage.clear();
        navigate("/partner/login");
        //   history.push("/account");
    
          dispatch({
            type: UPDATE_PASSWORD_RESET,
          });
        }
    }, [dispatch, error, history, isUpdated]);

    return (
        <Fragment>
        {loading ? (
        <Loader />
      ) : (
                    <div className="content-wrapper d-flex align-items-center auth">
                        <div className="row w-100">
                            <div className="col-lg-6 mx-auto">
                                <div className="auth-form-light text-left p-5">
                                    <h6 className="text-center">Change Password</h6>
                                    <form className="pt-3" onSubmit={updatePasswordSubmit}>
                                    <div className="form-group">
                                                <input type="password" className="form-control form-control-lg" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}" placeholder="Old Password"
                                                    name="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}  />
                                                    {errors && !oldPassword && <span className="invalid-input" style={{color:'red'}}>Please fill out this field!</span>}
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-lg" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="New Password"
                                                    name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}  />
                                                    {errors && !newPassword && <span className="invalid-input" style={{color:'red'}}>Please fill out this field!</span>}
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-lg" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Confirm Password"
                                                    name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  />
                                                    {errors && !confirmPassword && <span className="invalid-input" style={{color:'red'}}>Please fill out this field!</span>}
                                            </div>
                                         {/* {errors && !ownerPassword && <span className="invalid-input" style={{color:'red'}}>Please fill out this field!</span>} */}
                                        <div className="mt-3">
                                            <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">Change</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
             </div>
             )}
</Fragment>
    );
}

export default ChangePassword;