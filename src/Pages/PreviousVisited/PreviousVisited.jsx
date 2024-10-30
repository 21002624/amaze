import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PreviousVisited.css';

const PreviousVisited = () => {
  const [visitedProducts, setVisitedProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('previousVisited')) || [];
    setVisitedProducts(storedProducts);
  }, []);
  
  const name = (title) => {
    const words = title.split(' '); 
    return words.length > 2 ? `${words[0]}...` : title; 
};


  return (
    <div className="previousVisitedContainer">
      <h4>Previously Visited Products</h4>
      <div className="previousVisitedList">
        {visitedProducts.length > 0 ? (
          visitedProducts.map((product) => (
            <Link to={`/ProductDetails/${product.id}`} key={product.id} className="visitedProduct">
              <img src={product.thumbnail} alt={product.title} />
              <p>{name(product.title)}</p>
            </Link>
          ))
        ) : (
          <p>No products visited yet.</p>
        )}
      </div>
    </div>
  );
};

export default PreviousVisited;
