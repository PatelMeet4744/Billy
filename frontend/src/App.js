import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
//Import Partner Registration
import Registration from './component/pages/partner/Registration';
import AttachDocument from './component/pages/partner/AttachDocument';
import PageNotFound from './component/layout/notfound/notfound';
import AdminLogin from './component/pages/Login';
import Home from "./component/pages/Home";
import AdminMaster from "./component/AdminMaster";
import PartnerMaster from './component/PartnerMaster';
import PrivateComponent from "./component/PrivateComponent";
import PartnerPrivateComponent from './component/PartnerPrivateComponent'

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Resturant/Registration" element={<Registration/>}></Route>
      <Route path="/Resturant/AttachDocument" element={<AttachDocument/>}></Route>
      <Route path="*" element={<PageNotFound/>}/>
      <Route path="/admin/login" element={<AdminLogin name="Admin" />} />

      <Route path="/partner/login" element={<AdminLogin name=""/>} />

      <Route element={<PrivateComponent />}>
            <Route exact path="/admin/dashboard" element={<AdminMaster name="dashboard"/>} />
            <Route exact path="/admin/deliveryBoy" element={<AdminMaster name="deliveryBoy"/>} />
            <Route exact path="/admin/deliveryBoy/managedeliveryBoy" element={<AdminMaster name="managedeliveryBoy"/>} />
            <Route exact path="/admin/deliveryBoy/managedeliveryBoy/:id" element={<AdminMaster name="managedeliveryBoy"/>} />
            <Route exact path="/admin/getTouch" element={<AdminMaster name="getTocuh"/>} />
            <Route exact path="/admin/cuisines" element={<AdminMaster name="cuisines"/>} />
            <Route exact path="/admin/customer" element={<AdminMaster name="customer"/>} />
            <Route exact path="/admin/question" element={<AdminMaster name="question"/>} />
      </Route>

      <Route element={<PartnerPrivateComponent />}>
            <Route exact path="/Partner/dashboard" element={<PartnerMaster name="dashboard"/>} />
      </Route>
      </Routes>
      </Router> 
  );
}

export default App;
