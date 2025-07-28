import React, { useState, useEffect } from 'react';
import ScrollAnimation from '../components/ScrollAnimation';
import './Projects.css';

// 프로젝트 데이터 임포트
import projectsData from '../data/projects.json';

// 프로젝트 이미지 임포트
import videoImg from '../assets/images/video-project.jpg';
import photoImg from '../assets/images/photo-project.jpg';
import devImg from '../assets/images/dev-project.jpg';
import dataImg from '../assets/images/data-project.jpg';
import soundImg from '../assets/images/sound-project.jpg';
import portfolioImg from '../assets/images/portfolio-project.jpg';
import schoolVideoImg from '../assets/images/school-video.jpg';
import posterImg from '../assets/images/poster-project.jpg';
import ReadyImg from '../assets/images/Ready.jpg';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  
  // 이미지 매핑 함수
  const getImageByName = (imageName) => {
    switch(imageName) {
      case 'video-project.jpg':
        return videoImg;
      case 'photo-project.jpg':
        return photoImg;
      case 'dev-project.jpg':
        return devImg;
      case 'data-project.jpg':
        return dataImg;
      case 'sound-project.jpg':
        return soundImg;
      case 'portfolio-project.jpg':
        return portfolioImg;
      case 'school-video.jpg':
        return schoolVideoImg;
      case 'poster-project.jpg':
        return posterImg;
      case 'Ready.jpg':
        return ReadyImg;
      default:
        return null;
    }
  };
  
  // JSON 데이터 로드 및 이미지 매핑
  useEffect(() => {
    const loadedProjects = projectsData.map(project => ({
      ...project,
      image: getImageByName(project.image),
      images: project.images ? project.images.map(img => getImageByName(img)) : [getImageByName(project.image)]
    }));
    setProjects(loadedProjects);
  }, []);
  
  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showModal) return;
      
      switch(e.key) {
        case 'Escape':
          setShowModal(false);
          break;
        case 'ArrowLeft':
          if (selectedProject && selectedProject.images && selectedProject.images.length > 1) {
            setCurrentImageIndex(prev => 
              prev === 0 ? selectedProject.images.length - 1 : prev - 1
            );
          } else {
            navigateProjects('prev');
          }
          break;
        case 'ArrowRight':
          if (selectedProject && selectedProject.images && selectedProject.images.length > 1) {
            setCurrentImageIndex(prev => 
              prev === selectedProject.images.length - 1 ? 0 : prev + 1
            );
          } else {
            navigateProjects('next');
          }
          break;
        case 'ArrowUp':
        case 'ArrowDown':
          navigateProjects(e.key === 'ArrowUp' ? 'prev' : 'next');
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal, selectedProject, currentImageIndex]);
  
  // 프로젝트 간 이동
  const navigateProjects = (direction) => {
    const filteredProjects = filter === 'all' 
      ? projects 
      : projects.filter(project => project.category === filter);
    
    if (filteredProjects.length <= 1) return;
    
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex === filteredProjects.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? filteredProjects.length - 1 : currentIndex - 1;
    }
    
    setSelectedProject(filteredProjects[newIndex]);
    setCurrentImageIndex(0);
  };
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  return (
    <section className="projects">
      <div className="projects-header">
        <ScrollAnimation animation="fadeUp">
          <h1>프로젝트</h1>
          <p>제가 작업한 다양한 프로젝트들을 확인해보세요</p>
        </ScrollAnimation>
      </div>
      
      <ScrollAnimation className="filter-container" animation="fadeUp" delay={0.2}>
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          전체
        </button>
        <button 
          className={`filter-btn ${filter === 'video' ? 'active' : ''}`}
          onClick={() => setFilter('video')}
        >
          영상
        </button>
        <button 
          className={`filter-btn ${filter === 'photo' ? 'active' : ''}`}
          onClick={() => setFilter('photo')}
        >
          사진
        </button>
        <button 
          className={`filter-btn ${filter === 'dev' ? 'active' : ''}`}
          onClick={() => setFilter('dev')}
        >
          개발
        </button>
      </ScrollAnimation>
      
      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <ScrollAnimation 
            className="project-card" 
            key={project.id}
            animation={index % 3 === 0 ? 'fadeUp' : index % 3 === 1 ? 'fromLeft' : 'fromRight'}
            delay={index * 0.1}
          >
            <div 
              className="project-image" 
              style={{ backgroundImage: `url(${project.image})` }}
              onClick={() => {
                setSelectedProject(project);
                setShowModal(true);
              }}
            >
              <div className="project-overlay">
                <div className="project-category">{project.category}</div>
              </div>
            </div>
            <div className="project-details">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-stack">
                {project.technologies.map((tech, index) => (
                  <span className="tech-tag" key={index}>{tech}</span>
                ))}
              </div>
              <div className="project-actions">
                {project.link && project.link !== '#' && (
                  <a 
                    href={project.link} 
                    className="project-link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    프로젝트 보기
                  </a>
                )}
                <button 
                  className={`detail-btn ${!project.link || project.link === '#' ? 'full-width' : ''}`}
                  onClick={() => {
                    setSelectedProject(project);
                    setCurrentImageIndex(0);
                    setShowModal(true);
                  }}
                >
                  자세히 보기
                </button>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>

      {/* 프로젝트 상세 모달 */}
      {showModal && selectedProject && (
        <div className="project-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
            <div className="modal-image-gallery">
              <div 
                className="modal-image" 
                style={{ backgroundImage: `url(${selectedProject.images[currentImageIndex]})` }}
              ></div>
              
              {selectedProject.images && selectedProject.images.length > 1 && (
                <div className="image-navigation">
                  <button 
                    className="image-nav-btn prev" 
                    onClick={() => setCurrentImageIndex(prev => 
                      prev === 0 ? selectedProject.images.length - 1 : prev - 1
                    )}
                  >
                    &lt;
                  </button>
                  
                  <div className="image-indicators">
                    {selectedProject.images.map((_, index) => (
                      <span 
                        key={index} 
                        className={`image-indicator ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      ></span>
                    ))}
                  </div>
                  
                  <button 
                    className="image-nav-btn next" 
                    onClick={() => setCurrentImageIndex(prev => 
                      prev === selectedProject.images.length - 1 ? 0 : prev + 1
                    )}
                  >
                    &gt;
                  </button>
                </div>
              )}
            </div>
            <div className="modal-content">
              <h2>{selectedProject.title}</h2>
              <p className="modal-description">{selectedProject.detailDescription || selectedProject.description}</p>
              <div className="modal-tech-stack">
                <h3>사용 기술</h3>
                <div className="tech-tags">
                  {selectedProject.technologies.map((tech, index) => (
                    <span className="tech-tag" key={index}>{tech}</span>
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                {selectedProject.link && selectedProject.link !== '#' && (
                  <a 
                    href={selectedProject.link} 
                    className="modal-link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    프로젝트 보기
                  </a>
                )}
                
                <div className="project-navigation">
                  <button 
                    className="project-nav-btn prev" 
                    onClick={() => navigateProjects('prev')}
                    title="이전 프로젝트 (↑)"
                  >
                    <span className="nav-icon">&larr;</span> 이전
                  </button>
                  <button 
                    className="project-nav-btn next" 
                    onClick={() => navigateProjects('next')}
                    title="다음 프로젝트 (↓)"
                  >
                    다음 <span className="nav-icon">&rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;