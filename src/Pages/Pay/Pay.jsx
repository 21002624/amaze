import React from 'react';
import { useLocation } from 'react-router-dom';

const Pay = () => {
  const location = useLocation();
  const { totalPrice , totalDiscount  } = location.state || {};

  return (
    <div>
      <h1>Payment Page</h1>
      <p>Total Price: ₹ {totalPrice}</p>
      <p>Total Discount: ₹ {totalDiscount}</p>
      {/* Additional payment logic here */}
    </div>
  );
};

export default Pay;
