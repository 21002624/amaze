import React from 'react'
import './Footer.css';
import { FaFacebook,FaWhatsapp,FaInstagram,FaTwitter, FaPortrait, FaUser, FaLinkedin } from 'react-icons/fa';
import insta from '../../icons/insta.png';
import linkedin from '../../icons/linkedin.png';
import port from '../../icons/port.png'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <div className='footer'>
        <div className='Footer'>
        <div className='Foot1'>
          <h2>Get to Know Us</h2>
            <div>
              <p className='footP'>About Ecom</p>
              <p className='footP'>Global Brand</p>
              <p className='footP'>Merchants</p>
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
            <a href="https://im-akash.netlify.app/" target="_blank" >
              <AccountBoxOutlinedIcon />
            </a>
            <a href="https://www.linkedin.com/in/im-akasharul/" target="_blank" >
              <LinkedInIcon />
            </a>
            <a href="https://www.instagram.com/akzhxx_/" target="_blank">
              <InstagramIcon/>
            </a>
          </div>
        </div>
      </div>
      
      <div className="FootCopyRight">
        <p>© Developed by Akash</p>
      </div>
    </div>
  )
}

export default Footer
