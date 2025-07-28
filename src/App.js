import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { setupLazyLoading, setupLazyBackgrounds } from './utils/lazyLoad';

// 컴포넌트 임포트
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';

// 페이지 임포트
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

import './App.css';

// 다크모드 컨텍스트 생성
export const ThemeContext = createContext();

// 페이지 전환 시 스크롤 상단으로 이동
// 및 페이지 타이틀 업데이트
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 스크롤 애니메이션 없이 즉시 이동
    });
  }, [pathname]);
  
  return null;
};

// 페이지 전환 애니메이션 컴포넌트
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <TransitionGroup className="transition-group">
      <CSSTransition
        key={location.key}
        timeout={300}
        classNames="page"
      >
        <div className="route-section">
          <ErrorBoundary>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // 다크모드 상태 관리
  useEffect(() => {
    // 로컬 스토리지에서 다크모드 설정 가져오기
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    } else {
      // 사용자 시스템 설정 확인
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // 다크모드 변경 시 HTML 클래스 업데이트
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    // 로컬 스토리지에 설정 저장
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // 다크모드 토글 함수
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // 페이지 로딩 시간 시뮤레이션
    const timer = setTimeout(() => {
      setLoading(false);
      // 로딩 완료 후 지연 로딩 초기화
      setTimeout(() => {
        setupLazyLoading();
        setupLazyBackgrounds();
      }, 100);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary showDetails={process.env.NODE_ENV === 'development'}>
      <HelmetProvider>
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
          <Router>
            <Helmet>
              <title>STELLKR | 포트폴리오</title>
              <meta name="description" content="황지호의 포트폴리오 웹사이트입니다. 사진, 영상, 음향 분야의 작업물을 확인하세요." />
              <meta name="keywords" content="포트폴리오, 사진, 영상, 음향, 프로그래밍, 황지호, 학생 포트폴리오, 고등학생 포트폴리오" />
              <meta name="author" content="황지호" />
              <meta name="theme-color" content={darkMode ? '#121212' : '#6c63ff'} />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta name="robots" content="index, follow" />
              <meta name="language" content="Korean" />
              <meta property="og:title" content="STELLKR | 황지호의 포트폴리오" />
              <meta property="og:description" content="황지호의 포트폴리오 웹사이트입니다. 사진, 영상, 음향 분야의 작업물을 확인하세요." />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://stellkr.com" />
              <meta property="og:image" content="/og-image.jpg" />
              <meta property="og:site_name" content="STELLKR 포트폴리오" />
              <meta property="og:locale" content="ko_KR" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="STELLKR | 황지호의 포트폴리오" />
              <meta name="twitter:description" content="황지호의 포트폴리오 웹사이트입니다. 사진, 영상, 음향 분야의 작업물을 확인하세요." />
              <meta name="twitter:image" content="/og-image.jpg" />
            </Helmet>
            <ScrollToTop />
            <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <Header />
                  <main className="main-content">
                    <AnimatedRoutes />
                  </main>
                  <Footer />
                </>
              )}
            </div>
          </Router>
        </ThemeContext.Provider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;