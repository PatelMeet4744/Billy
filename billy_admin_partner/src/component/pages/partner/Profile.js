import React from 'react';

const Profile = () => {
    return (
        <div class="row">
            <h4 class="grid_title ml10 ml15">Profile</h4>
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <form className="pt-3">
                            <div className="form-group">
                                <label for="exampleInputName1">Restaurant Name</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Restaurant Name" value={"Lapinos"} name="restaurantName"/>
                                {/* {errors && !question.questionName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Question!</span>} */}
                            </div>

                            <div className="form-group">
                                <label for="exampleInputName1">Restaurant Contact</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Restaurant Contact" value={"9879635128"} name="restaurantContact"/>
                                {/* {errors && !question.questionName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Question!</span>} */}
                            </div>
                            <label for="exampleInputName1">Restaurant Image</label>
                            <div className="file-card">
                                <div className="file-inputs">
                                    {/* <input type="file" /> */}
                                    <input className="InputField form-control form-control-lg" type="file" placeholder="cuisines Image" name="cuisinesImage" />
                                    <button className="dfds">

                                        <i className="mdi mdi-plus menu-icon" />
                                        {/* <FontAwesomeIcon icon={faPlus} /> */}
                                        Upload
                                    </button>
                                </div>
                            </div>
                                        <li className="file-item">
                                                <i className="mdi mdi-file" />
                                                {/* <FontAwesomeIcon className="iconcolor" icon={faFileAlt} /> */}
                                                <p className="ml-4">Image1.png</p>
                                            </li>
                            <div className="mt-3">
                                {/* <a type="submit" style={{color:'white'}} class="btn btn-primary mr-2" name="submit">Submit</a> */}
                                <button type="submit" style={{height:'40px'}} class="btn btn-primary mr-2" name="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;