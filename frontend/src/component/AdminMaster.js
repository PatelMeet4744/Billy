import React from 'react';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar1';
import Footer from './layout/Footer';
import '../App.css';

const AdminMaster = () => {
    return (
        <>
            <div className="container-scroller">
                <Header />
                <div className="container-fluid page-body-wrapper">
                    {<Sidebar />}
                    <div class="main-panel">
                        <div class="content-wrapper">
                            {/* <Sidebar> */}
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