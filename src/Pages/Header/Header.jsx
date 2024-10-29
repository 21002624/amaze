import React, { useState } from 'react';
import "./Header.css";
import logo from "../../assets/logo.png";
import cart from "../../icons/cart.png";
import heart from "../../icons/heart.svg";
import user from "../../icons/user.svg";
import search from "../../icons/search.svg";
import { Link } from 'react-router-dom';

const Header = ({ totalCount }) => {


  return (
    <header>
      <div className="part1">
        {/* Logo Container */}
        <Link to='/'>
          <div className="logoDiv">
            <img className='logoImg' src={logo} alt="Logo" />
          </div>
        </Link>

        {/* Category Menu */}
        <div className="category">
        <Link to="/products">
            <h4>Mens</h4>
          </Link>
          <Link to="/womens">
            <h4>Womens</h4>
          </Link>
          <Link to="/accessories">
            <h4>Accessories</h4>
          </Link>
          <Link to="/appliances">
            <h4>appliances</h4>
          </Link>
        </div>
      </div>

      <div className="part2">
        <div className="searchContainer">
          <div className="inputWrapper">
            <input className="searchBar" type="text" placeholder="Search" />
            <img className="iconImg1" src={search} alt="Search Icon" />
          </div>
        </div>

        <div className="iconDiv">
          <Link to='/cart'>
            <div className="icon">
              <img className='iconImg' src={cart} alt="Cart Icon" />
              <p>Cart</p>
              {totalCount > 0 && <p className="cart-count">{totalCount}</p>}
            </div>
          </Link>
          <Link to='/wishlist'>
            <div className="icon">
              <img className='iconImg' src={heart} alt="Wishlist Icon" />
              <p>Wishlist</p>
            </div>
          </Link>
          <div className="icon">
            <img className='iconImg' src={user} alt="Login Icon" />
            <p>Login</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
