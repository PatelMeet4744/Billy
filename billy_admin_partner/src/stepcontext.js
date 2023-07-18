import React, { useState } from 'react'
import App from './component/pages/partner/AttachDocument';
import axios from 'axios';

export const multiStepContext = React.createContext();
    
const StepContext = () => {
    const [currentStep, setStep] = useState(1);
    const [userData, setUserData] = useState([]);
    const [formErrors, setformErrors] = useState([]);
    const [Modayvalue, setModayvalue] = useState([]);
    const [Tuesdayvalue, setTuesdayvalue] = useState([]);
    const [Wednesdayvalue, setWednesdayvalue] = useState([]);
    const [Thursdayvalue, setThursdayvalue] = useState([]);
    const [Fridayvalue, setFridayvalue] = useState([]);
    const [Saturdayvalue, setSaturdayvalue] = useState([]);
    const [Sundayvalue, setSundayvalue] = useState([]);

    const [gstCertificate, setgstCertificate] = useState("");
    const [fssaiCertificate, setfssaiCertificate] = useState("");
    const [sampleBill, setsampleBill] = useState("");
    const [sampleMenu, setsampleMenu] = useState("");
    const [ownerPan, setownerPan] = useState("");

    const saySomething = (timevalue) => {
      let timeSplit = timevalue.split(':'),
        hours,
        minutes,
        meridian;
        hours = timeSplit[0];
        minutes = timeSplit[1];
        // console.log("The Somting value is",hours,"The minutes value", minutes);
        if (hours > 12) {
          meridian = 'PM';
          hours -= 12;
        } else if (hours < 12) {
          meridian = 'AM';
          if (hours == 0) {
            hours = 12;
          }
        } else {
          meridian = 'PM';
        }
        let value = hours + ':' + minutes + ' ' + meridian;
        // alert(value);
        // console.log(value);
        return value
    };
    
    const submitData = async (e) => 
    {
      // alert("Calling ")
      // console.log("Monday ", Modayvalue,"Tuesday ", Tuesdayvalue, "WenesDay ", Wednesdayvalue, "Thuesday ", Thursdayvalue, "Friday ", Fridayvalue, "Saturday ", Saturdayvalue,"Sunday ", Sundayvalue );
      // return console.log(gstCertificate);
      const formData = new FormData();
        formData.append('gstCertificate', gstCertificate );
        formData.append('fssaiCertificate', fssaiCertificate);
        formData.append('sampleBill', sampleBill);
        formData.append('sampleMenu', sampleMenu);
        formData.append('ownerPan', ownerPan);
        formData.append('monday', [saySomething(Modayvalue['Start']),saySomething(Modayvalue['End'])]);
        formData.append('tuesday', [saySomething(Tuesdayvalue['Start']),saySomething(Tuesdayvalue['End'])]);
        formData.append('wednesday', [saySomething(Wednesdayvalue['Start']),saySomething(Wednesdayvalue['End'])]);
        formData.append('thursday', [saySomething(Thursdayvalue['Start']),saySomething(Thursdayvalue['End'])]);
        formData.append('friday', [saySomething(Fridayvalue['Start']),saySomething(Fridayvalue['End'])]);
        formData.append('saturday', [saySomething(Saturdayvalue['Start']),saySomething(Saturdayvalue['End'])]);
        formData.append('sunday', [saySomething(Sundayvalue['Start']),saySomething(Sundayvalue['End'])]);
        formData.append('cuisines', userData['cuisines']);
        // console.log(saySomething(Modayvalue['Start']),saySomething(Modayvalue['End']));
        
        try {
        const config = {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          };
          // alert("Hello")
          const id = '6349962f5c743052cdee556b';
          const result = await axios.put(
              'http://localhost:4000/api/restaurant/attachdocument/6349962f5c743052cdee556b',
              formData, config
          );
          // alert(result)
          setStep(4)
          if(result.data.status === true){
            alert(result.data.data.message)
              // Swal.fire({
              //     position: 'top',
              //     icon: 'success',
              //     title: 'Restaurant Attach Documents ',
              //     text: result.data.data.message,
              //     showConfirmButton: false,
              //     timer: 2000
              // })
          }else{
              // Swal.fire({
              //     position: 'top',
              //     icon: 'info',
              //     title: 'Restaurant Attach Document Fail',
              //     text: result.data.data.message,
              // })
          }
        } catch (error) {
          alert(error.message);
          // Swal.fire({
          //     position: 'top',
          //     icon: 'info',
          //     title: 'Restaurant Attach Document Fail',
          //     text: error.message,
          // })
      }
     
       
    }
  return (
    <div>
       <multiStepContext.Provider value={{currentStep, setStep, userData, setUserData, formErrors, setformErrors, submitData,
        Modayvalue, setModayvalue,
        Tuesdayvalue, setTuesdayvalue,
        Wednesdayvalue, setWednesdayvalue,
        Thursdayvalue, setThursdayvalue,
        Fridayvalue, setFridayvalue,
        Saturdayvalue, setSaturdayvalue,
        Sundayvalue, setSundayvalue,
        gstCertificate, setgstCertificate,
        fssaiCertificate, setfssaiCertificate,
        sampleBill, setsampleBill,
        sampleMenu, setsampleMenu,
        ownerPan, setownerPan
       }}>
          <App />
       </multiStepContext.Provider>

    </div>
  )
}

export default StepContext;