import { PRESETS } from '../../entities/preset/presets.js'
import { getColors } from '../../shared/lib/color.js'
import { drawToCanvas, drawTextOnly, canvasToBlob } from '../../shared/lib/canvas.js'
import { formatBytes } from '../../shared/lib/format.js'
import { adjustToTargetSize } from '../../features/generate/adjustSize.js'
import { trackDownload } from '../../features/analytics/ga.js'
import { state } from './state.js'
import { drawPreview } from './drawPreview.js'

let render
export function setRender(fn) {
  render = fn
}

function closeModal() {
  const modal = document.getElementById('preset-modal')
  modal.classList.add('hidden')
  modal.classList.remove('flex')
}

function setProgress(pct, msg) {
  const bar = document.getElementById('progress-bar')
  const txt = document.getElementById('status-text')
  if (bar) bar.style.width = pct + '%'
  if (txt && msg) txt.textContent = msg
}

function updateGenerateBtn() {
  const btn = document.getElementById('btn-generate')
  if (!btn) return
  const { currentMode, resSubMode, inputW, inputH, inputSize } = state
  const disabled =
    (currentMode === 'resolution' && resSubMode === 'manual' && (inputW === '' || inputH === '')) ||
    (currentMode === 'filesize' && inputSize === '')
  btn.disabled = disabled
}

function setStatus(msg) {
  const txt = document.getElementById('status-text')
  const progressWrap = document.getElementById('progress-wrap')
  if (txt) txt.textContent = msg
  if (progressWrap) {
    progressWrap.classList.remove('hidden')
    progressWrap.classList.add('flex')
  }
}

async function handleGenerate(t) {
  const { currentMode, currentW, currentH, targetSizeMB, currentFormat, showInfo } = state

  if (currentMode === 'resolution') {
    if (!currentW || !currentH || currentW < 1 || currentH < 1) {
      setStatus(t.errorResolution)
      return
    }
  } else {
    if (!targetSizeMB) { setStatus(t.errorSizeNum); return }
    if (targetSizeMB < 1 || targetSizeMB > 20) { setStatus(t.errorSizeRange); return }
  }

  const btn = document.getElementById('btn-generate')
  const progressWrap = document.getElementById('progress-wrap')
  btn.disabled = true
  btn.textContent = t.generating
  progressWrap.classList.remove('hidden')
  progressWrap.classList.add('flex')
  setProgress(5, t.generating)

  const { bg, text } = getColors(currentMode, targetSizeMB, currentW, currentH)
  const canvas = document.createElement('canvas')

  try {
    let blob

    if (currentMode === 'resolution') {
      const lines = showInfo ? [`${currentW} × ${currentH} px`] : []
      drawToCanvas(canvas, currentW, currentH, bg, text, lines, 0, showInfo)
      setProgress(50, t.adjusting)
      blob = await canvasToBlob(canvas, currentFormat, 1.0)
      setProgress(90)

    } else {
      const fsW = 1920, fsH = 1080
      canvas.width = fsW
      canvas.height = fsH
      const targetBytes = targetSizeMB * 1024 * 1024
      blob = await adjustToTargetSize(canvas, targetBytes, currentFormat, bg, text, fsW, fsH, (pct, msg) => {
        setProgress(pct, msg)
      }, t)

      if (showInfo) {
        const finalLines = [`${canvas.width} × ${canvas.height} px`, formatBytes(blob.size)]
        drawTextOnly(canvas, text, finalLines)
        blob = await canvasToBlob(canvas, currentFormat, 1.0)
      }
    }

    setProgress(100, `${t.done} ${formatBytes(blob.size)}`)

    // GA4 다운로드 이벤트 추적
    trackDownload({
      format: currentFormat.split('/')[1],
      mode: currentMode,
      sizeMb: currentMode === 'filesize' ? targetSizeMB : null,
      width: canvas.width,
      height: canvas.height,
    })

    // 미리보기 업데이트
    const previewCanvas = document.getElementById('preview-canvas')
    if (previewCanvas) {
      const ctx = previewCanvas.getContext('2d')
      previewCanvas.width = canvas.width
      previewCanvas.height = canvas.height
      ctx.drawImage(canvas, 0, 0)
    }
    document.getElementById('preview-meta').textContent =
      `${canvas.width} × ${canvas.height} px · ${formatBytes(blob.size)} · ${currentFormat.split('/')[1].toUpperCase()}`

    // 다운로드
    const ext = currentFormat.split('/')[1]
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `image_${canvas.width}x${canvas.height}.${ext}`
    a.click()
    URL.revokeObjectURL(url)

  } catch (e) {
    setStatus('Error occurred.')
    console.error(e)
  } finally {
    btn.disabled = false
    btn.textContent = t.generate
    setTimeout(() => {
      progressWrap.classList.add('hidden')
      progressWrap.classList.remove('flex')
      setProgress(0)
    }, 2000)
  }
}

