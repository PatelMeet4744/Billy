import React, { useState } from 'react'
import axios from 'axios'
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

    const { restaurantName, restaurantAddress, restaurantCity, restaurantContact, ownerName, ownerContact, ownerEmailID, ownerPassword, restaurantImage } = restaurant;

    const onInputChange = (e) => {
        setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
    }

    const saveFile = (e) => {
        setRestaurant({ ...restaurant, restaurantImage: e.target.files[0] });
        alert(e.target.files[0].name)
      };

    const Insertion = async (e) => {
        alert(JSON.stringify(restaurant))

        try {
          const res = await axios.post(
            "http://localhost:4000/api/restaurant",
            restaurant
          );
          console.log(res);
        } catch (ex) {
          console.log(ex);
        }
      };


    return (
        <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex align-items-center auth">
                    <div className="row w-100">
                        <div className="col-lg-6 mx-auto">
                            <div className="auth-form-light text-left p-5">
                                <div className="brand-logo text-center">
                                    <img src="assets/images/logo.png" alt="logo" />
                                </div>
                                <div>
                                    <h4 className="font-weight-light" style={{ textAlign: 'center' }}>Partner</h4>
                                    <h6 className="font-weight-light" style={{ marginTop: 10 }}>Sign up to continue.</h6>
                                </div>
                                <form className="pt-3" onSubmit={Insertion}>
                                    <div className="row">
                                        <div className="col-lg-6 mx-auto">
                                            <div className="form-group">
                                                <input type="text" className="form-control form-control-lg" placeholder="Restaurant Name" name="restaurantName" value={restaurantName} onChange={(e) => onInputChange(e)} required />
                                            </div>
                                            <div className="form-group">
                                                <textarea className="form-control form-control-lg" placeholder="Restaurant Address" name="restaurantAddress" value={restaurantAddress} onChange={(e) => onInputChange(e)}></textarea>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control form-control-lg" placeholder="Restaurant City" name="restaurantCity" value={restaurantCity} onChange={(e) => onInputChange(e)} required readOnly />
                                            </div>
                                            <div className="form-group">
                                                <input type="tel" className="form-control form-control-lg" placeholder="Restaurant Contact" name="restaurantContact" value={restaurantContact} onChange={(e) => onInputChange(e)} required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mx-auto">
                                            <div className="form-group">
                                                <input type="text" className="form-control form-control-lg" placeholder="Owner Name" name="ownerName" value={ownerName} onChange={(e) => onInputChange(e)} required />
                                            </div>
                                            <div className="form-group">
                                                <input type="tel" className="form-control form-control-lg" placeholder="Owner Contact" name="ownerContact" value={ownerContact} onChange={(e) => onInputChange(e)} required />
                                            </div>
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-lg" placeholder="Owner Email ID" name="ownerEmailID" value={ownerEmailID} onChange={(e) => onInputChange(e)} required />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-lg" placeholder="Owner Password"
                                                    name="ownerPassword" value={ownerPassword} onChange={(e) => onInputChange(e)} required />
                                            </div>
                                            <div className="form-group">
                                                {/* <input type="file" className="form-control form-control-lg" placeholder="Restaurant Image"
                                                    name="restaurantImage" accept="image/*" value={restaurantImage} onChange={(e) => onInputFileChange(e)} required />
                                                     */}
                                                     <input type="file" onChange={saveFile} />
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



    )
}

export default Registration;