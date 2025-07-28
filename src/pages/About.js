import React, { useState, useEffect } from 'react';
import ScrollAnimation from '../components/ScrollAnimation';
import './About.css';

// JSON 데이터 임포트
import skillsData from '../data/skills.json';
import educationData from '../data/education.json';
import awardsData from '../data/awards.json';
import certificationsData from '../data/certifications.json';
import activitiesData from '../data/activities.json';

const About = () => {
  const [activeTab, setActiveTab] = useState('skills');
  const [activityFilter, setActivityFilter] = useState('all');
  const [filteredActivities, setFilteredActivities] = useState([]);
  
  // 활동 필터링
  useEffect(() => {
    if (activityFilter === 'all') {
      setFilteredActivities(activitiesData);
    } else {
      setFilteredActivities(activitiesData.filter(activity => activity.type === (activityFilter === 'experience' ? '경력' : '동아리')));
    }
  }, [activityFilter]);
  
  // 초기 로드 시 필터링 적용
  useEffect(() => {
    setFilteredActivities(activitiesData);
  }, []);

  return (
    <section className="about">
      <div className="about-header">
        <h1>소개</h1>
        <p>저에 대해 더 알아보세요</p>
      </div>

      <ScrollAnimation className="about-profile" animation="fadeUp">
        <div className="profile-card">
          <div className="profile-info">
            <h2>황지호</h2>
            <p className="subtitle">Photographer, Videographer, Sound Engineer</p>
            <p className="bio">
              저는 사진, 영상, 음향 분야에 열정을 가진 고등학생입니다. 
              창의성과 기술, 그리고 지속적인 학습에 관심이 많으며, 현재 빅데이터정보 전공으로 
              고등학교에 재학 중입니다.
            </p>
            <p className="motto">
              <strong>좌우명:</strong> "안된다 못한다 하지 말고 긍정적으로."
            </p>
          </div>
        </div>
      </ScrollAnimation>

      {/* 탭 네비게이션 */}
      <div className="about-tabs">
        <button 
          className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`} 
          onClick={() => setActiveTab('skills')}
        >
          기술 스택
        </button>
        <button 
          className={`tab-btn ${activeTab === 'activities' ? 'active' : ''}`} 
          onClick={() => setActiveTab('activities')}
        >
          활동 경력
        </button>
        <button 
          className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`} 
          onClick={() => setActiveTab('education')}
        >
          교육
        </button>
        <button 
          className={`tab-btn ${activeTab === 'awards' ? 'active' : ''}`} 
          onClick={() => setActiveTab('awards')}
        >
          수상 내역
        </button>
        <button 
          className={`tab-btn ${activeTab === 'certifications' ? 'active' : ''}`} 
          onClick={() => setActiveTab('certifications')}
        >
          자격증
        </button>
      </div>

      {/* 기술 스택 */}
      {activeTab === 'skills' && (
        <div className="about-section">
          <ScrollAnimation animation="fadeUp">
            <h2 className="section-title">기술 스택</h2>
          </ScrollAnimation>
          <div className="skills-container">
            {skillsData.map((category, index) => (
              <ScrollAnimation 
                key={index} 
                className="skill-category-card" 
                animation="fadeUp" 
                delay={index * 0.1}
              >
                <h3 className="category-title">{category.category}</h3>
                <div className="skill-items">
                  {category.skills.map((skill, skillIndex) => (
                    <div className="skill-item" key={skillIndex}>
                      <div className="skill-header">
                        <span className="skill-icon">{skill.icon}</span>
                        <div className="skill-name">{skill.name}</div>
                        <div className="skill-percentage">{skill.progress}%</div>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className="skill-progress" 
                          style={{ width: `${skill.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      )}

      {/* 활동 경력 */}
      {activeTab === 'activities' && (
        <div className="about-section">
          <ScrollAnimation animation="fadeUp">
            <h2 className="section-title">활동 경력</h2>
          </ScrollAnimation>
          <div className="activities-filter">
            <button 
              className={`filter-btn ${activityFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActivityFilter('all')}
            >
              전체
            </button>
            <button 
              className={`filter-btn ${activityFilter === 'experience' ? 'active' : ''}`}
              onClick={() => setActivityFilter('experience')}
            >
              경력
            </button>
            <button 
              className={`filter-btn ${activityFilter === 'club' ? 'active' : ''}`}
              onClick={() => setActivityFilter('club')}
            >
              동아리
            </button>
          </div>
          <div className="activities-grid">
            {filteredActivities.map((activity, index) => (
              <ScrollAnimation 
                key={index} 
                className={`activity-card ${activity.type === '경력' ? 'experience-item' : 'club-item'}`}
                animation="fadeUp" 
                delay={index * 0.1}
              >
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-content">
                  <div className="activity-type">{activity.type}</div>
                  <h3>{activity.name}</h3>
                  <div className="activity-role">{activity.role}</div>
                  <div className="activity-period">{activity.period}</div>
                  <p>{activity.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      )}

      {/* 교육 */}
      {activeTab === 'education' && (
        <div className="about-section">
          <ScrollAnimation animation="fadeUp">
            <h2 className="section-title">교육</h2>
          </ScrollAnimation>
          <div className="education-cards">
            {educationData.map((edu, index) => (
              <ScrollAnimation 
                key={index} 
                className="education-card" 
                animation="fadeUp" 
                delay={index * 0.1}
              >
                <div className="education-icon">{edu.icon}</div>
                <div className="education-content">
                  <h3>{edu.school}</h3>
                  <div className="education-date">{edu.period}</div>
                  <p>{edu.description}</p>
                  <span className={`education-status ${edu.status === '졸업' ? 'graduated' : 'current'}`}>
                    {edu.status}
                  </span>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      )}

      {/* 수상 내역 */}
      {activeTab === 'awards' && (
        <div className="about-section">
          <ScrollAnimation animation="fadeUp">
            <h2 className="section-title">수상 내역</h2>
          </ScrollAnimation>
          <div className="awards-grid">
            {awardsData.map((award, index) => (
              <ScrollAnimation 
                key={index} 
                className="award-card" 
                animation="fadeUp" 
                delay={index * 0.1}
              >
                <div className="award-icon">
                  <span className="icon">{award.icon}</span>
                </div>
                <div className="award-content">
                  <h3>{award.title}</h3>
                  <p className="award-category">{award.category}</p>
                  <div className={`award-medal ${award.medal === '금상' ? 'gold' : award.medal === '동상' ? 'bronze' : ''}`}>
                    {award.medal}
                  </div>
                  <div className="award-year">{award.year}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      )}

      {/* 자격증 */}
      {activeTab === 'certifications' && (
        <div className="about-section">
          <ScrollAnimation animation="fadeUp">
            <h2 className="section-title">자격증</h2>
          </ScrollAnimation>
          <div className="certifications-grid">
            {certificationsData.map((cert, index) => (
              <ScrollAnimation 
                key={index} 
                className="certification-card" 
                animation="fadeUp" 
                delay={index * 0.1}
              >
                <div className="certification-icon">{cert.icon}</div>
                <div className="certification-content">
                  <h3>{cert.title}</h3>
                  <p>{cert.organization} | {cert.date}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default About;