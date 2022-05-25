import React from "react";
import logo from "../../imgs/Vector.png";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <img className="logo" alt="" src={logo} />
      <p>Войти в систему</p>
    </div>
  );
};

export default Header;
