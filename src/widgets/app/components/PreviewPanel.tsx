import { useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext.js'
import { getColors } from '../../../shared/lib/color.js'
import { drawToCanvas } from '../../../shared/lib/canvas.js'

export default function PreviewPanel() {
  const { currentMode, targetSizeMB, inputSize, currentW, currentH, showInfo, t } = useApp()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const { bg, text } = getColors(currentMode, targetSizeMB, currentW, currentH)
    const sizeLabel = inputSize ? `${inputSize} MB` : '··· MB'
    const lines = showInfo ? [`${currentW} × ${currentH} px`, currentMode === 'filesize' ? sizeLabel : ''] .filter(Boolean) : []
    drawToCanvas(canvas, currentW, currentH, bg, text, lines, 0, showInfo)
  }, [currentMode, targetSizeMB, inputSize, currentW, currentH, showInfo])

  return (
    <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col items-center gap-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 self-start">{t.preview}</p>
      <canvas id="preview-canvas" ref={canvasRef} className="max-w-full max-h-64 rounded-lg object-contain" />
      <p id="preview-meta" className="text-xs text-neutral-600">{currentW} × {currentH} px</p>
    </section>
  )
}
