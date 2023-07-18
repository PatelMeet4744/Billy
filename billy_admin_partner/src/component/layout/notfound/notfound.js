import React from "react";
import './pagenotfound.css'

const pageFound = () => {
    return (
        <div>
  <main id="boxes">
    <div id="divdsf">
      <h1>404!</h1>
    </div>
    <div id="column2">
    </div>
    <div id="column3">
      <img src="/assets/images/Billy_logo/BillyLogo.png" alt="Billy" width={140} height={50} style={{marginBottom: '-20px'}} />
      <pre id="pre">Sorry, this page{"\n"}isn't available!</pre>
      <button type="submit" name="submit" onclick="window.location.href = '/user/shop.aspx';">Go to home</button>
    </div>
  </main>   
</div>

    );
};

export default pageFound;