import React, { useState , useRef } from 'react';
import "./Header.css";
import logo from "../../assets/logo.png";
import cart from "../../icons/cart.png";
import heart from "../../icons/heart.svg";
import user from "../../icons/user.png";
import search from "../../icons/search.svg";
import { Link } from 'react-router-dom';
import menu from '../../icons/menu.png';
import close from '../../icons/close.png';
import NavigationIcon from '@mui/icons-material/Navigation';
import left from '../../icons/left-arrow.png';
import { useLocation, useNavigate } from 'react-router-dom';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Header = ({ totalCount ,SearchItem  }) => {
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
    <div className='Head'>
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

        {!isHomePage && (
          <div
            className="leftArrow"
            onClick={() => navigate(-1)} 
            style={{ cursor: 'pointer' }}
          >
            <img className="leftArrow" src={left} alt="Go back" />
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

            <img className="menuIcon" src={menu} alt="Menu" onClick={toggleSidebar} />
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div>
        {isOpen && (
          <div className="closeIcon" onClick={toggleSidebar}>
            <img className='iconImg' src={close} alt="Close" />
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
            <img className='iconImg' src={user} alt="Login Icon" />
            <h4>Login</h4>
        </div>
      </div>
    </div>
  );
};

export default Header;
