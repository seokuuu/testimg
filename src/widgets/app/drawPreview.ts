import { getColors } from '../../shared/lib/color.js'
import { drawToCanvas } from '../../shared/lib/canvas.js'
import { state } from './state.js'

export function drawPreview() {
  const canvas = document.getElementById('preview-canvas') as HTMLCanvasElement | null
  if (!canvas) return
  const { currentMode, targetSizeMB, currentW, currentH, showInfo } = state
  const { bg, text } = getColors(currentMode, targetSizeMB, currentW, currentH)
  const lines = showInfo ? [`${currentW} × ${currentH} px`, '···'] : []
  drawToCanvas(canvas, currentW, currentH, bg, text, lines, 0, showInfo)
  const meta = document.getElementById('preview-meta')
  if (meta) meta.textContent = `${currentW} × ${currentH} px`
}
