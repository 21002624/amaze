import React from 'react'
import './Footer.css';
import { FaFacebook,FaWhatsapp,FaInstagram,FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='Footer'>
      {/* <div className='Foot1'>
          akash
      </div> */}

      <div className='Foot1'>
        <h2>Get to Know Us</h2>
          <div>
            <p className='footP'>about Ecom</p>
            <p className='footP'>Global Brand</p>
            <p className='footP'>merchants</p>
          </div>
      </div>

      <div className='Foot1'>
        <h2>Let Us Help You</h2>
        <div>
          <p className='footP'>Your Account</p>
          <p className='footP'>Returns Centre</p>
          <p className='footP'>Help</p>
        </div>
          
      </div>

      <div className='Foot1'>
        <h2>Connect with Us</h2>
        <div className='socialLinks'>
          <a><FaFacebook size={30} /></a>
          <a><FaWhatsapp size={30} /></a>
          <a><FaInstagram size={30} /></a>
          <a><FaTwitter size={30} /></a>
        </div>
      </div>
    </div>
  )
}

export default Footer
