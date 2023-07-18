import React,{ useState } from 'react'
// import { Button, TextField } from '@material-ui/core';
import { multiStepContext } from '../../../stepcontext';
import { useContext } from 'react';

export default function SecondStep() {
  const {formErrors, setformErrors, setStep, Modayvalue, setModayvalue, Tuesdayvalue, setTuesdayvalue, Wednesdayvalue, setWednesdayvalue, Thursdayvalue, setThursdayvalue, Fridayvalue, setFridayvalue, Saturdayvalue, setSaturdayvalue, Sundayvalue, setSundayvalue } = useContext(multiStepContext);

  const [isSubmit,setisSubmit] = useState(false);
  const handleMondaystart = (e) => {
    setModayvalue({ ...Modayvalue, "Start": e.target.value });
  }
  const handleMondayend = (e) => {
    setModayvalue({ ...Modayvalue, "End": e.target.value });
  }

  const handleTuesdaystart = (e) => {
    setTuesdayvalue({ ...Tuesdayvalue, "Start": e.target.value });
  }
  const handleTuesdayend = (e) => {
    setTuesdayvalue({ ...Tuesdayvalue, "End": e.target.value });
  }

  const handleWednesdaystart = (e) => {
    setWednesdayvalue({ ...Wednesdayvalue, "Start": e.target.value });
  }
  const handleWednesdayend = (e) => {
    setWednesdayvalue({ ...Wednesdayvalue, "End": e.target.value });
  }

  const handleThursdaystart = (e) => {
    setThursdayvalue({ ...Thursdayvalue, "Start": e.target.value });
  }
  const handleThursdayend = (e) => {
    setThursdayvalue({ ...Thursdayvalue, "End": e.target.value });
  }

  const handleFridaystart = (e) => {
    setFridayvalue({ ...Fridayvalue, "Start": e.target.value });
  }
  const handleFridayend = (e) => {
    setFridayvalue({ ...Fridayvalue, "End": e.target.value });
  }

  const handleSaturdaystart = (e) => {
    setSaturdayvalue({ ...Saturdayvalue, "Start": e.target.value });
  }
  const handleSaturdayend = (e) => {
    setSaturdayvalue({ ...Saturdayvalue, "End": e.target.value });
  }

  const handleSundaystart = (e) => {
    setSundayvalue({ ...Sundayvalue, "Start": e.target.value });
  }
  const handleSundayend = (e) => {
    setSundayvalue({ ...Sundayvalue, "End": e.target.value });
  }

  const validate = () => {
    const errors = {};
    console.log("Monday Value");
    if(Modayvalue['End'] && Modayvalue['Start'] && Tuesdayvalue['Start'] && Tuesdayvalue['End'] && Wednesdayvalue['Start'] && Wednesdayvalue['End']
    && Thursdayvalue['Start'] && Thursdayvalue['End'] && Fridayvalue['Start'] && Fridayvalue['End'] && 
    Saturdayvalue['Start'] && Saturdayvalue['End'] && Sundayvalue['Start'] && Sundayvalue['End'])
    {
        // alert("Call")
        setisSubmit("true");
        setStep(3);
    }
    if(!Modayvalue['End'] || !Modayvalue['Start']){
        errors.Monday = "Monday Time is Required";
    }
    if(!Tuesdayvalue['Start'] || !Tuesdayvalue['End'])
    {
      errors.Tuesday = "Tuesday Time is Required";
    }
    if(!Wednesdayvalue['Start'] || !Wednesdayvalue['End']){
        errors.Wednesday = "Wednesday Time is Required";
    }
    if(!Thursdayvalue['Start'] || !Thursdayvalue['End']){
        errors.Thursday = "Thuesday Time is Required";
    }
    if(!Fridayvalue['Start'] || !Fridayvalue['End']){
        errors.Friday = "Friday Time is Required";
    }
    if(!Saturdayvalue['Start'] || !Saturdayvalue['End']){
      errors.Saturday = "Saturday Time is Required";
    }
    if(!Sundayvalue['Start'] || !Sundayvalue['End']){
      errors.Sunday = "Sunday Time is Required";
    }
    setformErrors(errors);
    console.log("The Form Data",errors.Monday);
    return errors;
}

const handleSubmit = (e) =>{
  e.preventDefault();
  // setStep(2);
  // console.log("Submited")
  setformErrors(validate);
  if(!isSubmit)
  {
      
  }
  // console.log(isSubmit);
  // console.log(formErrors);
  if(isSubmit){
       setStep(2);
  }
}

  return (
    <div className="container-scroller">
      <div className="content-wrapper d-flex align-items-center auth">
        <div className="row w-100">
          <div className="col-lg-8 mx-auto">
            <div className="auth-form-light text-left pl-5 pr-5 pt-4 pb-5">
              {/* <div className="brand-logo text-center"> */}
                {/* <img src="/assets/images/Billy_logo/BillyLogo.png" alt="logo" /> */}
              {/* </div> */}
              <form className="pt-3" onSubmit={handleSubmit}>
                <div className="form-group">

                  <div className="row">
                    <div className="col mr-4" style={{ border: "solid 1px #cbd5e0" }}>
                      <label value="Start Time"><b>Moday</b></label>
                      <div className="row">
                        <div className="col">
                          <label>Start:</label>
                          <input className="form-control" type="time" style={{ border: 'solid 2px #f6881f',height:'50%' }} value={Modayvalue['Start']} onChange={(e) => handleMondaystart(e)} /></div>
                        <div className="col">
                          <label>End:</label>
                          <input className="form-control" type="time" style={{ border: 'solid 2px #f6881f',height:'50%'  }} value={Modayvalue['End']} onChange={(e) => handleMondayend(e)} />
                        </div>
                      </div>
                      <p style={{color:'red'}}>{ formErrors.Monday}</p>
                    </div>
                    <div className="col" style={{ border: "solid 1px #cbd5e0" }}>
                      <label value="Start Time"><b>Tuesday</b></label>
                      <div className="row">
                        <div className="col">
                          <label>Start:</label>
                          <input className="form-control" type="time" style={{ border: 'solid 2px #f6881f',height:'50%'  }} value={Tuesdayvalue['Start']} onChange={(e) => handleTuesdaystart(e)} /></div>
                        <div className="col">
                          <label>End:</label>
                          <input className="form-control" type="time" style={{ border: 'solid 2px #f6881f',height:'50%'  }} value={Tuesdayvalue['End']} onChange={(e) => handleTuesdayend(e)} />
                        </div>
                      </div>
                      <p style={{color:'red'}}>{ formErrors.Tuesday}</p>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col mr-4" style={{ border: "solid 1px #cbd5e0" }}>
                      <label value="Start Time"><b>Wednesday</b></label>
                      <div className="row">
                        <div className="col">
                          <label>Start:</label>
                          <input className="form-control" type="time" style={{ border: 'solid 2px #f6881f',height:'50%'  }} value={Wednesdayvalue['Start']} onChange={(e) => handleWednesdaystart(e)} /></div>
                        <div className="col">
                          <label>End:</label>
                          <input className="form-control" type="time" style={{ border: 'solid 2px #f6881f',height:'50%'  }} value={Wednesdayvalue['End']} onChange={(e) => handleWednesdayend(e)} />
                        </div>
                      </div>
                      <p style={{color:'red'}}>{ formErrors.Wednesday}</p>
                    </div>
                    <div className="col" style={{ border: "solid 1px #cbd5e0" }}>
                      <label value="Start Time"><b>Thursday</b></label>
                      <div className="row">
                        <div className="col">
                          <label>Start:</label>
                          <input className="form-control" type="time" style={{ border: 'solid 2px #f6881f',height:'50%'  }} value={Thursdayvalue['Start']} onChange={(e) => handleThursdaystart(e)} /></div>
                        <div className="col">
                          <label>End:</label>
                          <input className="form-control" type="time" style={{ border: 'solid 2px #f6881f',height:'50%'  }} value={Thursdayvalue['End']} onChange={(e) => handleThursdayend(e)} />
                        </div>
                      </div>
                      <p style={{color:'red'}}>{ formErrors.Thursday}</p>
                    </div>                    
                  </div>

                  <div className="row mt-4">
                    <div className="col mr-4" style={{ border: "solid 1px #cbd5e0" }}>
                      <label value="Start Time"><b>Friday</b></label>
                      <div className="row">
                        <div className="col">
                          <label>Start:</label>
                          <input className="form-control" type="time" style={{ border: 'solid 2px #f6881f',height:'50%'  }} value={Fridayvalue['Start']} onChange={(e) => handleFridaystart(e)} /></div>
                        <div className="col">
                          <label>End:</label>
                          <input className="form-control" type="time" style={{ border: 'solid 2px #f6881f',height:'50%'  }} value={Fridayvalue['End']} onChange={(e) => handleFridayend(e)} />
                        </div>
                      </div>
                      <p style={{color:'red'}}>{ formErrors.Friday}</p>
                    </div>
                    <div className="col" style={{ border: "solid 1px #cbd5e0" }}>
                      <label value="Start Time"><b>Saturday</b></label>
                      <div className="row">
                        <div className="col">
                          <label>Start:</label>
                          <input className="form-control" type="time" style={{ border: 'solid 2px #f6881f',height:'50%'  }} value={Saturdayvalue['Start']} onChange={(e) => handleSaturdaystart(e)} /></div>
                        <div className="col">
                          <label>End:</label>
                          <input className="form-control" type="time" style={{ border: 'solid 2px #f6881f',height:'50%'  }} value={Saturdayvalue['End']} onChange={(e) => handleSaturdayend(e)} />
                        </div>
                      </div>
                      <p style={{color:'red'}}>{ formErrors.Saturday}</p>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col mr-4" style={{ border: "solid 1px #cbd5e0" }}>
                      <label value="Start Time"><b>Sunday</b></label>
                      <div className="row">
                        <div className="col">
                          <label>Start:</label>
                          <input className="form-control" type="time" style={{ border: 'solid 2px #f6881f',height:'50%'  }} value={Sundayvalue['Start']} onChange={(e) => handleSundaystart(e)} /></div>
                        <div className="col">
                          <label>End:</label>
                          <input className="form-control" type="time" style={{ border: 'solid 2px #f6881f',height:'50%'  }} value={Sundayvalue['End']} onChange={(e) => handleSundayend(e)} />
                        </div>
                      </div>
                      <p style={{color:'red'}}>{ formErrors.Sunday}</p>
                    </div>
                    <div className="col"></div>
                  </div>
                </div>
                <center>
                  <div>
                    <div className='row'>
                      <div className='col-6'>
                        <button style={{ backgroundColor: 'black', color:'white' }} className="btn btn-block btn-lg" onClick={() => setStep(1)}>Back</button>
                      </div>
                      <div className='col-6'>
                        <button style={{ backgroundColor: '#f6881f', color:'white' }} className="btn btn-block btn-lg">Next</button>
                      </div>
                    </div>
                  </div>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
