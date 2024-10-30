import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import toast from 'react-hot-toast';
import ProductList from '../../Components/ProductList/ProductList';
import { renderStars, inr, QuantityControls } from '../../Components/SimpleComponents/SimpleComponents';
import Wishlist from '../../Components/SimpleComponents/WishList';
import Share from '../../Components/SimpleComponents/Share';
import PreviousVisited from '../PreviousVisited/PreviousVisited';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonMsg, setButtonMsg] = useState('Add to cart');
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
        
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === response.data.id);
        if (existingProduct) {
          setIsInCart(true);
          setCartQuantity(existingProduct.quantity);
        }
        
        saveVisitedProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [id]);

  const saveVisitedProduct = (productData) => {
    let visitedProducts = JSON.parse(localStorage.getItem('previousVisited')) || [];
    const isAlreadyVisited = visitedProducts.find(item => item.id === productData.id);

    if (!isAlreadyVisited) {
      visitedProducts.push(productData);
      if (visitedProducts.length > 5) visitedProducts.shift();
      localStorage.setItem('previousVisited', JSON.stringify(visitedProducts));
    }
  };

  const AddToCartFunction = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
      toast.success("Added to Cart");
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setIsInCart(true);
    setCartQuantity(existingProduct ? existingProduct.quantity + quantity : quantity);
    setButtonMsg('Added to Cart');
  };

  const proceedToPay = () => {
    const totalPrice = inr(product.price * quantity);
    const totalDiscount = inr(product.discountPercentage * product.price * quantity / 100);
    navigate('/pay', { state: { totalPrice, totalDiscount } });
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    if (isInCart && newQuantity !== cartQuantity) {
      setButtonMsg('Add to cart');
    }
  };

  if (loading) {
    return <div className='loading'><CircularProgress /></div>;
  }

  return (
    <div className="productdetailspage">
      <h5 className='productListNavTitle'>
        <Link to='/'>Home</Link> / {product.category} / {product.brand} / {product.title}
      </h5>
      
      <div className='productBox1'>
        {product ? (
          <div className='ProductDetails'>
            <div className='ProductDetailsLeft'>
              <img className='productDetailsImg' src={product.thumbnail} alt={product.title} />
              <div className="productlikeDiv">
                <Wishlist product={product} />
                <Share product={product} />
              </div>
            </div>

            <div className='ProductDetailsRight'>
              <h2>{product.title}</h2>
              <p>{renderStars(product.rating)} 2.7k rating</p>
              <div className="priceDiv">
                <p className='productPercentageText'>-{product.discountPercentage}% Off</p>
                <h2>₹ {inr(product.price)}</h2>
              </div>
              
              <p className='taxText'>inclusive of all taxes</p>
              <p>{product.description}</p>

              <QuantityControls 
                initialCount={1} 
                onChange={handleQuantityChange} 
              />

              <div className='addToCartDiv'>
                <Button onClick={AddToCartFunction} variant="contained" color="success" disabled={isInCart && quantity === cartQuantity}>
                  {isInCart && quantity === cartQuantity ? 'Added to Cart' : buttonMsg}
                </Button>
                <Button className="payBttn" color="secondary" onClick={proceedToPay}>
                  Proceed to Pay
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <p>Product not found.</p>
        )}

        <PreviousVisited /> 
        <ProductList cat={product?.category} />
      </div>
    </div>
  );
};

export default ProductDetails;
