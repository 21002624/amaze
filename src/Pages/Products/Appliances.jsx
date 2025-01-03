import React, { useEffect, useState } from 'react';
import './Products.css';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import { renderStars, inr, name } from '../../Components/SimpleComponents/SimpleComponents';
import Checkbox from '@mui/material/Checkbox';

const Appliances = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const categoriesList = ['furniture', "home-decoration", "kitchen-accessories"];

    useEffect(() => {
        setLoading(true);

        const fetchProducts = selectedCategories.length
            ? Promise.all(
                selectedCategories.map((category) =>
                    fetch(`https://dummyjson.com/products/category/${category}`)
                        .then((response) => response.json())
                        .then((data) => data.products)
                )
              ).then((results) => results.flat()) 
            : fetch('https://dummyjson.com/products/category/kitchen-accessories') 
                .then((response) => response.json())
                .then((data) => data.products);

        fetchProducts
            .then((allProducts) => {
                setProducts(allProducts);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching', error);
                setLoading(false);
            });
    }, [selectedCategories]);

    const handleCategoryChange = (event) => {
        const { name, checked } = event.target;
        setSelectedCategories((prevCategories) =>
            checked ? [...prevCategories, name] : prevCategories.filter((cat) => cat !== name)
        );
    };

    const handleClear = () => {
        setSelectedCategories([]); 
    };

    const displayedItemCount = products.length; 
    if (loading) {
        return <div className='loading'><CircularProgress /></div>;
    }

    return (
        <div className="productsD">
            <div className="productFilters">
                <div className="appears">
                    <h4>Appearances : {displayedItemCount}</h4>
                </div>
                <div className="FilterClear">
                    <h4>Filter</h4>
                    <p onClick={handleClear}>Clear</p>
                </div>
                <div className="categoryDiv">
                    <ul>
                        {categoriesList.map((cat) => (
                            <li key={cat}>
                                <Checkbox
                                    checked={selectedCategories.includes(cat)}
                                    onChange={handleCategoryChange}
                                    name={cat}
                                />
                                {cat.replace('-', ' ').charAt(0).toUpperCase() + cat.replace('-', ' ').slice(1)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='productGrid'>
                <h2>Products</h2>
                <div className='grid'>
                    {products.map((product) => (
                        <Link to={`/ProductDetails/${product.id}`} key={product.id}>
                            <div className='productBox'>
                                <img src={product.thumbnail} alt={product.title} />
                                <p>{name(product.title)}</p>
                                <h2 className='productPercentageText'>{product.discountPercentage} % off</h2>
                                <p>Price: ₹ {inr(product.price)} <span>₹ {inr(product.discountPercentage)}</span></p>
                                <p>{renderStars(product.rating)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Appliances;
