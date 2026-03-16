# TestImg

**테스트 이미지를 해상도 또는 정확한 파일 크기로 즉시 생성하는 무료 온라인 도구**

🌐 **라이브:** [testimg.art](https://testimg.art)

---

## 주요 기능

- **해상도 모드** — 원하는 너비 × 높이로 이미지 생성 (추천 프리셋 포함)
- **용량 모드** — 1 MB ~ 20 MB 사이의 정확한 파일 크기로 이미지 생성
- **포맷 선택** — JPEG / WebP / PNG 지원
- **이미지 정보 오버레이** — 해상도 & 파일 크기를 이미지에 직접 표시
- **다국어** — 한국어 / English 자동 감지
- **즉시 다운로드** — 회원가입 없이 바로 사용

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| UI 프레임워크 | React 19 |
| 언어 | TypeScript 5 |
| 번들러 | Vite 7 |
| 스타일 | Tailwind CSS 4 |
| 아키텍처 | Feature-Sliced Design (FSD) |
| 분석 | Google Analytics 4 |
| 피드백 | Formspree |

---

## 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 프로젝트 구조 (FSD)

```
src/
├── app/                  # 앱 진입점
│   └── main.tsx
├── widgets/
│   └── app/
│       ├── App.tsx       # 루트 컴포넌트
│       ├── components/   # Header, Footer, 패널 컴포넌트
│       └── context/      # AppContext (전역 상태)
├── features/
│   ├── analytics/        # GA4 이벤트 트래킹
│   ├── feedback/         # 피드백 모달 (Formspree)
│   ├── generate/         # 이미지 생성 로직
│   └── language/         # 언어 감지
├── entities/
│   └── preset/           # 해상도 프리셋 데이터
└── shared/
    ├── config/           # GA ID, 광고 설정
    ├── i18n/             # 다국어 메시지
    └── lib/              # canvas, color, format 유틸
```

---

## 피드백 / 기여

- 버그 신고나 기능 제안은 사이트 하단의 **"피드백 보내기"** 버튼을 이용해주세요.
- Pull Request도 환영합니다.

---

## Changelog

### v1.12
- 용량 모드에서 PNG 포맷 지원 추가 / PNG now supported in file size mode

### v1.11
- Pretendard 폰트 UI 및 캔버스에 적용
- 다운로드 시마다 배경색·글자색 랜덤 선택
- 피드백 모달 한/영 다국어 처리 적용

### v1.1
- GA4 측정 ID 연동 (testimg.art 도메인 등록)
- 피드백 게시판 추가 (Formspree, 버그/제안/기타 유형 선택)
- GitHub 버튼 → 모달로 개발자 프로필 / 프로젝트 저장소 선택 가능
- 푸터 다국어 적용

### v1.0
- 해상도 모드 — 너비 × 높이 직접 입력 및 추천 프리셋 선택
- 용량 모드 — 1 MB ~ 20 MB 정확한 파일 크기 생성
- JPEG / WebP / PNG 포맷 지원
- 이미지에 해상도 & 용량 텍스트 오버레이 표시
- 한국어 / English 자동 감지 다국어 지원
- 광고 영역 분기 처리 및 푸터 추가
- FSD(Feature-Sliced Design) 아키텍처 적용
- OG 이미지, 파비콘, 헤더 로고 SVG 추가
- SEO 메타 태그 및 Schema.org 구조화 데이터 설정
- 입력값 유효성 검사

---

© 2025 장석원. All rights reserved.
