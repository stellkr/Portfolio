# STELLKR 포트폴리오 웹사이트

React를 활용한 개인 포트폴리오 웹사이트입니다. 사진, 영상, 음향 작업물과 개발 프로젝트를 소개하는 반응형 웹사이트입니다.

![포트폴리오 미리보기](./preview.png)

## 주요 기능

- **반응형 디자인**: 모든 디바이스에서 최적화된 경험 제공
- **다크모드**: 사용자 선호에 따른 라이트/다크 테마 전환
- **애니메이션 효과**: 스크롤 애니메이션과 페이지 전환 효과
- **프로젝트 필터링**: 카테고리별 프로젝트 필터링 기능
- **프로젝트 상세 보기**: 모달을 통한 프로젝트 상세 정보 제공
- **JSON 기반 데이터 관리**: 모든 콘텐츠는 JSON 파일로 관리하여 유지보수 용이

## 기술 스택

- **프론트엔드**: React, React Router, CSS3
- **상태 관리**: React Hooks (useState, useEffect, useContext)
- **애니메이션**: CSS Transitions, React Transition Group
- **성능 최적화**: 이미지 지연 로딩, 코드 스플리팅
- **배포**: GitHub Pages

## 시작하기

### 필요 조건
- Node.js 14.0.0 이상
- npm 6.0.0 이상 또는 yarn

### 설치 방법
```bash
# 저장소 클론
git clone https://github.com/stellkr/portfolio.git
cd portfolio

# 의존성 설치
npm install
# 또는
yarn install
```

### 개발 서버 실행
```bash
npm start
# 또는
yarn start
```
브라우저에서 http://localhost:3000 으로 접속하여 개발 서버를 확인할 수 있습니다.

### 빌드
```bash
npm run build
# 또는
yarn build
```
빌드된 파일은 `build` 디렉토리에 생성됩니다.

## 프로젝트 구조

```
portfolio/
├── public/              # 정적 파일
├── src/                 # 소스 코드
│   ├── assets/          # 이미지, 폰트 등 자산
│   ├── components/      # 재사용 가능한 컴포넌트
│   ├── data/            # JSON 데이터 파일
│   ├── pages/           # 페이지 컴포넌트
│   ├── utils/           # 유틸리티 함수
│   ├── App.js           # 메인 앱 컴포넌트
│   └── index.js         # 진입점
└── IMPROVEMENTS.md      # 개선 사항 문서
```

## 데이터 관리

모든 콘텐츠는 `src/data` 디렉토리의 JSON 파일로 관리됩니다:

- `projects.json`: 프로젝트 정보
- `skills.json`: 기술 스택 정보
- `activities.json`: 경력 및 동아리 활동 정보
- `education.json`: 교육 정보
- `awards.json`: 수상 내역
- `certifications.json`: 자격증 정보

## 향후 개선 계획

자세한 개선 계획은 [IMPROVEMENTS.md](./IMPROVEMENTS.md) 파일을 참조하세요.

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](./LICENSE) 파일을 참조하세요.

## 연락처

- 이메일: neondev723@gmail.com
- GitHub: [stellkr](https://github.com/stellkr)