import React from "react"
import { Link, Navigate, NavLink  } from "react-router-dom";
import '../../App.css'

const Sidebar = () => {

  const adminauth = sessionStorage.getItem('admin');

  const menuItem = [
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      icon: <i className="mdi mdi-view-quilt menu-icon" />
    },
    {
      path: "/admin/user",
      name: "User",
      icon: <i className="mdi mdi-view-headline menu-icon" />
    },
    {
      path: "/admin/analytics",
      name: "Analytics",
      icon: <i className="mdi mdi-view-headline menu-icon" />
    },
    {
      path: "/admin/comment",
      name: "Comment",
      icon: <i className="mdi mdi-view-headline menu-icon" />
    },
    {
      path: "/product",
      name: "Product",
      icon: <i className="mdi mdi-view-headline menu-icon" />
    },
    {
      path: "/productList",
      name: "Product List",
      icon: <i className="mdi mdi-view-headline menu-icon" />
    }
  ]

  // let urlElements = window.location.href.split('/');
  return (
    <>
      {/* partial:partials/_sidebar.html */}
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          {adminauth ? (
            <>
              {
                menuItem.map((item, index) => (
                  <li className="nav-item">
                  <NavLink to={item.path} key={index} className="nav-link">
                           <div className="icon">{item.icon}</div>
                           <div style={{}} className="link_text menu-title">{item.name}</div>
                       </NavLink>
</li>
                ))
        }


              {/* <li className="nav-item">
                <Link to="/admin/user" className="nav-link">
                  <i className="mdi mdi-view-quilt menu-icon" />
                  <span className="menu-title">User</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/admin/deliveryBoy" class="nav-link">
                  <i class="mdi mdi-view-headline menu-icon"></i>
                  <span class="menu-title">DeliveryBoy</span>
                </Link>
              </li> */}
            </>
          ) : (
            <></>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;