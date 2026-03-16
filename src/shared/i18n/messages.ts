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
  decimalNote: string
  feedbackButton: string
  feedbackTitle: string
  feedbackClose: string
  feedbackThankYou: string
  feedbackSentSuccess: string
  feedbackTypeLabel: string
  feedbackTypeBug: string
  feedbackTypeFeature: string
  feedbackTypeOther: string
  feedbackMessageLabel: string
  feedbackMessageRequired: string
  feedbackMessagePlaceholder: string
  feedbackEmailLabel: string
  feedbackEmailOptional: string
  feedbackErrorSend: string
  feedbackCancel: string
  feedbackSending: string
  feedbackSubmit: string
  footerAuthor: string
  errorMaxResolution: string
  inAppBrowserTitle: string
  inAppBrowserNotice: string
}

export const MESSAGES: Record<Lang, Messages> = {
  en: {
    title: 'TestImg',
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
    decimalNote: '※ Output file size may vary slightly from the target',
    feedbackButton: 'Send Feedback',
    feedbackTitle: 'Send Feedback',
    feedbackClose: 'Close',
    feedbackThankYou: 'Thank you!',
    feedbackSentSuccess: 'Your feedback has been sent successfully.',
    feedbackTypeLabel: 'Type',
    feedbackTypeBug: 'Bug Report',
    feedbackTypeFeature: 'Feature Request',
    feedbackTypeOther: 'Other',
    feedbackMessageLabel: 'Message',
    feedbackMessageRequired: '(required)',
    feedbackMessagePlaceholder: 'Enter your message…',
    feedbackEmailLabel: 'Email',
    feedbackEmailOptional: '(optional, for replies)',
    feedbackErrorSend: 'Failed to send. Please try again later.',
    feedbackCancel: 'Cancel',
    feedbackSending: 'Sending…',
    feedbackSubmit: 'Submit',
    footerAuthor: 'Jang Seokwon',
    errorMaxResolution: 'Max resolution is 8000px',
    inAppBrowserTitle: 'Download Not Available',
    inAppBrowserNotice: 'Downloads are not supported in this in-app browser. \n Tap the (⋯) menu and select "Open in browser".',
  },
  ko: {
    title: 'TestImg',
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
    decimalNote: '※ 용량은 소수점 단위 오차가 있을 수 있습니다',
    feedbackButton: '피드백 보내기',
    feedbackTitle: '피드백 보내기',
    feedbackClose: '닫기',
    feedbackThankYou: '감사합니다!',
    feedbackSentSuccess: '피드백이 성공적으로 전송되었습니다.',
    feedbackTypeLabel: '유형',
    feedbackTypeBug: '버그 신고',
    feedbackTypeFeature: '기능 제안',
    feedbackTypeOther: '기타',
    feedbackMessageLabel: '내용',
    feedbackMessageRequired: '(필수)',
    feedbackMessagePlaceholder: '내용을 입력해주세요…',
    feedbackEmailLabel: '이메일',
    feedbackEmailOptional: '(선택, 답변 받으실 경우)',
    feedbackErrorSend: '전송에 실패했습니다. 잠시 후 다시 시도해주세요.',
    feedbackCancel: '취소',
    feedbackSending: '전송 중…',
    feedbackSubmit: '제출',
    footerAuthor: '장석원',
    errorMaxResolution: '최대 해상도는 8000px입니다',
    inAppBrowserTitle: '다운로드 불가',
    inAppBrowserNotice: '앱 내 브라우저에서는 다운로드가 지원되지 않습니다. \n (⋯) 메뉴에서 "외부 브라우저로 열기"를 선택해주세요.',
  },
}
