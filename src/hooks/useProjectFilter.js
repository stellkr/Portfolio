import { useState, useMemo } from 'react';

/**
 * 프로젝트 필터링을 위한 커스텀 훅
 * @param {Array} projects - 프로젝트 배열
 * @param {string} initialFilter - 초기 필터 값 (기본값: 'all')
 * @returns {Object} - filter, setFilter, filteredProjects
 */
const useProjectFilter = (projects = [], initialFilter = 'all') => {
  const [filter, setFilter] = useState(initialFilter);
  
  // 필터링된 프로젝트 목록
  const filteredProjects = useMemo(() => {
    return filter === 'all' 
      ? projects 
      : projects.filter(project => project.category === filter);
  }, [projects, filter]);
  
  return { filter, setFilter, filteredProjects };
};

export default useProjectFilter;