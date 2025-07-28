/**
 * 이미지 동적 임포트 유틸리티
 */

// 이미지 캐시 객체
const imageCache = {};

// 이미지 동적 임포트 함수
export const importImage = (imageName) => {
  try {
    // 이미 캐시된 이미지가 있으면 반환
    if (imageCache[imageName]) {
      return imageCache[imageName];
    }
    
    // 이미지 동적 임포트
    const image = require(`../assets/images/${imageName}`);
    imageCache[imageName] = image;
    return image;
  } catch (error) {
    console.error(`이미지를 찾을 수 없음: ${imageName}`);
    return null;
  }
};