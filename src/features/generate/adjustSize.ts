import { drawToCanvas, canvasToBlob, applyAlphaNoise } from '../../shared/lib/canvas.js'
import { formatBytes } from '../../shared/lib/format.js'
import type { Messages } from '../../shared/i18n/messages.js'

export async function adjustToTargetSize(
  canvas: HTMLCanvasElement,
  targetBytes: number,
  mime: string,
  bgColor: string,
  textColor: string,
  baseW: number,
  baseH: number,
  onProgress: (pct: number, msg?: string) => void,
  t: Messages
): Promise<Blob> {
  const allowance = 50 * 1024

  if (mime === 'image/png') {
    drawToCanvas(canvas, baseW, baseH, bgColor, textColor, [], 0, false)
    const cleanBlob = await canvasToBlob(canvas, 'image/png')

    if (cleanBlob.size >= targetBytes) return cleanBlob

    // 풀 커버리지로 최대 크기 확인
    drawToCanvas(canvas, baseW, baseH, bgColor, textColor, [], 0, false)
    applyAlphaNoise(canvas, 1.0)
    let pngMaxBlob = await canvasToBlob(canvas, 'image/png')

    // 최대 크기가 목표보다 작으면 해상도 스케일업
    if (pngMaxBlob.size < targetBytes) {
      onProgress(15, `${t.scalingUp} (${t.maxReached}: ${formatBytes(pngMaxBlob.size)})`)

      let lowS = 1.0
      let highS = Math.sqrt(targetBytes / pngMaxBlob.size) * 2.2
      const maxScaleIter = 15

      for (let i = 0; i < maxScaleIter; i++) {
        const midS = (lowS + highS) / 2
        const sw = Math.round(baseW * midS)
        const sh = Math.round(baseH * midS)
        drawToCanvas(canvas, sw, sh, bgColor, textColor, [], 0, false)
        applyAlphaNoise(canvas, 1.0)
        pngMaxBlob = await canvasToBlob(canvas, 'image/png')
        onProgress(Math.round((i / maxScaleIter) * 55) + 15, `${t.scalingUp} ${sw}×${sh} (${formatBytes(pngMaxBlob.size)})`)

        if (pngMaxBlob.size >= targetBytes && pngMaxBlob.size - targetBytes < allowance) break
        if (highS - lowS < 0.05) break
        if (pngMaxBlob.size < targetBytes) lowS = midS
        else highS = midS
      }

      if (pngMaxBlob.size < targetBytes) {
        onProgress(99, `${t.maxReached}: ${formatBytes(pngMaxBlob.size)}`)
        return pngMaxBlob
      }
    }

    const finalW = canvas.width
    const finalH = canvas.height
    let low = 0.0, high = 1.0, blob = pngMaxBlob
    for (let i = 0; i < 12; i++) {
      const mid = (low + high) / 2
      drawToCanvas(canvas, finalW, finalH, bgColor, textColor, [], 0, false)
      applyAlphaNoise(canvas, mid)
      blob = await canvasToBlob(canvas, 'image/png')
      onProgress(Math.round((i / 12) * 30) + 68, `${t.finetuning} (${formatBytes(blob.size)})`)

      if (blob.size >= targetBytes && blob.size - targetBytes < allowance) break
      if (high - low < 0.001) break
      if (blob.size < targetBytes) low = mid
      else high = mid
    }
    return blob
  }

  drawToCanvas(canvas, baseW, baseH, bgColor, textColor, [], 255, false)
  let maxBlob = await canvasToBlob(canvas, mime, 1.0)

  if (maxBlob.size < targetBytes) {
    onProgress(15, `${t.scalingUp} (${t.maxReached}: ${formatBytes(maxBlob.size)})`)

    let lowS = 1.0
    let highS = Math.sqrt(targetBytes / maxBlob.size) * 2.2
    const maxScaleIter = 15

    for (let i = 0; i < maxScaleIter; i++) {
      const midS = (lowS + highS) / 2
      const sw = Math.round(baseW * midS)
      const sh = Math.round(baseH * midS)
      drawToCanvas(canvas, sw, sh, bgColor, textColor, [], 255, false)
      maxBlob = await canvasToBlob(canvas, mime, 1.0)
      onProgress(Math.round((i / maxScaleIter) * 55) + 15, `${t.scalingUp} ${sw}×${sh} (${formatBytes(maxBlob.size)})`)

      if (maxBlob.size >= targetBytes && maxBlob.size - targetBytes < allowance) break
      if (highS - lowS < 0.05) break
      if (maxBlob.size < targetBytes) lowS = midS
      else highS = midS
    }
  }

  const finalW = canvas.width
  const finalH = canvas.height
  let low = 0, high = 255
  let blob = maxBlob

  for (let i = 0; i < 25; i++) {
    const noise = Math.round((low + high) / 2)
    drawToCanvas(canvas, finalW, finalH, bgColor, textColor, [], noise, false)
    blob = await canvasToBlob(canvas, mime, 1.0)
    onProgress(Math.round((i / 25) * 30) + 68, `${t.finetuning} (${formatBytes(blob.size)})`)

    if (blob.size >= targetBytes && blob.size - targetBytes < allowance) break
    if (high - low <= 1) break
    if (blob.size < targetBytes) low = noise
    else high = noise
  }

  return blob
}
