import React, { useState } from 'react';
import './Home.css';
import img1 from '../../assets/1.jpg';
import img2 from '../../assets/2.jpg';
import img3 from '../../assets/3.jpg';
import g11 from '../../assets/b1.png'
import g12 from '../../assets/b2.png';
import g13 from '../../assets/b3.png';
import g14 from '../../assets/b4.png';
import omg from '../../assets/omg.png';
import g21 from '../../assets/s1.png';
import g22 from '../../assets/s2.png';
import g23 from '../../assets/s3.png';
import g24 from '../../assets/s4.png';
import g31 from '../../assets/p1.png';
import g32 from '../../assets/p2.png';
import g33 from '../../assets/p3.png';
import g34 from '../../assets/p4.png';
import ProductList from '../../Components/ProductList/ProductList';
import { Link } from 'react-router-dom';


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
    <div className='home'>
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
                    <h2 className='h2Style'>Glow Up Deals! Get 50% off <br></br>beauty essentials </h2>
                </div>
                <div className="bannerGrid">
                    <div className="bannerGrid1">
                        <div className="bannerItem">
                        <Link to={`/ProductDetails/1`} >
                            <img className='bannerImg' src={g11} />
                            <p>Mascara</p>
                        </Link>
                        </div>
                        <div className="bannerItem">
                        <Link to={`/ProductDetails/2`} >
                            <img className='bannerImg' src={g12} />
                            <p>Eyeshadow</p>
                        </Link>
                        </div>
                    </div>
                    <div className="bannerGrid1">
                    <div className="bannerItem">
                        <Link to={`/ProductDetails/3`} >
                            <img className='bannerImg' src={g13} />
                            <p>Canister</p>
                        </Link>
                        </div>
                        <div className="bannerItem">
                        <Link to={`/ProductDetails/4`} >
                            <img className='bannerImg' src={g14} />
                            <p>Lipstick</p>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ban">
                <div className="bannerTitle">
                    <h2  className='h2Style'>Minimum 50% off | Sports,<br/> outdoor & more</h2>
                </div>
                <div className="bannerGrid">
                    <div className="bannerGrid1">
                        <div className="bannerItem">
                        <Link to={`/ProductDetails/88`} >
                            <img className='bannerImg' src={g21} />
                            <p>Nike Air</p>
                        </Link>
                        </div>
                        <div className="bannerItem">
                        <Link to={`/ProductDetails/89`} >
                            <img className='bannerImg' src={g22} />
                            <p>Nike Baseball</p>
                        </Link>
                        </div>
                    </div>
                    <div className="bannerGrid1">
                        <div className="bannerItem">
                        <Link to={`/ProductDetails/90`} >
                            <img className='bannerImg' src={g23} />
                            <p>Puma Future</p>
                        </Link>
                        </div>
                        <div className="bannerItem">
                        <Link to={`/ProductDetails/91`} >
                            <img className='bannerImg' src={g24} />
                            <p>Sports Sneakers</p>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ban">
                <div className="bannerTitle">
                    <h2 className='h2Style'>Electronics! Grab up to 40% <br/> latest gadgets and gears</h2>
                </div>
                <div className="bannerGrid">
                    <div className="bannerGrid1">
                        <div className="bannerItem">
                            <Link to={`/ProductDetails/101`} >
                                <img className='bannerImg' src={g31} />
                                <p>AirPods Max</p>
                            </Link>
                        </div>
                        <div className="bannerItem">
                        <Link to={`/ProductDetails/100`} >
                            <img className='bannerImg' src={g32} />
                            <p>Airpods</p>
                        </Link>
                        </div>
                    </div>
                    <div className="bannerGrid1">
                    <div className="bannerItem">
                    <Link to={`/ProductDetails/106`} >
                            <img className='bannerImg' src={g33} />
                            <p>Series 4 Gold</p>
                            </Link>
                        </div>
                        <div className="bannerItem">
                        <Link to={`/ProductDetails/99`} >
                            <img className='bannerImg' src={g34} />
                            <p>Amazon Echo</p>
                            </Link>
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
    </div>
  );
};

export default Home;
