import { useState } from 'react';
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
// import 'bootstrap/dist/css/bootstrap.min.css';
import Products from './Pages/Products/Products';


function App() {
  const [count, setCount] = useState(0);


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pay' element={<Pay />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/products/:category?' element={<Products />} />
        <Route path="/ProductDetails/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
    
  );
}

export default App;
