import React, { useEffect, useState ,us } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import toast from 'react-hot-toast';
import DeleteIcon from '@mui/icons-material/Delete';
import { renderStars, inr, name, calculateDiscountPercentage, freeShippingEligibility } from '../../Components/SimpleComponents/SimpleComponents';
import { Link } from 'react-router-dom';
import PreviousVisited from '../PreviousVisited/PreviousVisited';
import { BStyles } from '../../Components/SimpleComponents/SimpleComponents';
import badge from '../../icons/badge.png';

const Cart = ({ updateTotalCountInHeader }) => {
  const [cart, setCart] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
    const initialTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalCount(initialTotalCount);
    updateTotalCountInHeader(initialTotalCount);
  }, []);

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * 84 * item.quantity, 0).toFixed(2);
  };

  const updateTotalCount = (updatedCart) => {
    const newTotalCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalCount(newTotalCount);
  };

  const calculateTotalDiscount = () => {
    return cart.reduce((totalDiscount, item) => {
      const originalPrice = item.price * 84;
      const discountAmount = originalPrice * (item.discountPercentage / 100);
      return totalDiscount + discountAmount * item.quantity;
    }, 0).toFixed(2);
  };

  const updateCartAndTotalCount = (updatedCart) => {
    setCart(updatedCart);
    const newTotalCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalCount(newTotalCount);
    updateTotalCountInHeader(newTotalCount); // Sync with Header
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItemFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    updateCartAndTotalCount(updatedCart);
    toast.success("Item removed");
  };

  const increaseCount = (id) => {
    const updatedCart = cart.map(item => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    updateCartAndTotalCount(updatedCart);
  };

  const decreaseCount = (id) => {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotalCount(updatedCart);
  };

  const proceedToPay = () => {
    const totalPrice = calculateTotalPrice();
    const totalDiscount = calculateTotalDiscount();
    if(totalPrice == 0){
      toast.error("your cart is empty!");
    }
    else{
      navigate('/pay', { state: {cart, totalPrice, totalDiscount } });
    }
  };

  return (
    <>
    <div className="cartlayout">
      <div className="cart">
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <div className="cart-items">
            <div className="cartTitleDiv"> 
              <h1>Shopping Cart</h1>
              <p>Price</p>
            </div>
            {cart.map((item) => (
              <div className="cartItemDiv" key={item.id}>
                <div className="cart-item">
                  <Link to={`/ProductDetails/${item.id}`} key={item.id}>
                    <div className="cartImgDiv">
                      <img className="cartImg" src={item.thumbnail} alt={item.title} />
                    </div>
                  </Link>
                  <div className="cart-item-details">
                    <h4>{item.description}</h4>
                    {freeShippingEligibility(inr(item.price))}
                    <p className="smallRedText">{item.stock} stocks left</p>
                    <p>{item.title}</p>
                    <p className="taxText">inclusive of all taxes</p>
                    <Button
                      className="bttn"
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => removeItemFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="cartPriceDetails">
                <div className="badgeContainer" style={{ position: 'relative', display: 'inline-block' }}>
                  <img className="badgeIcon" src={badge} alt="badge" style={{ width: '50px', height: '50px' }} />
                  <p
                    style={{
                      position: 'absolute',
                      top: '30%',
                      left: '53%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.discountPercentage} off
                  </p>
                </div>

                  <h4>₹ {inr(item.price)}</h4>
                  <p>M.R.P : <span>₹{inr(item.discountPercentage)}</span></p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="cart-total">
        <h4 className="taxText">Your order is eligible for FREE Delivery.</h4>
        <p>Choose FREE Delivery option at checkout.</p>
        <p>Total Count in Cart: {totalCount}</p>
        <p>Subtotal ({totalCount} items): ₹ {calculateTotalPrice()}</p>
        <p>Total Discount: ₹ {calculateTotalDiscount()}</p>
          <Button className="payBttn" sx={BStyles} onClick={proceedToPay}>
          Proceed to Pay
        </Button>
      </div>
    </div>

    <PreviousVisited />
    
    </>
  );
};

export default Cart;
