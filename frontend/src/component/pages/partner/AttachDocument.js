import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Multiselect from 'multiselect-react-dropdown';

const AttachDocument = () => {

  const [Cuisines_Data,setCuisines_Data] = useState([]);

    const [attachDocument, setattachDocument] = useState({
      gstCertificate: "",
        fssaiCertificate: "",
        sampleBill: "Bardoli",
        sampleMenu: "",
        ownerPan: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
        cuisines:""
    });

    useEffect(() => {
      const url = "http://localhost:4000/api/cuisines";
  
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          let result_Output = json.data;
          setCuisines_Data(result_Output.map(value => ({
            cuisinesId:value.cuisinesId,
            cuisinesName:value.cuisinesName
          })))
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchData();
    }, []);

    

    const handleCuisines = (e) => {
      const setdddata = e;
      // const commaSep = [setdddata.map(item => item.cuisinesId).join(', ')]
      // console.log("Comma seperated Cuisines ID",commaSep);
      // setattachDocument({ ...attachDocument, cuisines: setdddata.map(value => ({
      //   id: value.cuisinesId
      // })) })
      setattachDocument({ ...attachDocument, cuisines: [setdddata.map(item => item.cuisinesId).join(', ')] })
      // console.log("Cuisines Value", attachDocument.cuisines)
    }

    const handleChange = (e) => {
      setattachDocument({ ...attachDocument, [e.target.name]: e.target.value });
  }

    const handlegstCertificate = (e) => {
        setattachDocument({ ...attachDocument, gstCertificate: e.target.files[0] })
    }
    
    const handlefssaiCertificate = (e) => {
        setattachDocument({ ...attachDocument, fssaiCertificate: e.target.files[0] })
    }

    const handlesampleBill = (e) => {
      setattachDocument({ ...attachDocument, sampleBill: e.target.files[0] })
    }
    const handlesampleMenu = (e) => {
      setattachDocument({ ...attachDocument, sampleMenu: e.target.files[0] })
    }
    const handleownerPan = (e) => {
      setattachDocument({ ...attachDocument, ownerPan: e.target.files[0] })
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.warn(attachDocument)
      const formData = new FormData();
        formData.append('gstCertificate', attachDocument.gstCertificate);
        formData.append('fssaiCertificate', attachDocument.fssaiCertificate);
        formData.append('sampleBill', attachDocument.sampleBill);
        formData.append('sampleMenu', attachDocument.sampleMenu);
        formData.append('ownerPan', attachDocument.ownerPan);
        formData.append('monday', attachDocument.monday);
        formData.append('tuesday', attachDocument.tuesday);
        formData.append('wednesday', attachDocument.wednesday);
        formData.append('thursday', attachDocument.thursday);
        formData.append('friday', attachDocument.friday);
        formData.append('saturday', attachDocument.saturday);
        formData.append('sunday', attachDocument.sunday);
        formData.append('cuisines', attachDocument.cuisines);
        // console.warn(formData)

        try {
          const config = {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          };
          const id = '6332bbdb02974ea60d2da3f2';
          const result = await axios.put(
              'http://localhost:4000/api/restaurant/attachdocument/6332bbdb02974ea60d2da3f2',
              formData, config
          );
          if(result.data.status === true){
              Swal.fire({
                  position: 'top',
                  icon: 'success',
                  title: 'Restaurant Attach Documents ',
                  text: result.data.data.message,
                  showConfirmButton: false,
                  timer: 2000
              })
          }else{
              Swal.fire({
                  position: 'top',
                  icon: 'info',
                  title: 'Restaurant Attach Document Fail',
                  text: result.data.data.message,
              })
          }
      } catch (error) {
          Swal.fire({
              position: 'top',
              icon: 'info',
              title: 'Restaurant Attach Document Fail',
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
            <h6 className="font-weight-light">Complete Your Profile</h6>
            <form className="pt-3"  onSubmit={handleSubmit}>
              <h3 className="font-weight-light">Document</h3>
              <div className="row">
                <div className="col-lg-6 mx-auto">
                  <center><label value="gstCertificate">gstCertificate</label></center>
                </div>
                <div className="col-lg-6 mx-auto">
                <input type="file" className="form-control form-control-lg" placeholder="gstCertificate pdf"
                name="gstCertificate" accept="application/pdf" onChange={(e) => handlegstCertificate(e)} required />
                </div>
                <br /><br /><br />
                <div className="col-lg-6 mx-auto">
                  <center><label value="fssaiCertificate">fssaiCertificate</label></center>
                </div>
                <div className="col-lg-6 mx-auto">
                <input type="file" className="form-control form-control-lg" placeholder="fssaiCertificate pdf"
                name="fssaiCertificate" accept="application/pdf" onChange={(e) => handlefssaiCertificate(e)} required />
                </div>
                <br /><br /><br />
                <div className="col-lg-6 mx-auto">
                  <center><label value="sampleBill">Sample Bill</label></center>
                </div>
                <div className="col-lg-6 mx-auto">
                <input type="file" className="form-control form-control-lg" placeholder="sampleBill pdf"
                name="sampleBill" accept="application/pdf" onChange={(e) => handlesampleBill(e)} required />
                </div>
                <br /><br /><br />
                <div className="col-lg-6 mx-auto">
                  <center><label value="sampleMenu">Sample Menu</label></center>
                </div>
                <div className="col-lg-6 mx-auto">
                <input type="file" className="form-control form-control-lg" placeholder="sampleMenu pdf"
                name="sampleMenu" accept="application/pdf" onChange={(e) => handlesampleMenu(e)} required />
                </div>
                <br /><br /><br />
                <div className="col-lg-6 mx-auto">
                  <center><label value="ownerPan">Owner Pancard</label></center>
                </div>
                <div className="col-lg-6 mx-auto">
                <input type="file" className="form-control form-control-lg" placeholder="ownerPan pdf"
                name="ownerPan" accept="application/pdf" onChange={(e) => handleownerPan(e)} required />
                </div>
              </div>
              <h3 className="font-weight-light" style={{marginTop: '2%'}}>Timing</h3>
              <div className="row">
                <div className="col-lg-6 mx-auto">
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Monday" name="monday" value={attachDocument.monday} onChange={(e) => handleChange(e)} required />
                  </div>
                </div>
                <div className="col-lg-6 mx-auto">
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Tuesday" name="tuesday" value={attachDocument.tuesday} onChange={(e) => handleChange(e)} required />
                  </div>
                </div>
                <div className="col-lg-6 mx-auto">
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Wednesday" name="wednesday" value={attachDocument.wednesday} onChange={(e) => handleChange(e)} required />
                  </div>
                </div>
                <div className="col-lg-6 mx-auto">
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Thursday" name="thursday" value={attachDocument.thursday} onChange={(e) => handleChange(e)} required />
                  </div>
                </div>
                <div className="col-lg-6 mx-auto">
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Friday" name="friday" value={attachDocument.friday} onChange={(e) => handleChange(e)} required />
                  </div>
                </div>
                <div className="col-lg-6 mx-auto">
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Saturday" name="saturday" value={attachDocument.saturday} onChange={(e) => handleChange(e)} required />
                  </div>
                </div>
                <div className="col-lg-6 mx-auto">
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Sunday" name="sunday" value={attachDocument.sunday} onChange={(e) => handleChange(e)} required />
                  </div>
                </div>
                <div className="col-lg-6 mx-auto">
                  {/* <select name="cuisines" className="form-control form-control-lg">
                    <option value="indian">Indian</option>
                    <option value="indian">American</option>
                    <option value="indian">SouthIndian</option>
                    <option value="indian">Opetional</option>
                  </select> */}
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
                </div>
              </div>
              <div className="mt-3">
              <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN UP</button>
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

export default AttachDocument;