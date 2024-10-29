import React, { useState } from 'react';

import { useLocation , useNavigate } from 'react-router-dom';
import './Pay.css';
import { Button } from '@mui/material';
import coupon from '../../icons/coupon.png';
import sale from '../../icons/sale.png'
import shield from '../../icons/shield-check.svg';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import PinCodeComponent from '../../Components/SimpleComponents/PinCodeComponent';
import Coupon from '../../Components/SimpleComponents/Coupon';

const Pay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalPrice, totalDiscount } = location.state || {};

  const [discount, setDiscount] = useState(0);

  const applyDiscount = (amount) => {
    setDiscount(amount);
  };


  return (
    <div className='pay'>
      <div className="payTimeLine">
        <div className="payImg">
          payImg
        </div>
        <div className="PayLine">
          <div className="address">
            <h4>BAG --------- </h4>
          </div>
          <div className="payment">
            <h4>PAYMENT---------</h4>
          </div>
          <div className="payment">
            <h4>PAYMENT</h4>
          </div>
        </div>
        <div className="paySecureImg">
          <img className='PayIcon' src={shield} />
          <h4>100% SECURE</h4>
        </div>
      </div>

      <div className="payBox">
        <div className="payLeft">
          <div className="enterPinCode">
            <p className='payText' >Check Delivery time & service</p>
              <PinCodeComponent />
          </div>
          <div className="avaliableOffer">
            <div>
              <img className='PayIcon' src={sale} />
              <h4>Avaliable Offer</h4>
            </div>
            <p className='payText'>10% Instant Discount on Kotak Mahindra Bank Credit and Debit Cards on a min spend of ₹3,500. TCA</p>
            <p className='productPercentageText'> Show More</p>
          </div>
          <div className="selectedItems">
            <div className="selectedItemCount">
              <div className="itemCountsInPay">
                selected items
              </div>
              <div className="itemCountsInPayRight">
                <p>remove</p>
              </div>
            </div>
            <div className="payItemsProductList">
            {cart && cart.length > 0 ? (
              cart.map((item) => (
                <div className="orderItem" key={item.id}>
                  <Link to={`/ProductDetails/${item.id}`} key={item.id}>
                    <img className='payItemImg' src={item.thumbnail} alt={item.title} />
                  </Link>
                  
                  <div>
                    <h4>{item.title}</h4>
                    <p>Price: ₹ {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    
                  </div>
                </div>
                    ))
                  ) : (
                    <p>No items in the cart</p>
                  )}
            </div>
          </div>
        </div>

        <div className="payRight">
          <div className="couponsDiv">
            <p>COUPAN</p>
            <div className='applyCounpons'>
                <div>
                  <img className='PayIcon' src={coupon} />
                  <p>apply coupons</p> 
                </div>
                <Coupon applyDiscount={applyDiscount} />
            </div>
            <div className="donateDiv">
              <div>
                <p className='payText'>use FLAT300 to get 300off on first order</p>
              </div>
              <p className='productPercentageText'>know more</p>
            </div>
            <div className="priceDetailsDiv">
              <div>
                <p className='payText'>Total MRP</p>
                <p>₹ {totalPrice}</p>
              </div>
              <div>
                <p className='payText'>Discount on MRP</p>
                <p className='taxText' >₹ {totalDiscount}</p>
              </div>
              <div>
                <p className='payText'>Coupon Discount</p>
                <p className='taxText'> ₹{totalPrice - discount}</p>
              </div>
              <div>
                <p className='payText'>Platform fee</p>
                <p className='taxText'>FREE</p>
              </div>
              <div>
                <p className='payText'>Shipping Fee</p>
                <p className='taxText'>FREE</p>
              </div>
              <div className="totalAmountDiv">
                <button >PLACE ORDER</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
