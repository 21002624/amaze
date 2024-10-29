// Wishlist.js
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import likeIcon from '../../icons/like.svg'; // Default like icon
import redlove from '../../icons/redlove.png'; // Wishlist icon

const Wishlist = ({ product }) => {
    const [isWished, setIsWished] = useState(false);

    useEffect(() => {
        // Check if the product is already in the wishlist when the component mounts
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const existingProduct = wishlist.find(item => item.id === product.id);
        if (existingProduct) {
            setIsWished(true); // Set to true if product is already wished
        }
    }, [product.id]);

    const handleWishlistToggle = () => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const existingProduct = wishlist.find(item => item.id === product.id);

        if (existingProduct) {
            // Remove from wishlist
            const updatedWishlist = wishlist.filter(item => item.id !== product.id);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            toast.success('Removed from Wishlist');
        } else {
            // Add to wishlist
            wishlist.push(product);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            toast.success('Added to Wishlist');
        }

        setIsWished(!isWished); // Toggle the wishlist state
    };

    return (
        <img
            className='iconImg'
            src={isWished ? redlove : likeIcon} // Change icon based on isWished state
            alt="Add to Wishlist"
            onClick={handleWishlistToggle}
            style={{ cursor: 'pointer', opacity: 1 }} // Always fully opaque
        />
    );
};

export default Wishlist;
    