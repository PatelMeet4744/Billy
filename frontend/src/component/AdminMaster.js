import React from 'react';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar1';
import Footer from './layout/Footer';
import Dashbord from './pages/Admin/Dashbord';
import '../App.css';

const AdminMaster = (props) => {
    const urlname = props.name;
    const getstat = () =>{
    if (urlname === "dashboard") {
        return <Dashbord/>
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