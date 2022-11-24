import React from "react";

const Footer =(props)=>{
   console.log(props)
    return(
    <>
    <footer className="footer">
        <div className="d-sm-flex justify-content-center justify-content-sm-between">
          <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2018 <a href="https://www.urbanui.com/" target="_blank">{props.name}</a>. All rights reserved.</span>
        </div>
      </footer>
    </>
    );
}

export default Footer;