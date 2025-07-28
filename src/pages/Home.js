import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from '../components/ScrollAnimation';
import './Home.css';

const Home = () => {
  return (
    <section className="home">
      <div className="hero">
        <div className="hero-content">
          <ScrollAnimation className="hero-text" animation="fromLeft">
            <h1>안녕하세요, <br /><span className="highlight">황지호</span>입니다.</h1>
            <div className="hero-subtitle">
              <p className="profession">Photographer, Videographer, Sound Engineer</p>
              <p className="motto">"안된다 못한다 하지 말고 긍정적으로."</p>
            </div>
            <div className="hero-buttons">
              <Link to="/projects" className="btn btn-primary">
                프로젝트 보기
              </Link>
              <Link to="/about" className="btn btn-secondary">
                소개 보기
              </Link>
            </div>
          </ScrollAnimation>
          <ScrollAnimation className="hero-image" animation="fromRight" delay={0.3}>
            <div className="profile-circle">
              {/* 프로필 이미지가 들어갈 자리 */}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Home;