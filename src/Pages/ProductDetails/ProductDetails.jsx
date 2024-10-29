import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import toast from 'react-hot-toast';
import like from '../../icons/like.svg';
import share from '../../icons/share.svg';
import ProductList from '../../Components/ProductList/ProductList';
import { renderStars, inr, QuantityControls } from '../../Components/SimpleComponents/SimpleComponents';
import './ProductDetails.css';
import check from '../../icons/shield-check.svg';
import restock from '../../icons/restock.svg';
import cash from '../../icons/deposit.svg';
import free from '../../icons/free-delivery.svg';
import { useNavigate } from 'react-router-dom';
import Wishlist from '../../Components/SimpleComponents/WishList';
import Share from '../../Components/SimpleComponents/Share';

const ProductDetails = () => {
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonMsg, setButtonMsg] = useState('Add to cart');
  const [quantity, setQuantity] = useState(1); // Track quantity for AddToCart
  const [isInCart, setIsInCart] = useState(false); // Track if item is in cart
  const [cartQuantity, setCartQuantity] = useState(0); // Track quantity in cart
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
        // Check if the product is already in the cart
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === response.data.id);
        if (existingProduct) {
          setIsInCart(true);
          setCartQuantity(existingProduct.quantity); // Set quantity in cart
        }
      })
      .catch(error => {
        console.error('Error fetching', error);
        setLoading(false);
      });
  }, [id]);

  const AddToCartFunction = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity; // Update quantity if already in cart
    } else {
      cart.push({ ...product, quantity });
      toast.success("Added to Cart");
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setIsInCart(true); // Mark the item as added to the cart
    setCartQuantity(existingProduct ? existingProduct.quantity + quantity : quantity); // Update cart quantity
    setButtonMsg('Added to Cart');
  };

  const proceedToPay = () => {
    const totalPrice = inr(product.price);
    const totalDiscount = inr(product.price);
    navigate('/pay', { state: { totalPrice, totalDiscount } });
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    if (isInCart && newQuantity !== cartQuantity) {
      setButtonMsg('Add to cart'); // Show Add to Cart if quantity is changed
    }
  };

  if (loading) {
    return <div className='loading'><CircularProgress /></div>;
  }

  return (
    <div className="productdetailspage">
      <h5 className='productListNavTitle'>Home / Clothing / Men Clothing / Jeans/{product.category} / {product.brand}</h5>
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
                <h2> ₹ {inr(product.price)}</h2>
              </div>

              <p className='taxText'>inclusive of all taxes</p>
              <p>{product.description}</p>

              <QuantityControls 
                initialCount={1} 
                onChange={handleQuantityChange} // Update quantity when count changes
              />

              <div className='addToCartDiv'>
                <Button onClick={AddToCartFunction} variant="contained" color="success" disabled={isInCart && quantity === cartQuantity}>
                  {isInCart && quantity === cartQuantity ? 'Added to Cart' : buttonMsg}
                </Button>
                <Button className="payBttn" color="secondary" onClick={proceedToPay}>
                  Proceed to Pay
                </Button>
              </div>

              <div className="serviceDiv">
                <div className="serviceBox">
                  <img className='serviceiconImg' src={free} alt="Free Delivery" />
                  <p className='serviceText'>Free delivery</p>
                </div>
                <div className="serviceBox">
                  <img className='serviceiconImg' src={restock} alt="Restock Guarantee" />
                  <p className='serviceText'>Restock guarantee</p>
                </div>
                <div className="serviceBox">
                  <img className='serviceiconImg' src={cash} alt="Cash on Delivery" />
                  <p className='serviceText'>Cash on delivery</p>
                </div>
                <div className="serviceBox">
                  <img className='serviceiconImg' src={check} alt="Secure Payments" />
                  <p className='serviceText'>Secure payments</p>
                </div>
              </div>

              <div className="aboutproduct">
                <div>
                  <h4 className='productPercentageText'>Terms & Conditions</h4>
                  <p>{product.returnPolicy}</p>
                  <p>{product.warrantyInformation}</p>
                </div>
                <div>
                  <h4 className='productPercentageText'>Specifications</h4>
                  <p>{product.specifications}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Product not found.</p>
        )}
        <div className='ProductList'>
          <ProductList cat={product?.category} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
