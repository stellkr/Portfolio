import React from 'react';
import ScrollAnimation from '../components/ScrollAnimation';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact">
      <div className="contact-header">
        <h1>연락처</h1>
        <p>프로젝트 협업 및 문의는 아래 연락처로 연락해주세요</p>
      </div>
      
      <ScrollAnimation className="contact-container">
        <ScrollAnimation className="contact-card email-card">
          <div className="contact-icon">
            <span className="icon">📧</span>
          </div>
          <h3>이메일</h3>
          <p>neondev723@gmail.com</p>
          <a href="mailto:neondev723@gmail.com" className="contact-button">이메일 보내기</a>
        </ScrollAnimation>

        <ScrollAnimation className="contact-card github-card">
          <div className="contact-icon">
            <span className="icon">💻</span>
          </div>
          <h3>GitHub</h3>
          <p>stellkr</p>
          <a href="https://github.com/stellkr" target="_blank" rel="noopener noreferrer" className="contact-button">바로가기</a>
        </ScrollAnimation>

        <ScrollAnimation className="contact-card discord-card">
          <div className="contact-icon">
            <span className="icon">💬</span>
          </div>
          <h3>Discord</h3>
          <p>stellkr</p>
          <a href="https://discord.com/users/990129125534601246" target="_blank" rel="noopener noreferrer" className="contact-button">바로가기</a>
        </ScrollAnimation>

        <ScrollAnimation className="contact-card instagram-card">
          <div className="contact-icon">
            <span className="icon">📸</span>
          </div>
          <h3>Instagram</h3>
          <p>@stellkr_</p>
          <a href="https://www.instagram.com/stellkr_" target="_blank" rel="noopener noreferrer" className="contact-button">바로가기</a>
        </ScrollAnimation>
      </ScrollAnimation>


    </section>
  );
};

export default Contact;