import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
// import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
// import { clearErrors, updatePassword } from "../../actions/userAction";
// import { useAlert } from "react-alert";
// import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
// import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const UpdatePassword = ({ history }) => {
  return (
    <Fragment>
        {/* <Fragment> */}
          {/* <MetaData title="Change Password" /> */}
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                // onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    // value={oldPassword}
                    // onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    // value={newPassword}
                    // onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    // value={confirmPassword}
                    // onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        {/* </Fragment> */}
    </Fragment>
  );
};

export default UpdatePassword;
