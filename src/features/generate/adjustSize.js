import { drawToCanvas, canvasToBlob } from '../../shared/lib/canvas.js'
import { formatBytes } from '../../shared/lib/format.js'

export async function adjustToTargetSize(canvas, targetBytes, mime, bgColor, textColor, baseW, baseH, onProgress, t) {
  if (mime === 'image/png') return canvasToBlob(canvas, mime)

  const allowance = 50 * 1024 // 50KB 허용오차

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
