declare const gtag: (...args: unknown[]) => void

type DownloadParams = {
  format: string
  mode: string
  sizeMb: number | null
  width: number
  height: number
}

export function trackDownload({ format, mode, sizeMb, width, height }: DownloadParams): void {
  if (typeof gtag === 'undefined') return
  gtag('event', 'download', {
    file_format: format,
    generation_mode: mode,
    target_size_mb: sizeMb,
    image_width: width,
    image_height: height,
  })
}

export function trackPageView(): void {
  if (typeof gtag === 'undefined') return
  gtag('event', 'page_view')
}
