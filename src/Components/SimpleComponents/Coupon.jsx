// Coupon.jsx
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import './SimpleComponents.css'

const Coupon = ({ applyDiscount }) => {
  const [couponCode, setCouponCode] = useState('');
  const [isApplied, setIsApplied] = useState(false);
  const [error, setError] = useState('');

  const handleApplyCoupon = () => {
    if (couponCode === 'FLAT300') {
      setIsApplied(true);
      setError('');
      applyDiscount(300); // Call function passed as prop with the discount value
    } else {
      setError('Invalid coupon code');
      setIsApplied(false);
    }
  };

  return (
    <div className='coup'>
      <div>
      <input
        type="text"
        className={`CouponInput ${error ? 'error' : ''}`} // Add error class if there's an error
        placeholder="Enter Coupon Code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        />

      <Button className='couponApply' variant="contained" color="error" onClick={handleApplyCoupon}>
        Apply
      </Button>
      </div>
      {error && <p className="errorText" style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Coupon;
