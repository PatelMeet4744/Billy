import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const Registration = () => {

    const [restaurant, setRestaurant] = useState({
        restaurantName: "",
        restaurantAddress: "",
        restaurantCity: "Bardoli",
        restaurantContact: "",
        ownerName: "",
        ownerContact: "",
        ownerEmailID: "",
        ownerPassword: "",
        restaurantImage: ""
    });

    const handleChange = (e) => {
        setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
    }

    const handlephoto = (e) => {
        setRestaurant({ ...restaurant, restaurantImage: e.target.files[0] })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('restaurantName', restaurant.restaurantName);
        formData.append('restaurantAddress', restaurant.restaurantAddress);
        formData.append('restaurantCity', restaurant.restaurantCity);
        formData.append('restaurantContact', restaurant.restaurantContact);
        formData.append('ownerName', restaurant.ownerName);
        formData.append('ownerContact', restaurant.ownerContact);
        formData.append('ownerEmailID', restaurant.ownerEmailID);
        formData.append('ownerPassword', restaurant.ownerPassword);
        formData.append('restaurantImage', restaurant.restaurantImage);

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            const result = await axios.post(
                "http://localhost:4000/api/restaurant",
                formData, config
            );
            if(result.data.status === true){
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Restaurant Registration',
                    text: result.data.data.message,
                    showConfirmButton: false,
                    timer: 2000
                })
            }else{
                Swal.fire({
                    position: 'top',
                    icon: 'info',
                    title: 'Restaurant Registration Fail',
                    text: result.data.data.message,
                })
            }
        } catch (error) {
            Swal.fire({
                position: 'top',
                icon: 'info',
                title: 'Restaurant Registration Fail',
                text: error.message,
            })
        }
    }
    return (
        <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex align-items-center auth">
                    <div className="row w-100">
                        <div className="col-lg-6 mx-auto">
                            <div className="auth-form-light text-left p-5">
                                <div className="brand-logo text-center">
                                    <img src="/assets/images/Billy_logo/logo.png" alt="logo" />
                                </div>
                                <div>
                                    <h4 className="font-weight-light" style={{ textAlign: 'center' }}>Partner</h4>
                                    <h6 className="font-weight-light" style={{ marginTop: 10 }}>Sign up to continue.</h6>
                                </div>
                                <form className="pt-3" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-6 mx-auto">
                                            <div className="form-group">
                                                <input type="text" className="form-control form-control-lg" placeholder="Restaurant Name" name="restaurantName" value={restaurant.restaurantName} onChange={(e) => handleChange(e)} required />
                                            </div>
                                            <div className="form-group">
                                                <textarea className="form-control form-control-lg" placeholder="Restaurant Address" name="restaurantAddress" value={restaurant.restaurantAddress} onChange={(e) => handleChange(e)}></textarea>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control form-control-lg" placeholder="Restaurant City" name="restaurantCity" value={restaurant.restaurantCity} onChange={(e) => handleChange(e)} required readOnly />
                                            </div>
                                            <div className="form-group">
                                                <input type="tel" className="form-control form-control-lg" placeholder="Restaurant Contact" name="restaurantContact" value={restaurant.restaurantContact} onChange={(e) => handleChange(e)} required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mx-auto">
                                            <div className="form-group">
                                                <input type="text" className="form-control form-control-lg" placeholder="Owner Name" name="ownerName" value={restaurant.ownerName} onChange={(e) => handleChange(e)} required />
                                            </div>
                                            <div className="form-group">
                                                <input type="tel" className="form-control form-control-lg" placeholder="Owner Contact" name="ownerContact" value={restaurant.ownerContact} onChange={(e) => handleChange(e)} required />
                                            </div>
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-lg" placeholder="Owner Email ID" name="ownerEmailID" value={restaurant.ownerEmailID} onChange={(e) => handleChange(e)} required />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-lg" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Owner Password"
                                                    name="ownerPassword" value={restaurant.ownerPassword} onChange={(e) => handleChange(e)} required />
                                            </div>
                                            <div className="form-group">
                                                <input type="file" className="form-control form-control-lg" placeholder="Restaurant Image"
                                                    name="restaurantImage" accept="image/*" onChange={(e) => handlephoto(e)} required />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN UP</button>
                                        </div>
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



    );
}


export default Registration;