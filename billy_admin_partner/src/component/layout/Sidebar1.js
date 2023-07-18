import React, { Children, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import Header from './Header';
import { ArrowBackIosOutlined,ArrowForwardIosOutlined} from '@material-ui/icons';

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const adminauth = sessionStorage.getItem('admin');

    useEffect(() =>{
        // const adminauth = sessionStorage.getItem('admin');
        // const partnerauth = sessionStorage.getItem('restaurant');
    }, []);
        const menuItem=[
            {
                path:"/admin/dashboard",
                name:"Dashboard",
                icon:<i className="mdi mdi-view-quilt menu-icon" />
            },
            {
                path:"/admin/order",
                name:"Orders",
                icon:<i className="mdi mdi-food menu-icon" />
            },
            {
                path:"/admin/restaurant",
                name:"Restaurant",
                icon:<i className="mdi mdi-silverware-variant" />
            },
            {
                path:"/admin/item",
                name:"Items",
                icon:<i className="mdi mdi-food menu-icon" />
            },
            {
                path:"/admin/user",
                name:"Customer",
                icon:<i className="mdi mdi-account menu-icon" />
            },{
                path:"/admin/cuisines",
                name:"Cuisines",
                icon:<i className="mdi mdi-view-headline menu-icon" />
            },
            {
                path:"/admin/deliveryBoy",
                name:"DeliveryBoy",
                icon:<i className="mdi mdi-truck-delivery menu-icon" />
            },
            {
                path:"/admin/getTouch",
                name:"GetTouch",
                icon:<i className="mdi mdi-headset" />
            },
            {
                path:"/admin/question",
                name:"Question",
                icon:<i className="mdi mdi-file-question" />
            },
            {
                path:"/admin/referralamount",
                name:"referralamount",
                icon:<i className="mdi mdi-plus menu-icon" />
            },
            {
                path:"/admin/complain",
                name:"Complain",
                icon:<i className="mdi mdi-phone" />
            }
        ]   
        
        const partnermenuItem=[
            {
                path:"/partner/order",
                name:"Order",
                icon:<i className="mdi mdi-view-quilt menu-icon" />
            },
            {
                path:"/partner/menu",
                name:"Menu",
                icon:<i className="mdi mdi-food menu-icon" />
            },
            {
                path:"/partner/Category",
                name:"Category",
                icon:<i className="mdi mdi-sort-variant" />
            },
            {
                path:"/partner/Addons",
                name:"Addons",
                icon:<i className="mdi mdi-silverware-variant" />
            },
            {
                path:"/partner/AddExtras",
                name:"AddExtras",
                icon:<i className="mdi mdi-silverware" />
            },
            {
                path:"/partner/Variant",
                name:"Variant",
                icon:<i className="mdi mdi mdi-server" />
            },
            {
                path:"/Partner/Gettouch",
                name:"Help",
                icon:<i className="mdi mdi-headset menu-icon" />
            },
            {
                path:"/partner/Profile",
                name:"Profile",
                icon:<i className="mdi mdi-account menu-icon" />
            },
            {
                path:"/partner/Banner",
                name:"Banner",
                icon:<i className="mdi mdi-image" />
            },
            {
                path:"/partner/Setting",
                name:"Setting",
                icon:<i className="mdi mdi mdi-settings" />
            },
        ]   
  return (
    <div className="containerfsf">
        <div>
        </div>
           <div style={{width: isOpen ? "230px" : "60px"}} className="sidebarown">
               <div className="top_section">
                   {/* <h1 style={{display: isOpen ? "block" : "none"}} className="logo"></h1> */}
                   <div style={{marginLeft: isOpen ? "214px" : "39px"}} className="bars">
                       {isOpen ? <ArrowBackIosOutlined onClick={toggle}/> : <ArrowForwardIosOutlined onClick={toggle}/>
                        }
                   </div>
               </div>
               {
                    adminauth ? (
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon" style={{fontSize:'20px'}}>{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text menu-title">{item.name}</div>
                       </NavLink>
                   ))
                   ) : 
                   (
                    partnermenuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon" style={{fontSize:'20px'}}>{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text menu-title">{item.name}</div>
                       </NavLink>
                   ))
                   )
               }
           </div>
           {/* <main>{children}</main> */}
        </div>  
  )
}

export default Sidebar;