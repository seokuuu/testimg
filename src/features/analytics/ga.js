export function trackDownload({ format, mode, sizeMb, width, height }) {
  if (typeof gtag === 'undefined') return
  gtag('event', 'download', {
    file_format: format,        // 'jpeg' | 'webp' | 'png'
    generation_mode: mode,      // 'resolution' | 'filesize'
    target_size_mb: sizeMb,     // 용량 모드일 때
    image_width: width,
    image_height: height,
  })
}

export function trackPageView() {
  if (typeof gtag === 'undefined') return
  gtag('event', 'page_view')
}
