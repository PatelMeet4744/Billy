import React from 'react';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar1';
import Footer from './layout/Footer';
import Dashboard from './pages/partner/Dashbord';
import ChangePassword from './pages/partner/ChangePassword';
import UpdatePassword from './pages/partner/UpdatePassword';
import Banner from './pages/partner/Banner';
import ManageBanner from './pages/partner/ManageBanner';
import GetTocuh from './pages/partner/GetTocuh';
import Profile from './pages/partner/Profile';
import Setting from './pages/partner/Setting';
import Category from './pages/partner/Category';
import ItemAddedOn from './pages/partner/ItemAddedOn';
import ItemAddExtra from './pages/partner/ItemAddExtra';
import Variant from './pages/partner/Variant';
import ManageAddExtras from './pages/partner/ManageAddExtras';
import ManageAddons from './pages/partner/ManageAddons';
import ManageVariant from './pages/partner/ManageVariant';
import ManageCategory from './pages/partner/ManageCategory';
import Order from './pages/partner/Order';
import Item from './pages/partner/Item';

import '../App.css';

const PartnerMaster = (props) => {
    const urlname = props.name;
    const getstat = () =>{
    if (urlname === "dashboard") {
        return <Dashboard/>
    }
    if (urlname === "changepassword") {
        return <ChangePassword/>
    }
    if (urlname === "Banner"){
        return <Banner/>
    }
    if (urlname === "ManageBanner"){
        return <ManageBanner/>
    }
    if (urlname === "gettouch"){
        return <GetTocuh/>
    }
    if (urlname === "profile"){
        return <Profile/>
    }
    if (urlname === "setting"){
        return <Setting/>
    }
    if (urlname === "category"){
        return <Category/>
    }
    if (urlname === "ItemAddedOn"){
        return <ItemAddedOn/>
    }
    if (urlname === "ItemAddExtra")return <ItemAddExtra/>
    if (urlname === "Variant")return <Variant/>

    if (urlname === "ManageCategory")
    {return <ManageCategory/>}
    if (urlname === "ManageAddons")return <ManageAddons/>
    if (urlname === "ManageAddExtras")return <ManageAddExtras/>
    if (urlname === "ManageVariant")return <ManageVariant/>
    if (urlname === "order")return <Order/>
    if (urlname === "menu")return <Item/>
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