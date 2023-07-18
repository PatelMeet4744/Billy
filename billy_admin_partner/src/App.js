// import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateComponent from './component/PrivateComponent';
import PartnerPrivateComponent from './component/PartnerPrivateComponent'
import AdminLogin from './component/pages/admin/Login';
import PartnerLogin from './component/pages/partner/Login'
import PageNotFound from './component/layout/notfound/notfound';
import AdminMaster from './component/AdminMaster';
import PartnerMaster from './component/PartnerMaster';
import Table from './component/Table';
import Registration from './component/pages/partner/Registration';
import Home from './component/pages/Home';
import AttachDocument from './component/pages/partner/AttachDocument';
import ResetPassword from './component/pages/partner/ResetPassword';
import ForgotPassword from './component/pages/partner/ForgotPassword'

function App() {
  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Resturant/Registration" element={<Registration/>}></Route>
          <Route path="/Resturant/AttachDocument" element={<AttachDocument/>}></Route>

          <Route element={<PrivateComponent />}>
            <Route exact path="/admin/dashboard" element={<AdminMaster name="dashboard"/>} />
            <Route exact path="/admin/user" element={<AdminMaster name="user"/>} />
            <Route exact path="/admin/deliveryBoy" element={<AdminMaster name="deliveryBoy"/>} />
            <Route exact path="/admin/deliveryBoy/managedeliveryBoy" element={<AdminMaster name="managedeliveryBoy"/>} />
            <Route exact path="/admin/deliveryBoy/managedeliveryBoy/:id" element={<AdminMaster name="managedeliveryBoy"/>} />
            <Route exact path="/admin/cuisines" element={<AdminMaster name="cuisines"/>} />
            <Route exact path="/admin/getTouch" element={<AdminMaster name="getTocuh"/>} />
            <Route exact path="/admin/question" element={<AdminMaster name="question"/>} />
            <Route exact path="/admin/restaurant" element={<AdminMaster name="restaurant"/>} />
            <Route exact path="/admin/referralamount" element={<AdminMaster name="referralamount"/>} />
            <Route exact path="/admin/table" element={<AdminMaster name="table"/>} />
            <Route exact path="/admin/order" element={<AdminMaster name="order"/>} />
            <Route exact path="/admin/item" element={<AdminMaster name="item"/>} />
            <Route exact path="/admin/item/itemDetail/:id" element={<AdminMaster name="itemdetail"/>} />
            <Route exact path="/admin/question/managequestion" element={<AdminMaster name="managequestion"/>} />
            <Route exact path="/admin/question/managequestion/:id" element={<AdminMaster name="managequestion"/>} />
            <Route exact path="/admin/cuisines/managecuisines" element={<AdminMaster name="managecuisines"/>} />
            <Route exact path="/admin/cuisines/managecuisines/:id" element={<AdminMaster name="managecuisines"/>} />
            <Route exact path="/admin/complain" element={<AdminMaster name="complain"/>} />
            <Route exact path="/admin/restaurant/managerestaurant/:id" element={<AdminMaster name="managerestaurant"/>} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/partner/login" element={<PartnerLogin />} />

          <Route element={<PartnerPrivateComponent />}>
            <Route exact path="/Partner/dashboard" element={<PartnerMaster name="dashboard"/>} />
            <Route exact path="/Partner/ChangePassword" element={<PartnerMaster name="changepassword"/>} />
            <Route exact path="/Partner/Banner" element={<PartnerMaster name="Banner"/>} />
            <Route exact path="/Partner/Banner/ManageBanner" element={<PartnerMaster name="ManageBanner"/>} />
            {/* <Route exact path="/Partner/Banner/ManageBanner/:id" element={<PartnerMaster name="ManageBanner"/>} /> */}
            <Route exact path="/Partner/Gettouch" element={<PartnerMaster name="gettouch"/>} />
            <Route exact path="/Partner/Profile" element={<PartnerMaster name="profile"/>} />
            <Route exact path="/Partner/Setting" element={<PartnerMaster name="setting"/>} />
            <Route exact path="/Partner/Category" element={<PartnerMaster name="category"/>} />
            <Route exact path="/Partner/Addons" element={<PartnerMaster name="ItemAddedOn"/>} />
            <Route exact path="/Partner/AddExtras" element={<PartnerMaster name="ItemAddExtra"/>} />
            <Route exact path="/Partner/order" element={<PartnerMaster name="order"/>} />
            <Route exact path="/Partner/Variant" element={<PartnerMaster name="Variant"/>} />
            <Route exact path="/Partner/Category/ManageCategory" element={<PartnerMaster name="ManageCategory"/>} />
            <Route exact path="/Partner/Addons/ManageAddons" element={<PartnerMaster name="ManageAddons"/>} />
            <Route exact path="/Partner/AddExtras/ManageAddExtra" element={<PartnerMaster name="ManageAddExtras"/>} />
            <Route exact path="/Partner/Variant/ManageVariant" element={<PartnerMaster name="ManageVariant"/>} />
            <Route exact path="/Partner/menu" element={<PartnerMaster name="menu"/>} />
             </Route>
          
          <Route exact path="/partner/password/reset/:Id/:token" element={<ResetPassword/>} />
          <Route exact path="/partner/forgotpassword" element={<ForgotPassword/>} />
          
          <Route path='*' element={<PageNotFound/>}/>
          <Route exact path="/admin/user" element={<AdminMaster name="user"/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
