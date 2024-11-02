import React, { useEffect, useState  } from 'react';
import { toast } from 'react-hot-toast';
import './Wish.css'; 
import { refresh } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';

const Wish = () => {
    const [wishlist, setWishlist] = useState([]);
    const [refresh, setRefresh] = useState(false); 

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(storedWishlist);
    }, [refresh]); 

    const handleRemoveFromWishlist = (productId) => {
        const updatedWishlist = wishlist.filter(item => item.id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        setWishlist(updatedWishlist);
        setRefresh(prev => !prev);
        toast.success("Item removed successfully");
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
                                <h4>{product.title}</h4>
                                <p>Price: ₹ {product.price}</p>
                                <Button
                                    className="bttn"
                                    variant="outlined"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleRemoveFromWishlist(product.id)}>
                                    Remove
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Wish;
