import React from 'react';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar1';
import Footer from './layout/Footer';
import Dashbord from './pages/Admin/Dashbord';
import DeliveryBoy from './pages/Admin/DeliveryBoy';
import ManageDeliveryBoy from './pages/Admin/ManageDeliveryBoy';
import GetTouch from './pages/Admin/GetTouch';
import Customer from './pages/Admin/customer';
import Question from './pages/Admin/Question';
import Cuisines from './pages/Admin/Cuisines';
import '../App.css';

const AdminMaster = (props) => {
    const urlname = props.name;
    const getstat = () =>{
    if (urlname === "dashboard") {
        return <Dashbord/>
    }
    if (urlname === "deliveryBoy"){
        return <DeliveryBoy/>
    }
    if (urlname === "managedeliveryBoy") return <ManageDeliveryBoy/>
    if (urlname === "getTocuh"){
        return <GetTouch/>
    }
    if (urlname === "customer"){
        return <Customer/>
    }
    if (urlname === "question")
    {
        return <Question/>
    }
    if (urlname === "cuisines"){
        return <Cuisines/>
    }
    }   
    return (
        <>
            <div className="container-scroller">
                <Header />
                <div className="container-fluid page-body-wrapper">
                    {<Sidebar />}
                    <div class="main-panel">
                        <div class="content-wrapper">
                            {/* <Sidebar> */}
                            {getstat()}
                            {/* </Sidebar> */}
                            {/* <Customer />                            
                            <AdminLogin/> */}
                            {/* <Routes>
                                <Route path={"/dashboard"} element={<Customer/>} />
                                <Route path={"/user"} element={<AdminLogin/>}/>
                             </Routes> */}
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminMaster;