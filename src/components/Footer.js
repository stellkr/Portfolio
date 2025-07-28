import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h2>STELLKR</h2>
          <p>Photographer, Videographer, </p>
          <p>Sound Engineer</p>
        </div>
        
        <div className="footer-right">
          <div className="footer-links">
            <Link to="/">홈</Link>
            <Link to="/about">소개</Link>
            <Link to="/projects">프로젝트</Link>
            <Link to="/contact">연락처</Link>
          </div>
          
          <div className="footer-social">
            <a href="mailto:neondev723@gmail.com" className="social-email">
              neondev723@gmail.com
            </a>
            <div className="social-icons">
              <a href="https://github.com/stellkr" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://discord.com/users/990129125534601246" target="_blank" rel="noopener noreferrer">
                Discord
              </a>
              <a href="https://www.instagram.com/stellkr" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} STELLKR. All Rights Reserved.</p>
        <button className="scroll-top-btn" onClick={scrollToTop}>↑</button>
      </div>
    </footer>
  );
};

export default Footer;