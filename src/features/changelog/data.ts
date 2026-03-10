export type ChangelogEntry = {
  version: string
  items: { en: string; ko: string }[]
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: 'v1.1',
    items: [
      { en: 'GA4 analytics integration (testimg.art domain)', ko: 'GA4 측정 ID 연동 (testimg.art 도메인)' },
      { en: 'Feedback form added (bug / suggestion / other)', ko: '피드백 게시판 추가 (버그 / 제안 / 기타)' },
      { en: 'GitHub button now shows a selection modal', ko: 'GitHub 버튼 → 모달로 저장소 선택 가능' },
      { en: 'Footer localized (EN / KO)', ko: '푸터 다국어 적용' },
    ],
  },
  {
    version: 'v1.0',
    items: [
      { en: 'Resolution mode — manual input & preset selection', ko: '해상도 모드 — 직접 입력 및 추천 프리셋' },
      { en: 'File size mode — generate images from 1 MB to 20 MB', ko: '용량 모드 — 1 MB ~ 20 MB 정확한 파일 크기 생성' },
      { en: 'JPEG / WebP / PNG format support', ko: 'JPEG / WebP / PNG 포맷 지원' },
      { en: 'Resolution & size overlay on generated image', ko: '이미지에 해상도 & 용량 텍스트 오버레이 표시' },
      { en: 'Auto language detection (EN / KO)', ko: '한국어 / English 자동 감지 다국어 지원' },
      { en: 'OG image, favicon, header logo SVG', ko: 'OG 이미지, 파비콘, 헤더 로고 SVG 추가' },
      { en: 'SEO meta tags & Schema.org structured data', ko: 'SEO 메타 태그 및 구조화 데이터 설정' },
      { en: 'FSD (Feature-Sliced Design) architecture', ko: 'FSD 아키텍처 적용' },
      { en: 'Input validation', ko: '입력값 유효성 검사' },
    ],
  },
]
