import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'; 
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Wishlist = ({ product }) => {
    const [isWished, setIsWished] = useState(false);

    useEffect(() => {
        // Reset `isWished` when the product changes
        setIsWished(false);
        
        // Check if the new product is already in the wishlist
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const existingProduct = wishlist.find(item => item.id === product.id);
        if (existingProduct) {
            setIsWished(true); // Set to true if product is already wished
        }
    }, [product]); // Dependency array includes `product` to run whenever it changes

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
        <IconButton onClick={handleWishlistToggle} color="default">
            <FavoriteIcon style={{ color: isWished ? 'red' : 'gray' }} />
        </IconButton>
    );
};

export default Wishlist;
