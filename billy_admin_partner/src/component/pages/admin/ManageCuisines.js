import React, { useState, useEffect } from 'react';
import { json, useNavigate } from "react-router-dom";
import { NEW_CUISINES_RESET } from "../../../constants/cuisinesConstants";
import { clearErrors, createcuisines } from "../../../actions/cuisinesAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import { Component } from 'react';
import axios from 'axios';

const ManageCuisines = ({ history }) => {

    const [cuisinesName, setCuisinesName] = useState("");
    const [cuisinesImage, setCuisinesImage] = useState("");
    const [old_cuisinesImage, setOld_cuisinesImage] = useState("");
    const [cuisinesDescription, setCuisinesDescription] = useState("");
    const [cuisinesBanner, setCuisinesBanner] = useState("");
    const [old_cuisinesBanner, setOld_cuisinesBanner] = useState("");

    const [errors, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cuisines, loading, error, success } = useSelector((state) => state.newCuisines);
    const params = useParams();
    const id = params.id;

    const getsingleCuisines = async () => {
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const { data } = await axios.get(`http://localhost:4000/api/cuisines/${id}`, '', '');
        setCuisinesName(data.data.cuisinesName);
        setCuisinesDescription(data.data.cuisinesDescription);
        setOld_cuisinesImage(data.data.cuisinesImage);
        setOld_cuisinesBanner(data.data.cuisinesBanner);
        setCuisinesImage(data.data.cuisinesImage);
        setCuisinesBanner(data.data.cuisinesBanner);

    }

    useEffect(() => {
        if(params.id){
        let id = params.id;
            getsingleCuisines();   
        }

        // if(isUpdated){
        //     swal({
        //         title: "DeliveryBoy",
        //         text: "The DeliveryBoy Updated Successfully",
        //         icon: "info"
        //       });
        //     navigate('/admin/deliveryBoy');
        //     dispatch({type: UPDATE_DELIVERYBOY_RESET});
        // }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert("Cuisines Created Successfully");
            navigate('/admin/cuisines')
            dispatch({ type: NEW_CUISINES_RESET });
        }
    }, [dispatch, alert, error, history, success]);

    const handlephoto = (e) => {
        // if(e.target.files[0].name.split('.').pop() == "png")
        setCuisinesImage(e.target.files[0]);
    }

    const handlebanner = (e) => {
        // if(e.target.files[0].name.split('.').pop() == "png")
        setCuisinesBanner(e.target.files[0]);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cuisinesName || !cuisinesDescription || !cuisinesImage || !cuisinesBanner) {
            setError(true);
            return false;
        }
        const formData = new FormData();
        formData.append('cuisinesName', cuisinesName);
        formData.append('cuisinesImage', cuisinesImage);
        formData.append('cuisinesDescription', cuisinesDescription);
        formData.append('cuisinesBanner', cuisinesBanner);
        if(params.id){
            formData.append('old_cuisinesImage', old_cuisinesImage);
            formData.append('old_cuisinesBanner', old_cuisinesBanner);
        }

        if (params.id){
            const cuisinesId = params.id
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                const result = await axios.put(
                    `http://localhost:4000/api/cuisines/${cuisinesId}`,
                    formData, config
                );
                // return alert(JSON.stringify(result));
                if(result.data.message === "Success")
                {
                    swal({
                        position: 'top',
                        icon: 'success',
                        title: 'Cuisine Update',
                        text: "Cuisines Updated Successfully",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    navigate('/admin/cuisines');
                }else{
                    swal({
                        position: 'top',
                        icon: 'info',
                        title: 'Cuisines Added Fail',
                        text: result.data.data.message,
                    })
                }
            } catch (error) {
                swal({
                    position: 'top',
                    icon: 'info',
                    title: 'Cusines Added Fail',
                    text: error.message,
                })
            }
        }else{
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            const result = await axios.post(
                "http://localhost:4000/api/cuisines",
                formData, config
            );
        
            if(result.data.message === "Success")
            {
                swal({
                    position: 'top',
                    icon: 'success',
                    title: 'Cuisine Added',
                    text: "Cuisines Added Successfully",
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate('/admin/cuisines');
            }else{
                swal({
                    position: 'top',
                    icon: 'info',
                    title: 'Cuisines Added Fail',
                    text: result.data.data.message,
                })
            }
        } catch (error) {
            swal({
                position: 'top',
                icon: 'info',
                title: 'Cusines Added Fail',
                text: error.message,
            })
        }
    }
        // dispatch(createcuisines(formData));
        // // }   
    }

    return (
        <div class="row">
            <h4 class="grid_title ml10 ml15">Manage Cuisine</h4>
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <form className="pt-3" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label for="exampleInputName1">Name</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Cuisine Name" name="cuisinesName" value={cuisinesName} onChange={(e) => setCuisinesName(e.target.value)} />
                                {errors && !cuisinesName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Name!</span>}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputMobilel3" required>Description</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Cuisine Description" name="cuisinesDescription" value={cuisinesDescription} onChange={(e) => setCuisinesDescription(e.target.value)} />
                                {errors && !cuisinesDescription && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Description!</span>}
                            </div>
                            <label for="exampleInputName1">Cuisine Image</label>
                            <div className="file-card">
                                <div className="file-inputs">
                                    {/* <input type="file" /> */}
                                    <input className="InputField form-control form-control-lg" type="file" placeholder="cuisines Image" name="cuisinesImage" onChange={(e) => handlephoto(e)} />
                                    <button className="dfds">

                                        <i className="mdi mdi-plus menu-icon" />
                                        {/* <FontAwesomeIcon icon={faPlus} /> */}
                                        Upload
                                    </button>
                                </div>
                            </div>
                            {errors && !cuisinesImage && <div><span className="invalid-input" style={{ color: 'red' }}>Please Select Image!</span><br></br></div>}
                            {cuisinesImage &&
                                <li className="file-item">
                                    <i className="mdi mdi-file" />
                                    {/* <FontAwesomeIcon className="iconcolor" icon={faFileAlt} /> */}
                                    <p className="ml-4">{params.id ? old_cuisinesImage : cuisinesImage.name}</p>
                                </li>}
                            <label for="exampleInputName1">Cuisine Banner</label>
                            <div className="file-card">
                                <div className="file-inputs">
                                    {/* <input type="file" /> */}
                                    <input className="InputField form-control form-control-lg" type="file" placeholder="cuisines Banner" name="cuisinesBanner" onChange={(e) => handlebanner(e)} />
                                    <button className="dfds">

                                        <i className="mdi mdi-plus menu-icon" />
                                        {/* <FontAwesomeIcon icon={faPlus} /> */}
                                        Upload
                                    </button>
                                </div>
                            </div>
                            {errors && !cuisinesBanner && <div><span className="invalid-input" style={{ color: 'red' }}>Please Select Banner!</span><br></br></div>}
                            {cuisinesBanner &&
                                <li className="file-item">
                                    <i className="mdi mdi-file" />
                                    <p className="ml-4">{params.id ? old_cuisinesBanner : cuisinesBanner.name}</p>
                                </li>}
                            <div className="mt-3">
                                <button type="submit" style={{ height: '40px' }} class="btn btn-primary mr-2" name="submit">Submit</button>
                                {/* <a type="submit" style={{color:'white'}} class="btn btn-primary mr-2" name="submit">Submit</a> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ManageCuisines;