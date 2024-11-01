import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import './Search.css';
import { Link } from 'react-router-dom';
import { renderStars, inr, QuantityControls ,BStyles , name } from '../../Components/SimpleComponents/SimpleComponents';

const Search = () => {
    const location = useLocation();
    const { searchItem } = location.state || {}; 

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (searchItem) { 
            axios.get(`https://dummyjson.com/products/search?q=${searchItem}`)
                .then((response) => {
                    setProducts(response.data.products);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [searchItem]);

    if (loading) {
        return <div className='loading'> <CircularProgress /></div>;
    }
    

    return (
        <div className='SearchContainer'>
            <h2>Search Results for: {searchItem}</h2>
            <div className='searchResult'>
                {products.length > 0 ? (
                    products.map((product) => (
                        <Link to={`/ProductDetails/${product.id}`} key={product.id}>
                        <div className='searchResultList'>
                            <img src={product.thumbnail} alt={product.title} />
                            <p>{name(product.title)}</p>
                            <h2 className='productPercentageText' >{product.discountPercentage.toFixed(1)} % off</h2>
                            <p>Price: ₹ {inr(product.price)} <br/> <span>₹ {inr(product.discountPercentage)}</span>   </p>
                            <p>{renderStars(product.rating)}</p>
                        </div>
                        </Link>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default Search;
