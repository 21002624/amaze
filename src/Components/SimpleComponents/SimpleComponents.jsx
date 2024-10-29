import star from '../../icons/empty-star.png';
import emptyStar from '../../icons/star.svg'; 
import './SimpleComponents.css';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const renderStars = (rating) => {
    const fullStars = Math.floor(rating); 
    const maxStars = 5;  
    const emptyStars = maxStars - fullStars; 

    return (
        <>
            {/* Render full stars */}
            {Array(fullStars).fill().map((_, index) => (
                <img className='starIcon' key={`full-${index}`} src={star} alt="full-star" style={{ width: '15px', height: '20px' }} />
            ))}

            {/* Render empty stars */}
            {Array(emptyStars).fill().map((_, index) => (
                <img className='starIcon' key={`empty-${index}`} src={emptyStar} alt="empty-star" style={{ width: '15px', height: '20px' }} />
            ))}

            {/* Show rating out of 5 */}
            {/* <p>{rating.toFixed(1)} out of {maxStars}</p> */}
        </>
    );
};



export const inr = (price) => {
    return (price * 84).toFixed(2);
};

export const name = (title) => {
    const words = title.split(' '); // Split the title into words
    return words.length > 2 ? `${words[0]}...` : title; // Return first word and ellipsis if more than one word
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
            onChange?.(newCount); // Notify parent if onChange callback is provided
            return newCount;
        });
    };
    const increaseCount = () => {
        setCount(prevCount => {
            const newCount = prevCount + 1;
            onChange?.(newCount); // Notify parent if onChange callback is provided
            return newCount;
        });
    };

    return (
        <div className="quantity-controls">
            <button onClick={decreaseCount}>
                <RemoveIcon /> 
            </button>
            <p>{count}</p>
            <button onClick={increaseCount}>
                <AddIcon /> 
            </button>
        </div>
    );
};

export { QuantityControls};

export const totalCount =()=>{
    
}
  