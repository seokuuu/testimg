import { useState } from 'react'
import { useApp } from '../context/AppContext.js'
import { getColors } from '../../../shared/lib/color.js'
import { drawToCanvas, drawTextOnly, canvasToBlob } from '../../../shared/lib/canvas.js'
import { formatBytes } from '../../../shared/lib/format.js'
import { adjustToTargetSize } from '../../../features/generate/adjustSize.js'
import { trackDownload } from '../../../features/analytics/ga.js'

export default function GenerateButton() {
  const { currentMode, currentW, currentH, currentFormat, targetSizeMB, showInfo, isGenerateDisabled, t } = useApp()
  const [progress, setProgress] = useState(0)
  const [statusMsg, setStatusMsg] = useState('')
  const [generating, setGenerating] = useState(false)

  function updateProgress(pct: number, msg = '') {
    setProgress(pct)
    if (msg) setStatusMsg(msg)
  }

  async function handleGenerate() {
    if (currentMode === 'resolution') {
      if (!currentW || !currentH || currentW < 1 || currentH < 1) {
        setStatusMsg(t.errorResolution)
        return
      }
    } else {
      if (!targetSizeMB) { setStatusMsg(t.errorSizeNum); return }
      if (targetSizeMB < 1 || targetSizeMB > 20) { setStatusMsg(t.errorSizeRange); return }
    }

    setGenerating(true)
    updateProgress(5, t.generating)

    const { bg, text } = getColors(currentMode, targetSizeMB, currentW, currentH)
    const canvas = document.createElement('canvas')

    try {
      let blob: Blob

      if (currentMode === 'resolution') {
        const lines = showInfo ? [`${currentW} × ${currentH} px`] : []
        drawToCanvas(canvas, currentW, currentH, bg, text, lines, 0, showInfo)
        updateProgress(50, t.adjusting)
        blob = await canvasToBlob(canvas, currentFormat, 1.0)
        updateProgress(90)
      } else {
        const fsW = 1920, fsH = 1080
        canvas.width = fsW
        canvas.height = fsH
        const targetBytes = targetSizeMB * 1024 * 1024
        blob = await adjustToTargetSize(canvas, targetBytes, currentFormat, bg, text, fsW, fsH, updateProgress, t)

        if (showInfo) {
          const finalLines = [`${canvas.width} × ${canvas.height} px`, formatBytes(blob.size)]
          drawTextOnly(canvas, text, finalLines)
          blob = await canvasToBlob(canvas, currentFormat, 1.0)
        }
      }

      updateProgress(100, `${t.done} ${formatBytes(blob.size)}`)

      trackDownload({
        format: currentFormat.split('/')[1],
        mode: currentMode,
        sizeMb: currentMode === 'filesize' ? targetSizeMB : null,
        width: canvas.width,
        height: canvas.height,
      })

      const previewCanvas = document.getElementById('preview-canvas') as HTMLCanvasElement | null
      if (previewCanvas) {
        const ctx = previewCanvas.getContext('2d')!
        previewCanvas.width = canvas.width
        previewCanvas.height = canvas.height
        ctx.drawImage(canvas, 0, 0)
        const meta = document.getElementById('preview-meta')
        if (meta) meta.textContent = `${canvas.width} × ${canvas.height} px · ${formatBytes(blob.size)} · ${currentFormat.split('/')[1].toUpperCase()}`
      }

      const ext = currentFormat.split('/')[1]
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `image_${canvas.width}x${canvas.height}.${ext}`
      a.click()
      URL.revokeObjectURL(url)

    } catch (e) {
      setStatusMsg('Error occurred.')
      console.error(e)
    } finally {
      setGenerating(false)
      setTimeout(() => {
        setProgress(0)
        setStatusMsg('')
      }, 2000)
    }
  }

  return (
    <>
      {(generating || statusMsg) && (
        <div className="flex flex-col gap-1">
          <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-neutral-500 text-center">{statusMsg}</p>
        </div>
      )}
      <button
        disabled={isGenerateDisabled || generating}
        onClick={handleGenerate}
        className="w-full py-4 rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-[0.98] text-white font-semibold text-base transition-all disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed"
      >
        {generating ? t.generating : t.generate}
      </button>
    </>
  )
}
