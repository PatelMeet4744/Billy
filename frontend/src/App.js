import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
//Import Partner Registration
import Registration from './component/pages/partner/Registration';
import AttachDocument from './component/pages/partner/AttachDocument';
import PageNotFound from './component/layout/notfound/notfound';
import AdminLogin from './component/pages/Login';
import Home from "./component/pages/Home";
import AdminMaster from "./component/AdminMaster";
import PrivateComponent from "./component/PrivateComponent";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Resturant/Registration" element={<Registration/>}></Route>
      <Route path="/Resturant/AttachDocument" element={<AttachDocument/>}></Route>
      <Route path="*" element={<PageNotFound/>}/>
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<PrivateComponent />}>
            <Route exact path="/admin/dashboard" element={<AdminMaster name="dashboard"/>} />
      </Route>
      </Routes>
      </Router> 
  );
}

export default App;
