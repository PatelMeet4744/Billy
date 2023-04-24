import React from "react";
import { Navigate,Outlet } from "react-router-dom";

const PartnerPrivateComponent = () =>{
    const auth = sessionStorage.getItem('restaurant');
    return auth ? <Outlet /> : <Navigate to="/partner/login" />
}

export default PartnerPrivateComponent;