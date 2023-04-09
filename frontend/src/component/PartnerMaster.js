import React from 'react';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar1';
import Footer from './layout/Footer';
import Dashboard from './pages/partner/Dashbord';

import '../App.css';

const PartnerMaster = (props) => {
    const urlname = props.name;
    const getstat = () =>{
    if (urlname === "dashboard") {
        return <Dashboard/>
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
                            {getstat()}
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PartnerMaster;