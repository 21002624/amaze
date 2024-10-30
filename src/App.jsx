import { useState, useEffect ,refresh } from 'react';
import './App.css';
import Header from './Pages/Header/Header';
import Home from './Pages/Home/Home';
import ProductList from './Components/ProductList/ProductList';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from './Pages/Footer/Footer';
import Cart from './Pages/Cart/Cart';
import Pay from './Pages/Pay/Pay';
import Products from './Pages/Products/Products';
import Womens from './Pages/Products/Womens';
import Accessories from './Pages/Products/Accessories';
import Appliances from './Pages/Products/Appliances';
import Wish from './Pages/WishList/Wish';
import MyChatBot from '../src/Pages/MyChatBot/MyChatBot';

function App() {
  const [cart, setCart] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
    const initialTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalCount(initialTotalCount);
  }, [refresh]);

  // Function to update cart and total count
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    const newTotalCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalCount(newTotalCount);
  };

  return (
    <BrowserRouter>
      <Header totalCount={totalCount} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/wishlist' element={<Wish />} />
        <Route path='/pay' element={<Pay />} />
        <Route path='/womens' element={<Womens />} />
        <Route path='/accessories' element={<Accessories />} />
        <Route path='/appliances' element={<Appliances />} />
        <Route path='/cart' element={<Cart cart={cart} updateCart={updateCart} />} />
        <Route path='/products/:category?' element={<Products />} />
        <Route path="/ProductDetails/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
      {/* <MyChatBot /> */}
    </BrowserRouter>
  );
}

export default App;
