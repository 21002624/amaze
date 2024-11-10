import React, { useState, useRef } from 'react';
import "./Header.css";
import logo from "../../assets/logo.png";
import search from "../../icons/search.svg";
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Header = ({ totalCount, SearchItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/'; 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      SearchItem(searchInputRef.current?.value);
    }
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
          {/* Back Arrow Icon (Mobile Only) */}
          {!isHomePage && (
            <div className="leftArrow" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
              <ArrowBackIcon />
            </div>
          )}

          <div className="searchContainer">
            <div className="inputWrapper">
              <input
                ref={searchInputRef}
                onKeyDown={handleSearchKeyDown}
                className="searchBar"
                type="text"
                placeholder="Search"
              />
              <img className="iconImg1" src={search} alt="Search Icon" />
            </div>
          </div>

          <div className="iconDiv">
            <Link to='/cart'>
              <div className="icon">
                <ShoppingCartOutlinedIcon />
                <p>Cart</p>
                {totalCount > 0 && <p className="cart-count">{totalCount}</p>}
              </div>
            </Link>
            <Link to='/wishlist'>
              <div className="icon">
                <FavoriteSharpIcon />
                <p>Wishlist</p>
              </div>
            </Link>
            
            <Link>
              {/* Menu Icon (Mobile Only) */}
              <div className='menuicon' onClick={toggleSidebar}>
                <MenuIcon />
              </div>
            </Link>

          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div>
          {isOpen && (
            <div className="closeIcon" onClick={toggleSidebar}>
              <CloseOutlinedIcon />
            </div>
          )}
          <div className="sidebarNav">
            <Link to="/products" onClick={toggleSidebar}><p>Mens</p></Link>
            <Link to="/womens" onClick={toggleSidebar}><p>Womens</p></Link>
            <Link to="/accessories" onClick={toggleSidebar}><p>Accessories</p></Link>
            <Link to="/appliances" onClick={toggleSidebar}><p>Appliances</p></Link>
          </div>
        </div>
        <div className='loginBtn'>
            <AccountCircleOutlinedIcon />
            <h4>Login</h4>
        </div>
      </div>
    </>
  );
};

export default Header;
