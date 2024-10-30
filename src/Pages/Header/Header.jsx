import React, { useState } from 'react';
import "./Header.css";
import logo from "../../assets/logo.png";
import cart from "../../icons/cart.png";
import heart from "../../icons/heart.svg";
import user from "../../icons/user.svg";
import search from "../../icons/search.svg";
import { Link } from 'react-router-dom';
import menu from '../../icons/menu.png';
import close from '../../icons/close.png';
import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Header = ({ totalCount }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
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
            <Link to="/products"><h4>Mens</h4></Link>
            <Link to="/womens"><h4>Womens</h4></Link>
            <Link to="/accessories"><h4>Accessories</h4></Link>
            <Link to="/appliances"><h4>Appliances</h4></Link>
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
            {/* <div className="icon">
              <img className='iconImg' src={user} alt="Login Icon" />
              <p>Login</p>
            </div> */}
            {/* Menu Icon for Mobile */}
            <img className="menuIcon" src={menu} alt="Menu" onClick={toggleSidebar} />
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div>
          <div className="closeIcon" onClick={toggleSidebar}>
            <img className='iconImg' src={close} alt="Close" />
          </div>
          <div className="sidebarNav">
            <Link to="/products" onClick={toggleSidebar}><p>Mens</p></Link>
            <Link to="/womens" onClick={toggleSidebar}><p>Womens</p></Link>
            <Link to="/accessories" onClick={toggleSidebar}><p>Accessories</p></Link>
            <Link to="/appliances" onClick={toggleSidebar}><p>Appliances</p></Link>
          </div>
        </div>
        <div className='loginBtn'>
            <AccountCircle style={{ fontSize: 24 }} /> {/* Adjust size if needed */}
            <h4>Login</h4>
        </div>
      </div>
    </>
  );
};

export default Header;
