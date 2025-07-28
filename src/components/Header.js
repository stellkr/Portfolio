import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../App';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 페이지 변경 시 메뉴 닫기
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>STELLKR</h1>
        </Link>
        
        <div className={`mobile-menu-btn ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                홈
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={location.pathname === '/about' ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                소개
              </Link>
            </li>
            <li>
              <Link 
                to="/projects" 
                className={location.pathname === '/projects' ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                프로젝트
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={location.pathname === '/contact' ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                연락처
              </Link>
            </li>
            <li className="theme-toggle">
              <button 
                onClick={toggleDarkMode} 
                className="theme-toggle-btn" 
                aria-label={darkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;