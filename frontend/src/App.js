import { Routes, Route, BrowserRouter} from "react-router-dom";
import './App.css';
//Import Partner Registration
import Registration from './component/pages/partner/Registration';
import AttachDocument from './component/pages/partner/AttachDocument'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Home page</div>}/>
      <Route path="/Resturant/Registration" element={<Registration/>}></Route>
      <Route path="/Resturant/AttachDocument" element={<AttachDocument/>}></Route>
    </Routes>
    </BrowserRouter>  
  );
}

export default App;
