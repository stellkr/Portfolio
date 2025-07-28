import React, { useState, useEffect } from 'react';
import './ProjectModal.css';

const ProjectModal = ({ 
  project, 
  isOpen, 
  onClose, 
  currentImageIndex: initialImageIndex = 0,
  onNavigate
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);
  
  // 이미지 인덱스 초기화
  useEffect(() => {
    setCurrentImageIndex(initialImageIndex);
  }, [initialImageIndex, project]);
  
  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch(e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (project && project.images && project.images.length > 1) {
            setCurrentImageIndex(prev => 
              prev === 0 ? project.images.length - 1 : prev - 1
            );
          } else {
            onNavigate('prev');
          }
          break;
        case 'ArrowRight':
          if (project && project.images && project.images.length > 1) {
            setCurrentImageIndex(prev => 
              prev === project.images.length - 1 ? 0 : prev + 1
            );
          } else {
            onNavigate('next');
          }
          break;
        case 'ArrowUp':
          onNavigate('prev');
          break;
        case 'ArrowDown':
          onNavigate('next');
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, project, onClose, onNavigate]);
  
  if (!isOpen || !project) return null;
  
  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-image-gallery">
          <div 
            className="modal-image" 
            style={{ backgroundImage: `url(${project.images[currentImageIndex]})` }}
          ></div>
          
          {project.images && project.images.length > 1 && (
            <div className="image-navigation">
              <button 
                className="image-nav-btn prev" 
                onClick={() => setCurrentImageIndex(prev => 
                  prev === 0 ? project.images.length - 1 : prev - 1
                )}
              >
                &lt;
              </button>
              
              <div className="image-indicators">
                {project.images.map((_, index) => (
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
                  prev === project.images.length - 1 ? 0 : prev + 1
                )}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
        <div className="modal-content">
          <h2>{project.title}</h2>
          <p className="modal-description">{project.detailDescription || project.description}</p>
          <div className="modal-tech-stack">
            <h3>사용 기술</h3>
            <div className="tech-tags">
              {project.technologies.map((tech, index) => (
                <span className="tech-tag" key={index}>{tech}</span>
              ))}
            </div>
          </div>
          <div className="modal-actions">
            {project.link && project.link !== '#' && (
              <a 
                href={project.link} 
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
                onClick={() => onNavigate('prev')}
                title="이전 프로젝트 (↑)"
              >
                <span className="nav-icon">&larr;</span> 이전
              </button>
              <button 
                className="project-nav-btn next" 
                onClick={() => onNavigate('next')}
                title="다음 프로젝트 (↓)"
              >
                다음 <span className="nav-icon">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;