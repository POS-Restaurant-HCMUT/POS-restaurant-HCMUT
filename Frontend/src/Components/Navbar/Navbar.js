import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MenuList } from "./MenuList";
import "./Navbar.css";
import image from "../img/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { AccountContext } from "../../context/accountContext";


const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const {account} = useContext(AccountContext)
  const {accountLogin} = useContext(AccountContext)
  const {logoutAccount} = useContext(AccountContext)
  const {userName, passWord} = account

  useEffect(() => {
    const json = localStorage.getItem("account");
    const saveAccount = JSON.parse(json);
    if (saveAccount) {
      accountLogin(saveAccount.userName, saveAccount.passWord);
    }
  },[]);

  useEffect(() => {
    const json = JSON.stringify(account);
    localStorage.setItem("account", json)
  }, [account]);

  if (userName !== '' && passWord !== '') {
    MenuList[MenuList.length - 1].title = '';
    MenuList[MenuList.length - 1].url = '/logout';
  }
  else {
    MenuList[MenuList.length - 1].title = 'Sign in';
    MenuList[MenuList.length - 1].url = '/demo';
  }

  const menuList = MenuList.map(({ url, title, style }, index) => {
    return (
      <li key={index}>
        { 
        <NavLink exact to={url} activeClassName="active" className={(userName !== '' && index === MenuList.length - 1) ? "hide-btn" : ""}>
          <i className={style}></i> {title}
        </NavLink>}
        {index === MenuList.length - 1 && <button className={userName !== '' ? "display-btn" : "hide-btn"} onClick={logoutAccount}>Logout</button>}
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
          <img src={image} alt="img" className="mini-logo" />
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
