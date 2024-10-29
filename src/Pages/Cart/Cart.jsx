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

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
    
    const initialTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalCount(initialTotalCount);
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

  const removeItemFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotalCount(updatedCart);
    toast.success("Item removed");
  };

  const increaseCount = (id) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotalCount(updatedCart);
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
    navigate('/pay', { state: {cart, totalPrice, totalDiscount } });
  };

  return (
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
                  <p>
                    <button>{item.discountPercentage} off</button> On sale
                  </p>
                  <p>₹ {inr(item.price)}</p>
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
          <Button className="payBttn" color="secondary" onClick={proceedToPay}>
          Proceed to Pay
        </Button>
      </div>
    </div>
  );
};

export default Cart;
