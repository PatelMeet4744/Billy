import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert'
import './fileupload.css'
import { useNavigate, NavLink } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import { faFileAlt } from '@fortawesome/free-solid-svg-icons'

const Registration = () => {
    let navigate = useNavigate();
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
    const [errors, setError] = useState("");

    const handleChange = (e) => {
        setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
    }

    const handlephoto = (e) => {
        // if(e.target.files[0].name.split('.').pop() == "png")
        setRestaurant({ ...restaurant, restaurantImage: e.target.files[0] })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!restaurant.restaurantName || !restaurant.restaurantAddress || !restaurant.restaurantContact|| !restaurant.ownerName|| !restaurant.ownerContact|| !restaurant.ownerEmailID|| !restaurant.ownerPassword|| !restaurant.restaurantImage) {
            setError(true);
            return false;
        }
        if(restaurant.restaurantImage.name.split('.').pop() === "png" || restaurant.restaurantImage.name.split('.').pop() === "jpg" || restaurant.restaurantImage.name.split('.').pop() === "jpeg")
        {
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
                Swal({
                    position: 'top',
                    icon: 'success',
                    title: 'Restaurant Registration',
                    text: result.data.data.message,
                    showConfirmButton: false,
                    timer: 2000
                })
            }else{
                Swal({
                    position: 'top',
                    icon: 'info',
                    title: 'Restaurant Registration Fail',
                    text: result.data.data.message,
                })
            }
        } catch (error) {
            Swal({
                position: 'top',
                icon: 'info',
                title: 'Restaurant Registration Fail',
                text: error.message,
            })
        }
        }
        else{
            Swal({
                title: "File",
                text: "Only png, jpg and jpeg file allowed",
                icon: "warning",
                dangerMode: true
            });
        }
                
    }
    const handleNavigate = async (e) => {
        e.preventDefault();
        // alert("Hello")
        navigate("/partner/login")
    }
    return (
        <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex align-items-center auth">
                    <div className="row w-100">
                        <div className="col-lg-6 mx-auto">
                            <div className="auth-form-light text-left p-5">
                                <div className="brand-logo text-center">
                                    <img src="/assets/images/Billy_logo/BillyLogo.png" alt="logo" />
                                </div>
                                <div>
                                    <h4 className="font-weight-light" style={{ textAlign: 'center' }}>Partner</h4>
                                    {/* <h6 className="font-weight-light" style={{ marginTop: 10 }}>Sign up to continue.</h6> */}
                                </div>
                                <form className="pt-3" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-6 mx-auto">
                                            <div className="form-group">
                                                <input type="text" className="form-control form-control-lg" placeholder="Restaurant Name" name="restaurantName" value={restaurant.restaurantName} onChange={(e) => handleChange(e)} />
                                                {errors && !restaurant.restaurantName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Restaurant Name!</span>}
                                            </div>
                                            <div className="form-group">
                                                <textarea className="form-control form-control-lg" placeholder="Restaurant Address" name="restaurantAddress" value={restaurant.restaurantAddress} onChange={(e) => handleChange(e)}></textarea>
                                                {errors && !restaurant.restaurantAddress && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Restaurant Address!</span>}
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control form-control-lg" placeholder="Restaurant City" name="restaurantCity" value={restaurant.restaurantCity} onChange={(e) => handleChange(e)} readOnly />
                                            </div>
                                            <div className="form-group">
                                                <input type="tel" className="form-control form-control-lg" pattern="[1-9]{1}[0-9]{9}" placeholder="Restaurant Contact" name="restaurantContact" value={restaurant.restaurantContact} onChange={(e) => handleChange(e)}  />
                                                {errors && !restaurant.restaurantContact && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Restaurant Contact!</span>}
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mx-auto">
                                            <div className="form-group">
                                                <input type="text" className="form-control form-control-lg" placeholder="Owner Name" name="ownerName" value={restaurant.ownerName} onChange={(e) => handleChange(e)}  />
                                                {errors && !restaurant.ownerName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter owner Name!</span>}
                                            </div>
                                            <div className="form-group">
                                                <input type="tel" className="form-control form-control-lg" pattern="[1-9]{1}[0-9]{9}" placeholder="Owner Contact" name="ownerContact" value={restaurant.ownerContact} onChange={(e) => handleChange(e)}  />
                                                {errors && !restaurant.ownerContact && <span className="invalid-input" style={{ color: 'red' }}>Please Enter owner Contact!</span>}
                                            </div>
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-lg" placeholder="Owner Email ID" name="ownerEmailID" value={restaurant.ownerEmailID} onChange={(e) => handleChange(e)}  />
                                                {errors && !restaurant.ownerEmailID && <span className="invalid-input" style={{ color: 'red' }}>Please Enter owner EmailID!</span>}
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-lg" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Owner Password"
                                                    name="ownerPassword" value={restaurant.ownerPassword} onChange={(e) => handleChange(e)}  />
                                                    {errors && !restaurant.ownerPassword && <span className="invalid-input" style={{ color: 'red' }}>Please Enter owner Password!</span>}
                                            </div>
                                            {/* <div className="form-group">
                                                <input type="file" className="form-control form-control-lg" placeholder="Restaurant Image"
                                                    name="restaurantImage" accept="image/*" onChange={(e) => handlephoto(e)} required />
                                            </div> */}
                                            
                                        </div>
                                        <div className='col'>
                                        <div className="file-card">
                                            <div className="file-inputs">
                                                {/* <input type="file" /> */}
                                                <input className="InputField form-control form-control-lg" type="file" placeholder="gstCertificate" name="gstCertificate" onChange={(e) => handlephoto(e)}  />
                                                <button className="dfds">
                                                
                                                    <i className="mdi mdi-plus menu-icon" />
                                                        {/* <FontAwesomeIcon icon={faPlus} /> */}
                                                    Upload
                                                </button>
                                            </div>
                                        </div>{errors && !restaurant.restaurantImage && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Restaurant Image!</span>}
                                        {/* <p style={{color:'red'}}>{ formErrors.gstCertificate}</p> */}
                                        {restaurant.restaurantImage &&
                                            <li className="file-item">
                                                <i className="mdi mdi-file" />
                                                {/* <FontAwesomeIcon className="iconcolor" icon={faFileAlt} /> */}
                                                <p className="ml-4">{restaurant.restaurantImage.name}</p>
                                            </li>}
                                    </div>
                                        <div className="mt-3">
                                            <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN UP</button>
                                        </div>
                                        <div className="mt-3"><center>
                                            <span style={{color:'orange',cursor:'pointer'}} onClick={handleNavigate}>If you have an account click here to login</span> 
                                            </center>
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