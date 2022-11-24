import React from "react";
import { Link, useNavigate } from 'react-router-dom';

function Header(){
  
  const adminauth = sessionStorage.getItem('admin');
  let navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    if(adminauth)
    {
      navigate('/admin/login');
    }
}
  return(
    <>
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
    <div className="navbar-menu-wrapper d-flex align-items-stretch justify-content-between">
      <ul className="navbar-nav mr-lg-2 d-none d-lg-flex">
        {/* <li className="nav-item nav-toggler-item">
          <button className="navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span className="mdi mdi-menu" />
          </button>
        </li> */}
      </ul>
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a className="navbar-brand brand-logo" href="index.html"><img src="/assets/images/logo.png" alt="logo" /></a>
        <a className="navbar-brand brand-logo-mini" href="index.html"><img src="/assets/images/logo.png" alt="logo" /></a>
      </div>
      <ul className="navbar-nav navbar-nav-right">
        <li className="nav-item nav-profile dropdown">
          <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
            {/* <span className="nav-profile-name">{JSON.parse(adminauth).adminName}</span> */}
          </a>
          <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
            <div className="dropdown-divider" />
            <a className="dropdown-item" onClick={logout}>
              <i className="mdi mdi-logout text-primary" />
              Logout
            </a>
          </div>
        </li>
        {/* <li className="nav-item nav-toggler-item-right d-lg-none">
          <button className="navbar-toggler align-self-center" type="button" data-toggle="offcanvas">
            <span className="mdi mdi-menu" />
          </button>
        </li> */}
      </ul>
    </div>
  </nav>
    </>
    );
}

export default Header;