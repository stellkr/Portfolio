# 🌟 STELLKR 포트폴리오 웹사이트

> React를 활용한 반응형 포트폴리오 웹사이트  
> 📸 사진, 🎬 영상, 🎧 음향 작업물과 💻 개발 프로젝트를 한곳에 담았습니다.

---

## ✨ 주요 기능

- 📱 **반응형 디자인**: 모든 디바이스에 최적화된 UX
- 🌙 **다크모드 지원**: 사용자 선호에 따른 테마 전환
- 🎞️ **애니메이션 효과**: 스크롤/페이지 전환 애니메이션
- 🗂️ **프로젝트 필터링**: 카테고리 기반 필터링 기능
- 🔍 **프로젝트 상세 보기**: 모달을 통해 상세 정보 제공
- 🗃️ **JSON 기반 콘텐츠 관리**: 유지보수 및 확장성 강화

---

## 🛠️ 기술 스택

| 분류 | 기술 |
|------|------|
| **Frontend** | React, React Router, CSS3 |
| **상태 관리** | React Hooks (`useState`, `useEffect`, `useContext`) |
| **애니메이션** | CSS Transition, React Transition Group |
| **최적화** | 이미지 Lazy Load, 코드 스플리팅 |
| **배포** | GitHub Pages |

---

## 🚀 시작하기

### 🔧 필요 조건
- Node.js **14.0.0 이상**
- npm **6.0.0 이상** 또는 **yarn**

### 📥 설치
```bash
# 저장소 클론
git clone https://github.com/stellkr/portfolio.git
cd portfolio

# 패키지 설치
npm install
# 또는
yarn install
```

### ▶️ 개발 서버 실행
```bash
npm start
# 또는
yarn start
```

> 접속 주소: [http://localhost:3000](http://localhost:3000)

### 📦 빌드
```bash
npm run build
# 또는
yarn build
```
> 결과물은 `build/` 디렉토리에 생성됩니다.

---

## 📁 프로젝트 구조

```
portfolio/
├── public/              # 정적 파일 (favicon, index.html 등)
├── src/                 # 소스 코드
│   ├── assets/          # 이미지 및 폰트 등 자산
│   ├── components/      # 공통 UI 컴포넌트
│   ├── data/            # JSON 데이터
│   ├── pages/           # 페이지 단위 컴포넌트
│   ├── utils/           # 유틸리티 함수 모음
│   ├── App.js           # 메인 앱 컴포넌트
│   └── index.js         # 앱 진입점
├── IMPROVEMENTS.md      # 개선 계획 문서
└── README.md
```

---

## 🗂️ 데이터 관리

> 모든 콘텐츠는 `src/data/` 폴더 내 JSON 파일로 구성됩니다.

| 파일명 | 내용 |
|--------|------|
| `projects.json` | 프로젝트 목록 |
| `skills.json` | 기술 스택 |
| `activities.json` | 경력 및 동아리 활동 |
| `education.json` | 교육 이력 |
| `awards.json` | 수상 내역 |
| `certifications.json` | 자격증 정보 |

---

## 📝 라이선스

MIT License를 따릅니다.  
자세한 내용은 [`LICENSE`](./LICENSE) 파일을 참고해주세요.

---

## 📬 연락처

- 📧 이메일: [neondev723@gmail.com](mailto:neondev723@gmail.com)
- 🐙 GitHub: [stellkr](https://github.com/stellkr)