export function bindEvents(t, lang) {
  // 모드 전환
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentMode = btn.dataset.mode
      if (state.currentMode === 'filesize' && state.currentFormat === 'image/png') state.currentFormat = 'image/jpeg'
      render()
    })
  })

  // 해상도 서브모드
  document.querySelectorAll('.sub-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.resSubMode = btn.dataset.sub
      render()
    })
  })

  // 포맷 선택
  document.querySelectorAll('.fmt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentFormat = btn.dataset.fmt
      render()
    })
  })

  // 직접입력 해상도
  document.getElementById('width')?.addEventListener('input', e => {
    state.inputW = e.target.value
    const v = parseInt(e.target.value)
    if (v >= 1) state.currentW = v
    updateGenerateBtn()
    if (v >= 1) drawPreview()
  })
  document.getElementById('height')?.addEventListener('input', e => {
    state.inputH = e.target.value
    const v = parseInt(e.target.value)
    if (v >= 1) state.currentH = v
    updateGenerateBtn()
    if (v >= 1) drawPreview()
  })

  // 용량 입력
  document.getElementById('target-size')?.addEventListener('input', e => {
    // 소숫점 입력 차단: 정수만 허용
    const raw = e.target.value.replace(/[^0-9]/g, '')
    e.target.value = raw
    state.inputSize = raw
    const v = parseInt(raw)
    if (v >= 1) state.targetSizeMB = v
    updateGenerateBtn()
    if (v >= 1) drawPreview()
  })

  // show info 토글
  document.getElementById('show-info')?.addEventListener('change', e => {
    state.showInfo = e.target.checked
    drawPreview()
  })

  // 프리셋 모달 열기
  document.getElementById('btn-open-preset')?.addEventListener('click', () => {
    const modal = document.getElementById('preset-modal')
    modal.classList.remove('hidden')
    modal.classList.add('flex')
    document.getElementById('preset-search').focus()
  })

  // 모달 닫기
  document.getElementById('btn-close-modal')?.addEventListener('click', closeModal)
  document.getElementById('preset-modal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal()
  })

  // 프리셋 검색
  document.getElementById('preset-search')?.addEventListener('input', e => {
    const q = e.target.value.toLowerCase()
    document.querySelectorAll('.preset-item').forEach(btn => {
      const text = btn.textContent.toLowerCase()
      btn.closest('li').style.display = text.includes(q) ? '' : 'none'
    })
  })

  // 프리셋 선택
  document.querySelectorAll('.preset-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = PRESETS[parseInt(btn.dataset.idx)]
      state.selectedPreset = p
      state.currentW = p.w
      state.currentH = p.h
      state.inputW = String(p.w)
      state.inputH = String(p.h)
      closeModal()
      render()
    })
  })

  // 생성 버튼
  document.getElementById('btn-generate')?.addEventListener('click', () => handleGenerate(t))
}
