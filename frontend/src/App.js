import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
//Import Partner Registration
import Registration from './component/pages/partner/Registration';
import AttachDocument from './component/pages/partner/AttachDocument';
import PageNotFound from './component/layout/notfound/notfound';
import AdminLogin from './component/pages/Login';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<div>Home page</div>}/>
      <Route path="/Resturant/Registration" element={<Registration/>}></Route>
      <Route path="/Resturant/AttachDocument" element={<AttachDocument/>}></Route>
      <Route path="*" element={<PageNotFound/>}/>
      <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
      </Router> 
  );
}

export default App;
