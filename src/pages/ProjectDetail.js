import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ScrollAnimation from '../components/ScrollAnimation';
import projectsData from '../data/projects.json';
import { importImage } from '../utils/imageUtils';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [relatedProjects, setRelatedProjects] = useState([]);
  
  // 프로젝트 데이터 로드
  useEffect(() => {
    const projectId = parseInt(id);
    const foundProject = projectsData.find(p => p.id === projectId);
    
    if (foundProject) {
      // 이미지 로드
      const projectWithImages = {
        ...foundProject,
        image: importImage(foundProject.image),
        images: foundProject.images ? foundProject.images.map(img => importImage(img)) : [importImage(foundProject.image)]
      };
      
      setProject(projectWithImages);
      
      // 관련 프로젝트 찾기 (같은 카테고리의 다른 프로젝트)
      const related = projectsData
        .filter(p => p.category === foundProject.category && p.id !== projectId)
        .slice(0, 3)
        .map(p => ({
          ...p,
          image: importImage(p.image)
        }));
      
      setRelatedProjects(related);
    } else {
      // 프로젝트를 찾을 수 없는 경우
      console.error(`프로젝트 ID ${id}를 찾을 수 없습니다.`);
    }
    
    setLoading(false);
  }, [id]);
  
  // 이전/다음 이미지로 이동
  const navigateImage = (direction) => {
    if (!project || project.images.length <= 1) return;
    
    setCurrentImageIndex(prev => {
      if (direction === 'next') {
        return prev === project.images.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? project.images.length - 1 : prev - 1;
      }
    });
  };
  
  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project]);
  
  if (loading) {
    return <div className="project-detail-loading">로딩 중...</div>;
  }
  
  if (!project) {
    return (
      <div className="project-not-found">
        <h2>프로젝트를 찾을 수 없습니다</h2>
        <p>요청하신 프로젝트를 찾을 수 없습니다.</p>
        <Link to="/projects" className="back-to-projects">프로젝트 목록으로 돌아가기</Link>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{project.title} | STELLKR 포트폴리오</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.title} | STELLKR 포트폴리오`} />
        <meta property="og:description" content={project.description} />
      </Helmet>
      
      <section className="project-detail">
        <div className="project-detail-header">
          <ScrollAnimation animation="fadeUp">
            <div className="project-breadcrumb">
              <Link to="/projects">프로젝트</Link> / {project.title}
            </div>
            <h1>{project.title}</h1>
            <div className="project-category-tag">{project.category}</div>
          </ScrollAnimation>
        </div>
        
        <div className="project-detail-content">
          <ScrollAnimation animation="fadeUp" delay={0.2}>
            <div className="project-gallery">
              <div 
                className="project-main-image" 
                style={{ backgroundImage: `url(${project.images[currentImageIndex]})` }}
              ></div>
              
              {project.images.length > 1 && (
                <div className="project-thumbnails">
                  {project.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`project-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                      style={{ backgroundImage: `url(${image})` }}
                      onClick={() => setCurrentImageIndex(index)}
                    ></div>
                  ))}
                </div>
              )}
              
              {project.images.length > 1 && (
                <div className="gallery-navigation">
                  <button 
                    className="gallery-nav-btn prev" 
                    onClick={() => navigateImage('prev')}
                  >
                    &lt;
                  </button>
                  <button 
                    className="gallery-nav-btn next" 
                    onClick={() => navigateImage('next')}
                  >
                    &gt;
                  </button>
                </div>
              )}
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fadeUp" delay={0.3}>
            <div className="project-info">
              <div className="project-description">
                <h2>프로젝트 소개</h2>
                <p>{project.detailDescription || project.description}</p>
              </div>
              
              <div className="project-meta">
                <div className="project-tech">
                  <h3>사용 기술</h3>
                  <div className="tech-tags">
                    {project.technologies.map((tech, index) => (
                      <span className="tech-tag" key={index}>{tech}</span>
                    ))}
                  </div>
                </div>
                
                {project.link && project.link !== '#' && (
                  <div className="project-links">
                    <h3>프로젝트 링크</h3>
                    <a 
                      href={project.link} 
                      className="project-external-link" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      프로젝트 보기
                    </a>
                  </div>
                )}
              </div>
            </div>
          </ScrollAnimation>
        </div>
        
        {relatedProjects.length > 0 && (
          <ScrollAnimation animation="fadeUp" delay={0.4}>
            <div className="related-projects">
              <h2>관련 프로젝트</h2>
              <div className="related-projects-grid">
                {relatedProjects.map(relatedProject => (
                  <div 
                    key={relatedProject.id} 
                    className="related-project-card"
                    onClick={() => navigate(`/projects/${relatedProject.id}`)}
                  >
                    <div 
                      className="related-project-image" 
                      style={{ backgroundImage: `url(${relatedProject.image})` }}
                    ></div>
                    <div className="related-project-info">
                      <h3>{relatedProject.title}</h3>
                      <p>{relatedProject.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        )}
        
        <ScrollAnimation animation="fadeUp" delay={0.5}>
          <div className="project-navigation">
            <Link to="/projects" className="back-to-projects">
              모든 프로젝트 보기
            </Link>
          </div>
        </ScrollAnimation>
      </section>
    </>
  );
};

export default ProjectDetail;