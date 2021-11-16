import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MenuList } from "./MenuList";
import "./Navbar.css";
import image from "../img/logo.png"
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const menuList = MenuList.map(({ url, title, style }, index) => {
    return (
      <li key={index}>
        <NavLink exact to={url} activeClassName="active">
          <i className={style}></i> {title}
        </NavLink>
      </li>
    );
  });

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <nav className="sticky-top">
      <div className="logo">
        <Link to="/" className="homepage">
          <img src={image} alt="img" className="mini-logo"/>
          POS <font>Restaurant</font>
        </Link>
      </div>
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "menu-list" : "menu-list close"}>{menuList}</ul>
    </nav>
  );
};

export default Navbar;
