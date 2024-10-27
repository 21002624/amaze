import React, { useState } from 'react';
import './Home.css';
import img1 from '../../assets/1.jpg';
import img2 from '../../assets/2.jpg';
import img3 from '../../assets/3.jpg';
import g11 from '../../assets/g11.avif'
import g12 from '../../assets/g12.jpg';
import g13 from '../../assets/g13.png';
import g14 from '../../assets/g14.jpg';
import omg from '../../assets/omg.png';
import g21 from '../../assets/g21.jpg';
import g22 from '../../assets/g22.jpg';
import g23 from '../../assets/g23.jpg';
import g24 from '../../assets/g24.jpg';
import g31 from '../../assets/g31.jpg';
import g32 from '../../assets/g32.webp';
import g33 from '../../assets/g33.webp';
import g34 from '../../assets/g34.webp';
import ProductList from '../../Components/ProductList/ProductList';


const Home = () => {
  const images = [img1, img2, img3]; 

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <>
        {/* Slider function */}
        <div className="slider">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="slider-img" />

        <button className="left-arrow" onClick={handlePrev}>
            &#8249;
        </button>
        <button className="right-arrow" onClick={handleNext}>
            &#8250;
        </button>
        </div>

        {/* banner function */}
        <div className="banner">
            <div className="ban">
                <div className="bannerTitle">
                    <h2>Up to 70% off | Unlock outdoor<br/> adventure</h2>
                </div>
                <div className="bannerGrid">
                    <div className="bannerGrid1">
                        <div className="bannerItem">
                            <img className='bannerImg' src={g11} />
                            <p>iphone 11</p>
                        </div>
                        <div className="bannerItem">
                            <img className='bannerImg' src={g12} />
                            <p>iphone 11</p>
                        </div>
                    </div>
                    <div className="bannerGrid1">
                    <div className="bannerItem">
                            <img className='bannerImg' src={g13} />
                            <p>iphone 11</p>
                        </div>
                        <div className="bannerItem">
                            <img className='bannerImg' src={g14} />
                            <p>iphone 11</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ban">
                <div className="bannerTitle">
                    <h2>Minimum 50% off | Sports,<br/> outdoor & more</h2>
                </div>
                <div className="bannerGrid">
                    <div className="bannerGrid1">
                        <div className="bannerItem">
                            <img className='bannerImg' src={g21} />
                            <p>iphone 11</p>
                        </div>
                        <div className="bannerItem">
                            <img className='bannerImg' src={g22} />
                            <p>iphone 11</p>
                        </div>
                    </div>
                    <div className="bannerGrid1">
                    <div className="bannerItem">
                            <img className='bannerImg' src={g23} />
                            <p>iphone 11</p>
                        </div>
                        <div className="bannerItem">
                            <img className='bannerImg' src={g24} />
                            <p>iphone 11</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ban">
                <div className="bannerTitle">
                    <h2>Style & innovation from Small<br/> Businesses</h2>
                </div>
                <div className="bannerGrid">
                    <div className="bannerGrid1">
                        <div className="bannerItem">
                            <img className='bannerImg' src={g31} />
                            <p>iphone 11</p>
                        </div>
                        <div className="bannerItem">
                            <img className='bannerImg' src={g32} />
                            <p>iphone 11</p>
                        </div>
                    </div>
                    <div className="bannerGrid1">
                    <div className="bannerItem">
                            <img className='bannerImg' src={g33} />
                            <p>iphone 11</p>
                        </div>
                        <div className="bannerItem">
                            <img className='bannerImg' src={g34} />
                            <p>iphone 11</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Omg deals */}
        <div className="omgDeals">
            <img className='omgImg' src={omg} />
        </div>

        {/* ProductList */}
        <div className='listTitle'>
            <h1>Groceries</h1>
        </div>
            
            <ProductList cat="groceries" />
            <div className='listTitle'>
                <h1>Groceries</h1>
            </div>
            <ProductList cat="beauty" />

        
    </>
  );
};

export default Home;
