import React from 'react'
// import { Button, TextField } from '@material-ui/core';
import { multiStepContext } from '../../../stepcontext';
import { useContext, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './fileupload.css'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'

export default function Firststep() {
    const { setStep,
        gstCertificate, setgstCertificate,
        fssaiCertificate, setfssaiCertificate,
        sampleBill, setsampleBill,
        sampleMenu, setsampleMenu,
        ownerPan, setownerPan, 
        formErrors, setformErrors} = useContext(multiStepContext);
    const [isSubmit,setisSubmit] = useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault();
        // setStep(2);
        if(!isSubmit)
        {
            setformErrors(validate);
        }
        console.log(isSubmit);
        console.log(formErrors);
        if(isSubmit){
             setStep(2);
        }
    }

    const validate = () => {
        const errors = {};
        if(gstCertificate && fssaiCertificate && sampleBill && sampleMenu && ownerPan)
        {
            setisSubmit("true");
            setStep(2);
        }
        if(!gstCertificate){
            errors.gstCertificate = "Gst Certificate is Required";
            // console.log("Gst Certificate is Required");
        }
        if(!fssaiCertificate){
            errors.fssaiCertificate = "Fssai Certificate is Required";
        }
        if(!sampleBill){
            errors.sampleBill = "Sample Bill Certificate is Required";
        }
        if(!sampleMenu){
            errors.sampleMenu = "Sample Menu Certificate is Required";
        }
        if(!ownerPan){
            errors.ownerPan = "Owner Pancard Certificate is Required";
        }
        setformErrors(errors);
        console.log("The Form Data",formErrors);
        return errors;
    }
    // useEffect(() => {
    //     if(Object.keys(formErrors).length === 0 && isSubmit){
    //         setStep(2);
    //     }
    // }, [formErrors]);

    // console.log("The selectedFile Value is",selectedFile.name)
    return (
        <div className="container-scroller">
            {/* <div className="container-fluid page-body-wrapper full-page-wrapper"> */}
            <div className="content-wrapper d-flex align-items-center auth">
                <div className="row w-100">
                    <div className="col-lg-8 mx-auto">
                        <div className="auth-form-light text-left p-5">
                            {/* <div className="brand-logo text-center">
                                <img src="/assets/images/Billy_logo/BillyLogo.png" alt="logo" />
                            </div> */}
                            <form className="pt-3" onSubmit={handleSubmit}>

                                <div className='row'>
                                    <div className='col'><label>GST Certificate</label>
                                        <div className="file-card">
                                            <div className="file-inputs">
                                                {/* <input type="file" /> */}
                                                <input className="InputField form-control form-control-lg" type="file" placeholder="gstCertificate" name="gstCertificate" onChange={(e) => setgstCertificate(e.target.files[0])} required />
                                                <button className="dfds">
                                                    <i>
                                                        <i className="mdi mdi-plus menu-icon" />
                                                        {/* <FontAwesomeIcon icon={faPlus} /> */}
                                                    </i>
                                                    Upload
                                                </button>
                                            </div>
                                        </div>
                                        <p style={{color:'red'}}>{ formErrors.gstCertificate}</p>
                                        {gstCertificate &&
                                            <li className="file-item">
                                                <i className="mdi mdi-file menu-icon iconcolor" />
                                                {/* <FontAwesomeIcon className="iconcolor" icon={faFileAlt} /> */}
                                                <p className="ml-4">{gstCertificate.name}</p>
                                            </li>}
                                    </div>
                                    <div className='col'><label> Fssai Certificate</label>
                                        <div className="file-card">
                                            <div className="file-inputs">
                                                {/* <input type="file" /> */}
                                                <input className="InputField form-control form-control-lg" type="file" placeholder="fssaiCertificate" name="fssaiCertificate" onChange={(e) => setfssaiCertificate(e.target.files[0])} required/>
                                                <button className="dfds">
                                                    <i>
                                                        {/* <FontAwesomeIcon icon={faPlus} /> */}
                                                    </i>
                                                    Upload
                                                </button>
                                            </div>
                                        </div>
                                        <p style={{color:'red'}}>{ formErrors.fssaiCertificate}</p>
                                        {fssaiCertificate &&
                                            <li className="file-item">
                                                {/* <FontAwesomeIcon className="iconcolor" icon={faFileAlt} /> */}
                                                <p className="ml-4">{fssaiCertificate.name}</p>
                                            </li>}
                                    </div>

                                </div>
                                <div className='row' style={{ marginTop: '10px' }}>
                                    <div className='col'><label>Sample Bill</label>
                                        <div className="file-card">
                                            <div className="file-inputs">
                                                {/* <input type="file" /> */}
                                                <input className="InputField form-control form-control-lg" type="file" placeholder="sampleBill" name="sampleBill" onChange={(e) => setsampleBill(e.target.files[0])}  />
                                                <button className="dfds">
                                                    <i>
                                                        {/* <FontAwesomeIcon icon={faPlus} /> */}
                                                    </i>
                                                    Upload
                                                </button>
                                            </div>
                                        </div>
                                        <p style={{color:'red'}}>{ formErrors.sampleBill}</p>
                                        {sampleBill &&
                                            <li className="file-item">
                                                {/* <FontAwesomeIcon className="iconcolor" icon={faFileAlt} /> */}
                                                <p className="ml-4">{sampleBill.name}</p>
                                            </li>}
                                    </div>
                                    <div className='col'><label>Sample Menu</label>
                                        <div className="file-card">
                                            <div className="file-inputs">
                                                {/* <input type="file" /> */}
                                                <input className="InputField form-control form-control-lg" type="file" placeholder="sampleMenu" name="sampleMenu" onChange={(e) => setsampleMenu(e.target.files[0])}  />
                                                <button className="dfds">
                                                    <i>
                                                        {/* <FontAwesomeIcon icon={faPlus} /> */}
                                                    </i>
                                                    Upload
                                                </button>
                                            </div>
                                        </div>
                                        <p style={{color:'red'}}>{ formErrors.sampleMenu}</p>
                                        {sampleMenu &&
                                            <li className="file-item">
                                                {/* <FontAwesomeIcon className="iconcolor" icon={faFileAlt} /> */}
                                                <p className="ml-4">{sampleMenu.name}</p>
                                            </li>}
                                    </div>

                                </div>

                                <div className='row'>
                                    <div className='col-6'><label>Owner Pancard</label>
                                        <div className="file-card">
                                            <div className="file-inputs">
                                                {/* <input type="file" /> */}
                                                <input className="InputField form-control form-control-lg" accept="application/pdf" type="file" placeholder="ownerPan" name="ownerPan" onChange={(e) => setownerPan(e.target.files[0])} />
                                                <button className="dfds">
                                                    <i>
                                                        {/* <FontAwesomeIcon icon={faPlus} /> */}
                                                    </i>
                                                    Upload
                                                </button>
                                            </div>
                                        </div>
                                        <p style={{color:'red'}}>{ formErrors.ownerPan}</p>
                                        {ownerPan &&
                                            <li className="file-item">
                                                {/* <FontAwesomeIcon className="iconcolor" icon={faFileAlt} /> */}
                                                <p className="ml-4">{ownerPan.name}</p>
                                            </li>}
                                    </div>
                                    <div className='col-6'></div>
                                </div>
                                {/* <div>
                                    <TextField label="First Name" value={userData['firstname']} onChange={(e) => setUserData({ ...userData, "firstname": e.target.value })} margin='normal' variant='outlined' color='secondary' />
                                </div>
                                <div>
                                    <TextField label="Last Name" value={userData['lastname']} onChange={(e) => setUserData({ ...userData, "lastname": e.target.value })} margin='normal' variant='outlined' color='secondary' />
                                </div>
                                <div>
                                    <TextField label="Contact" margin='normal' value={userData['contact']} onChange={(e) => setUserData({ ...userData, "contact": e.target.value })} variant='outlined' color='secondary' />
                                </div>
                                <div>
                                    <Button variant='contained' onClick={() => setStep(2)} color='primary'>Next</Button>
                                </div> */}
                                <div className="col-lg-12 mx-auto">

                                    {/* <div className="form-group">
                                        <label>gstCertificate</label>
                                        <input type="file" className="form-control form-control-lg" placeholder="gstCertificate" name="gstCertificate" onChange={(e) => setgstCertificate(e.target.files[0])} required />
                                        <span>{gstCertificate.name}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>fssaiCertificate</label>
                                        <input type="file" className="form-control form-control-lg" placeholder="fssaiCertificate" name="fssaiCertificate" onChange={(e) => setfssaiCertificate(e.target.files[0])} required />
                                        <span>{fssaiCertificate.name}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>sampleBill</label>
                                        <input type="file" className="form-control form-control-lg" placeholder="sampleBill" name="sampleBill" onChange={(e) => setsampleBill(e.target.files[0])} required />
                                        <span>{sampleBill.name}</span>
                                    </div> */}
                                    {/* <div className="form-group">
                                        <label>sampleMenu</label>
                                        <input type="file" className="form-control form-control-lg" placeholder="sampleMenu" name="sampleMenu" onChange={(e) => setsampleMenu(e.target.files[0])} required />
                                        <span>{sampleMenu.name}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>ownerPan</label>
                                        <input type="file" className="form-control form-control-lg" placeholder="ownerPan" name="ownerPan" onChange={(e) => setownerPan(e.target.files[0])} required />
                                        <span>{ownerPan.name}</span>
                                    </div> */}
                                    {/* <div className="form-group">
                                        <input type="text" className="form-control form-control-lg" placeholder="Last Name" name="lastname" value={userData['lastname']} onChange={(e) => setUserData({ ...userData, "lastname": e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <input type="tel" className="form-control form-control-lg" placeholder=" Contact" name="Contact" value={userData['contact']} onChange={(e) => setUserData({ ...userData, "contact": e.target.value })} required />
                                    </div> */}
                                    <div className="mt-3">
                                        <div className='row'>
                                        <div className='col-3'></div>
                                        <div className='col-6'><button style={{ backgroundColor: '#f6881f',color:'white' }} className="btn btn-block btn-lg" onClick={handleSubmit}>Next</button></div>
                                        <div className='col-3'></div>
                                        </div>
                                    </div>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </div>
            {/* content-wrapper ends */}
            {/* </div> */}
            {/* page-body-wrapper ends */}
        </div>
    )
}
