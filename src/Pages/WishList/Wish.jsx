// Wish.js
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import './Wish.css'; // Import your styles if needed

const Wish = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        // Retrieve the wishlist from localStorage
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(storedWishlist);
    }, []);

    const handleRemoveFromWishlist = (productId) => {
        const updatedWishlist = wishlist.filter(item => item.id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        setWishlist(updatedWishlist);
        toast.success('Removed from Wishlist');
    };

    return (
        <div className="wishContainer">
            <h2>Your Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>No items in your wishlist.</p>
            ) : (
                <ul>
                    {wishlist.map(product => (
                        <li key={product.id} className="wishItem">
                            <img className='wishImg' src={product.thumbnail} alt={product.title} />
                            <div className="wishItemDetails">
                                <h3>{product.title}</h3>
                                <p>Price: ₹ {product.price}</p>
                                <button onClick={() => handleRemoveFromWishlist(product.id)}>
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Wish;
