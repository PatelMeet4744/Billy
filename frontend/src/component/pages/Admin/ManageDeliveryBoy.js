import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { NEW_DELIVERYBOY_RESET,UPDATE_DELIVERYBOY_RESET } from "../../../constants/deliveryBoyConstants";
import { clearErrors, createDeliveryBoy,getsingledeliveryboy,updateDeliveryBoy } from "../../../actions/deliveryBoyAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const ManageDeliveryBoy = ({ history }) => {
    const [deliveryBoyName, setDeliveryBoyName] = useState("");
    const [deliveryBoyPassword, setDeliveryBoyPassword] = useState("");
    const [deliveryBoyContact, setDeliveryBoyContact] = useState("");

    const [errors, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { newDeliveryBoy, loading, error, success } = useSelector((state) => state.newDeliveryBoy);
    const { singledeliveryboy } = useSelector((state) => state.singleDeliveryBoy);
    const { error: deleteError, isUpdated } = useSelector(
        (state) => state.deleteDeliveryBoy);
    const params = useParams();

    useEffect(() => {
        if(params.id){
            dispatch(getsingledeliveryboy(params.id));
            setDeliveryBoyName(singledeliveryboy.deliveryBoyName);
            setDeliveryBoyPassword(singledeliveryboy.deliveryBoyPassword);
            setDeliveryBoyContact(singledeliveryboy.deliveryBoyMobile);
        }

        if(isUpdated){
            Swal.fire({
                position: 'middle',
                icon: 'success',
                title: 'DeliveryBoy Update',
                text: 'The DeliveryBoy Updated Successfully',
                showConfirmButton: false,
                timer: 2000
            })
            navigate('/admin/deliveryBoy');
            dispatch({type: UPDATE_DELIVERYBOY_RESET});
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            Swal.fire({
                position: 'middle',
                icon: 'success',
                title: 'DeliveryBoy',
                text: 'The DeliveryBoy Created Successfully',
                showConfirmButton: false,
                timer: 2000
            });
          navigate('/admin/deliveryBoy')
          dispatch({ type: NEW_DELIVERYBOY_RESET });
        }
      }, [dispatch, alert, error, history, success,params.id,isUpdated]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!deliveryBoyName || !deliveryBoyPassword || !deliveryBoyContact) {
            setError(true);
            return false;
        }
        
        const formData = new FormData();
        formData.append('deliveryBoyName', deliveryBoyName);
        formData.append('deliveryBoyMobile', deliveryBoyContact);
        if(!params.id){
        formData.append('deliveryBoyPassword', deliveryBoyPassword);
        }
        if(params.id){
            dispatch(updateDeliveryBoy(params.id, formData));
        }else{
        dispatch(createDeliveryBoy(formData));
        }   
    }
    return (
        <div class="row">
            <h4 class="grid_title ml10 ml15">Manage Delivery Boy</h4>
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <form className="pt-3" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label for="exampleInputName1">Name</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Name" name="deliveryBoyName" value={deliveryBoyName} onChange={(e) => setDeliveryBoyName(e.target.value)} />
                                {errors && !deliveryBoyName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Name!</span>}
                            </div>
                            {
                            !params.id ? (
                            <div className="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control form-control-lg" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Password" name="deliveryBoyPassword" value={deliveryBoyPassword} onChange={(e) => setDeliveryBoyPassword(e.target.value)} />
                                {errors && !deliveryBoyPassword && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Password!</span>}
                            </div>
                            ) : ('')
                            }
                            <div className="form-group">
                                <label for="exampleInputMobilel3" required>Mobile Number</label>
                                <input type="tel" className="form-control form-control-lg" pattern="[1-9]{1}[0-9]{9}" placeholder="Mobile Number" name="deliveryBoyContact" value={deliveryBoyContact} onChange={(e) => setDeliveryBoyContact(e.target.value)} />
                                {errors && !deliveryBoyContact && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Mobile Number!</span>}
                            </div>
                            <div className="mt-3">
                            <button type="submit" style={{height:'40px'}} class="btn btn-primary mr-2" name="submit">Submit</button>
                                {/* <a type="submit" style={{color:'white'}} class="btn btn-primary mr-2" name="submit">Submit</a> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageDeliveryBoy;