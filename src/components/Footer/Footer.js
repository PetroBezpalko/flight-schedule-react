import React from "react";
import "./footer.css";

function Footer() {
  return (
    <div id="footer">
      <p>
        Copyright &copy;
        {new Date().getFullYear()}
      </p>
    </div>
  );
}

export default Footer;
