// 이미지 지연 로딩을 위한 유틸리티 함수

// 이미지 지연 로딩 설정
export const setupLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          
          if (src) {
            img.src = src;
            img.classList.remove('lazy-image');
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // IntersectionObserver가 지원되지 않는 브라우저를 위한 폴백
    const lazyLoad = () => {
      const lazyImages = document.querySelectorAll('.lazy-image');
      
      lazyImages.forEach(img => {
        const src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
          img.classList.remove('lazy-image');
          img.classList.add('loaded');
        }
      });
    };
    
    // 초기 로드 및 스크롤 이벤트에 연결
    document.addEventListener('DOMContentLoaded', lazyLoad);
    window.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('orientationchange', lazyLoad);
  }
};

// 배경 이미지 지연 로딩 설정
export const setupLazyBackgrounds = () => {
  if ('IntersectionObserver' in window) {
    const lazyBackgrounds = document.querySelectorAll('.lazy-background');
    
    const bgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const bg = element.getAttribute('data-background');
          
          if (bg) {
            element.style.backgroundImage = `url(${bg})`;
            element.classList.remove('lazy-background');
            element.classList.add('loaded-background');
            bgObserver.unobserve(element);
          }
        }
      });
    });
    
    lazyBackgrounds.forEach(bg => {
      bgObserver.observe(bg);
    });
  }
};