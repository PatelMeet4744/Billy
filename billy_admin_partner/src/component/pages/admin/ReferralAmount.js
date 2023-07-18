import React, { useState, useEffect } from 'react';
import { json, useNavigate } from "react-router-dom";
import { clearErrors,getreferralAmount,updateReferralAmount  } from "../../../actions/referralAmountAction";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_REFERRALAMOUNT_RESET } from "../../../constants/referralAmountConstants";
import swal from 'sweetalert';

const ReferralAmount = ({ history }) => {

    
    const [errors, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { referralamount,error } = useSelector((state) => state.referralAmount);
    const { isUpdated } = useSelector((state) => state.updatereferralamount);
    const [RAmount, setRAmount] = useState(referralamount.referralAmount || '');

    useEffect(() => {
        // setRAmount(referralamount.referralAmount);       
        dispatch(getreferralAmount());
        // setRAmount(referralamount);
        // alert(referralamounts);

        if (isUpdated) {
            swal({
                title: "Referral Amount",
                text: "Referral Amount Updated Sucssessfully",
                icon: "info"
        });
        navigate('/admin/referralamount');
        dispatch({ type: UPDATE_REFERRALAMOUNT_RESET });
        }
        
      }, [dispatch, alert, error, history, isUpdated,RAmount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!RAmount) {
            setError(true);
            return false;
        }
        const formData = new FormData();
        formData.append('referralAmount', RAmount);
        const id = referralamount.referralAmountId;
        dispatch(updateReferralAmount(id,formData));
    }
    return (
        <>
            <div class="row">
            <h4 class="grid_title ml10 ml15">Manage Referral Amount</h4>
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <form className="pt-3">
                            
                            <div className="form-group">
                                <label for="exampleInputName1">Amount</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Amount" name="deliveryBoyName" value={RAmount} onChange={(e) => setRAmount(e.target.value)} />
                                {errors && !RAmount && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Amount!</span>}
                            </div>
                            
                            <div className="mt-3">
                            <button type="submit" style={{height:'40px'}} class="btn btn-primary mr-2" name="submit" onClick={handleSubmit}>Submit</button>
                                {/* <a type="submit" style={{color:'white'}} class="btn btn-primary mr-2" name="submit">Submit</a> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default ReferralAmount;