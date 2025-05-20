import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import "../App.css";
import { ReactComponent as HomeIcon } from "../assets/logos/home.svg";
import { ReactComponent as CartIcon } from "../assets/logos/cart.svg";
import { ReactComponent as MenuIcon } from "../assets/logos/menu.svg";
import { ReactComponent as AccountIcon } from "../assets/logos/account.svg";

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <h1 className="drone-delights-header">Drone Delights</h1>
        </div>

        <div className="symbols">
          <Link to="/" className="home">
            <HomeIcon className="icon" />
          </Link>
          <Link to="/menu" className="menu">
            <MenuIcon className="icon" />
          </Link>
          <Link to="/cart" className="shopping-cart">
            <CartIcon className="icon" />
          </Link>
          <Link to="/account" className="account">
            <AccountIcon className="icon" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
