import React, { useState, useEffect, useContext } from 'react'
import { Button} from '@material-ui/core';
import { multiStepContext } from '../../../stepcontext';
import Multiselect from 'multiselect-react-dropdown';

export default function ThirdStep() {

  const [Cuisines_Data, setCuisines_Data] = useState([]);

  useEffect(() => {
    const url = "http://localhost:4000/api/cuisines";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        let result_Output = json.data;
        setCuisines_Data(result_Output.map(value => ({
          cuisinesId: value.cuisinesId,
          cuisinesName: value.cuisinesName
        })))
        console.log(Cuisines_Data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  },[]);

  const handleCuisines = (e) => {
    const setdddata = e;
    // const commaSep = [setdddata.map(item => item.cuisinesId).join(', ')]
    // console.log("Comma seperated Cuisines ID",commaSep);
    // setattachDocument({ ...attachDocument, cuisines: setdddata.map(value => ({
    //   id: value.cuisinesId
    // })) })
    setUserData({ ...userData, "cuisines": [setdddata.map(item => item.cuisinesId).join(', ')] })
    // console.log("Cuisines Value", attachDocument.cuisines)
  }

  const { setStep, userData, setUserData, submitData } = useContext(multiStepContext);
  return (
    <div style={{backgroundColor:'red'}}> 
      {/* <div className="container-scroller" style={{height:'100%'}}> */}
        <div className="content-wrapper d-flex align-items-center auth">
          <div className="row w-100">
            <div className="col-lg-8 mx-auto">
              <div className="auth-form-light text-left p-5">
                {/* <div className="brand-logo text-center">
                  <img src="/assets/images/Billy_logo/BillyLogo.png" alt="logo" />
                </div> */}
                <form className="pt-3">
                    <div>
                      <Multiselect
                        displayValue="cuisinesName"
                        onKeyPressFn={function noRefCheck() { }}
                        onRemove={(e) => handleCuisines(e)}
                        onSelect={(e) => handleCuisines(e)}
                        onSearch={function noRefCheck() { }}
                        options={Cuisines_Data}
                        showArrow
                        allowSelectAll={true}
                        showCheckbox
                      />
                    </div><br></br>
                    <center>
                  <div>
                   
                  </div>
                </center>
                    <div className='row'>
                      <div className='col-6'>
                      <Button style={{ backgroundColor: 'black', color:'white' }} className="btn btn-block btn-lg" variant='contained' onClick={() => setStep(2)} color='secondary'>Back</Button><span></span>
                      </div>
                      <div className='col-6'>
                      <Button style={{ backgroundColor: '#f6881f', color:'white' }} className="btn btn-block btn-lg" variant='contained' onClick={()=>submitData()} color='primary'>Submit</Button>
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
    {/* </div> */}
    </div>
    )
}
