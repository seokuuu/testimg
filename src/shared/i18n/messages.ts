export type Lang = 'en' | 'ko'

export type Messages = {
  title: string
  subtitle: string
  modeResolution: string
  modeFilesize: string
  resolution: string
  widthPx: string
  heightPx: string
  manualInput: string
  recommended: string
  fileSize: string
  sizeMB: string
  sizeRange: string
  format: string
  generate: string
  generating: string
  preview: string
  previewPlaceholder: string
  done: string
  errorResolution: string
  errorSizeRange: string
  errorSizeNum: string
  adjusting: string
  scalingUp: string
  finetuning: string
  maxReached: string
  selectPreset: string
  close: string
  searchPreset: string
  showInfo: string
  pngNote: string
}

export const MESSAGES: Record<Lang, Messages> = {
  en: {
    title: 'Image Generator',
    subtitle: 'Create test images by resolution or file size — free & instant',
    modeResolution: 'Resolution Mode',
    modeFilesize: 'File Size Mode',
    resolution: 'Resolution',
    widthPx: 'Width (px)',
    heightPx: 'Height (px)',
    manualInput: 'Manual Input',
    recommended: 'Recommended Presets',
    fileSize: 'File Size',
    sizeMB: 'Size (MB)',
    sizeRange: '1 MB – 20 MB',
    format: 'Format',
    generate: 'Generate & Download',
    generating: 'Generating…',
    preview: 'Preview',
    previewPlaceholder: 'Preview will appear here',
    done: 'Done!',
    errorResolution: 'Please enter a valid resolution.',
    errorSizeRange: 'File size must be between 1 MB and 20 MB.',
    errorSizeNum: 'Please enter a valid file size.',
    adjusting: 'Adjusting size…',
    scalingUp: 'Scaling resolution…',
    finetuning: 'Fine-tuning…',
    maxReached: 'Max reachable size',
    selectPreset: 'Select a preset resolution',
    close: 'Close',
    searchPreset: 'Search…',
    showInfo: 'Show resolution & size on image',
    pngNote: '※ PNG does not support size targeting',
  },
  ko: {
    title: '이미지 생성기',
    subtitle: '해상도 또는 용량으로 테스트 이미지를 즉시 생성하세요',
    modeResolution: '해상도 모드',
    modeFilesize: '용량 모드',
    resolution: '해상도',
    widthPx: '너비 (px)',
    heightPx: '높이 (px)',
    manualInput: '직접 입력',
    recommended: '추천 해상도',
    fileSize: '파일 크기',
    sizeMB: '크기 (MB)',
    sizeRange: '1 MB – 20 MB',
    format: '형식',
    generate: '생성 & 다운로드',
    generating: '생성 중…',
    preview: '미리보기',
    previewPlaceholder: '미리보기가 여기에 표시됩니다',
    done: '완료!',
    errorResolution: '해상도를 올바르게 입력해주세요.',
    errorSizeRange: '파일 크기는 1MB ~ 20MB 사이로 입력해주세요.',
    errorSizeNum: '파일 크기를 올바르게 입력해주세요.',
    adjusting: '크기 조정 중…',
    scalingUp: '해상도 스케일업 중…',
    finetuning: '미세 조정 중…',
    maxReached: '최대 생성 가능 크기',
    selectPreset: '추천 해상도 선택',
    close: '닫기',
    searchPreset: '검색…',
    showInfo: '이미지에 해상도 & 용량 텍스트 표시',
    pngNote: '※ PNG는 용량 조절을 지원하지 않습니다',
  },
}
