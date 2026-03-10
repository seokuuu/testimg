export type ChangelogEntry = {
  version: string
  items: { en: string; ko: string }[]
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: 'v1.1',
    items: [
      { en: 'testimg.art watermark added to all generated images', ko: '생성된 이미지에 testimg.art 워터마크 추가' },
      { en: 'Resolution over 8000px is now blocked with an error message', ko: '8000px 초과 해상도 입력 시 오류 메시지 및 생성 버튼 비활성화' },
      { en: 'In-app browsers (KakaoTalk, Instagram, etc.) now show a notice instead of a failed download', ko: '카카오톡·인스타그램 등 앱 내 브라우저에서 다운로드 불가 안내 모달 표시' },
      { en: 'File name now includes target size in file size mode (e.g. image_1920x1080_2mb.jpg)', ko: '용량 모드 다운로드 파일명에 용량 표기 추가 (예: image_1920x1080_2mb.jpg)' },
    ],
  },
  {
    version: 'v1.0',
    items: [
      { en: 'Resolution mode — manual input & preset selection', ko: '해상도 모드 — 직접 입력 및 추천 프리셋 선택' },
      { en: 'File size mode — generate images from 1 MB to 20 MB', ko: '용량 모드 — 1 MB ~ 20 MB 원하는 파일 크기로 생성' },
      { en: 'JPEG / WebP / PNG format support', ko: 'JPEG / WebP / PNG 포맷 지원' },
      { en: 'Resolution & size overlay on generated image', ko: '이미지에 해상도 & 용량 텍스트 표시' },
      { en: 'Auto language detection (EN / KO)', ko: '한국어 / English 자동 감지' },
      { en: 'SEO & OG image setup', ko: 'SEO 및 OG 이미지 설정' },
      { en: 'Input validation', ko: '입력값 유효성 검사' },
    ],
  },
]
