import './SimpleComponents.css';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Rating from '@mui/material/Rating';

export const renderStars = (rating, scrollToReviews) => {
    const fullStars = Math.floor(rating);

    return (
        <span onClick={scrollToReviews} style={{ cursor: 'pointer' }}>
            <Rating name="read-only" value={fullStars} readOnly  />
        </span>
    );
};



export const inr = (price) => {
    return (price * 84).toFixed(2);
};

export const name = (title) => {
    const words = title.split(' '); 
    return words.length > 2 ? `${words[0]}...` : title; 
};

export const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
    const discountPercentage = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return discountPercentage.toFixed(2) + '%';
};

export const freeShippingEligibility =(price)=>{
    if(price>500){
        return <div>
            <p>#1 Best seller</p>
            <p>Eligible for FREE Shipping</p>
        </div>
    }
    else{
        return <p>Not Eligible for FREE Shipping</p>
    }
}

const QuantityControls = ({ initialCount = 1, onChange }) => {
    const [count, setCount] = useState(initialCount);

    const decreaseCount = () => {
        setCount(prevCount => {
            const newCount = prevCount > 1 ? prevCount - 1 : prevCount;
            onChange?.(newCount); 
            return newCount;
        });
    };
    const increaseCount = () => {
        setCount(prevCount => {
            const newCount = prevCount + 1;
            onChange?.(newCount); 
            return newCount;
        });
    };

    return (
        <div className="quantity-controls">
            <button className="circleButton" onClick={decreaseCount}>
                <RemoveIcon /> 
            </button>
            <p>{count}</p>
            <button className="circleButton" onClick={increaseCount}>
                <AddIcon /> 
            </button>
        </div>
    );
};

export { QuantityControls};

export const totalCount =()=>{
    
}
  
export const BStyles = {
    backgroundColor: '#FFD700',
    color: 'black',
    '&:hover': {
      backgroundColor: '#ffdf28',
    },
    borderRadius: '300px',
    width: '250px',
    textTransform: 'none',
    height: '3rem',
    fontFamily : 'Josefin Sans',
  };