import { hexToRgb } from './color.js'

export function drawToCanvas(
  canvas: HTMLCanvasElement,
  w: number,
  h: number,
  bgColor: string,
  textColor: string,
  infoLines: string[],
  noiseAmount = 0,
  showInfo = true
): void {
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, w, h)

  if (noiseAmount > 0) {
    const imageData = ctx.getImageData(0, 0, w, h)
    const data = imageData.data
    const { r, g, b } = hexToRgb(bgColor)
    const half = noiseAmount / 2
    for (let i = 0; i < data.length; i += 4) {
      data[i]     = Math.min(255, Math.max(0, r + (Math.random() * noiseAmount - half)))
      data[i + 1] = Math.min(255, Math.max(0, g + (Math.random() * noiseAmount - half)))
      data[i + 2] = Math.min(255, Math.max(0, b + (Math.random() * noiseAmount - half)))
    }
    ctx.putImageData(imageData, 0, 0)
  }

  if (!showInfo || !infoLines?.length) return
  drawTextLines(ctx, w, h, textColor, infoLines)
}

export function drawTextLines(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  textColor: string,
  lines: string[]
): void {
  const fontSize = Math.max(14, Math.min(w, h) * 0.055)
  ctx.fillStyle = textColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `bold ${fontSize}px 'Segoe UI', sans-serif`
  const lineHeight = fontSize * 1.7
  const startY = h / 2 - (lineHeight * (lines.length - 1)) / 2
  lines.forEach((line, i) => ctx.fillText(line, w / 2, startY + i * lineHeight))
}

export function drawTextOnly(canvas: HTMLCanvasElement, textColor: string, lines: string[]): void {
  const ctx = canvas.getContext('2d')!
  drawTextLines(ctx, canvas.width, canvas.height, textColor, lines)
}

export function canvasToBlob(canvas: HTMLCanvasElement, mime: string, quality?: number): Promise<Blob> {
  return new Promise(resolve => {
    if (mime === 'image/png') canvas.toBlob(b => resolve(b!), mime)
    else canvas.toBlob(b => resolve(b!), mime, quality)
  })
}
