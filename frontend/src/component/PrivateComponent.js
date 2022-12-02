import React from "react";
import { Navigate,Outlet } from "react-router-dom";

const PrivateComponent = () =>{
    const auth = sessionStorage.getItem('admin');
    return auth ? <Outlet /> : <Navigate to="/admin/login" />
}

export default PrivateComponent;