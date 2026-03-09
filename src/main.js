import './style.css'

// ── i18n ─────────────────────────────────────────────────────────────────────
const MESSAGES = {
  en: {
    title: 'Image Generator',
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
    pngNote: '※ PNG does not support size targeting',
  },
  ko: {
    title: '이미지 생성기',
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
    pngNote: '※ PNG는 용량 조절을 지원하지 않습니다',
  },
}

// ── 추천 해상도 (바탕화면 all_ratio 기반) ────────────────────────────────────
const PRESETS = [
  { label: '160 × 120', w: 160, h: 120, ratio: '4:3' },
  { label: '240 × 160', w: 240, h: 160, ratio: '3:2' },
  { label: '320 × 240', w: 320, h: 240, ratio: '4:3' },
  { label: '400 × 240', w: 400, h: 240, ratio: '5:3' },
  { label: '480 × 320', w: 480, h: 320, ratio: '3:2' },
  { label: '640 × 360', w: 640, h: 360, ratio: '16:9' },
  { label: '640 × 480', w: 640, h: 480, ratio: '4:3' },
  { label: '800 × 480', w: 800, h: 480, ratio: '5:3' },
  { label: '800 × 600', w: 800, h: 600, ratio: '4:3' },
  { label: '854 × 480', w: 854, h: 480, ratio: '16:9' },
  { label: '960 × 540', w: 960, h: 540, ratio: '16:9' },
  { label: '960 × 640', w: 960, h: 640, ratio: '3:2' },
  { label: '1024 × 576', w: 1024, h: 576, ratio: '16:9' },
  { label: '1024 × 600', w: 1024, h: 600, ratio: '~17:10' },
  { label: '1024 × 768', w: 1024, h: 768, ratio: '4:3' },
  { label: '1152 × 864', w: 1152, h: 864, ratio: '4:3' },
  { label: '1280 × 720', w: 1280, h: 720, ratio: '16:9' },
  { label: '1280 × 768', w: 1280, h: 768, ratio: '5:3' },
  { label: '1280 × 800', w: 1280, h: 800, ratio: '16:10' },
  { label: '1280 × 1024', w: 1280, h: 1024, ratio: '5:4' },
  { label: '1366 × 768', w: 1366, h: 768, ratio: '16:9' },
  { label: '1400 × 1050', w: 1400, h: 1050, ratio: '4:3' },
  { label: '1440 × 900', w: 1440, h: 900, ratio: '16:10' },
  { label: '1600 × 900', w: 1600, h: 900, ratio: '16:9' },
  { label: '1600 × 1200', w: 1600, h: 1200, ratio: '4:3' },
  { label: '1680 × 1050', w: 1680, h: 1050, ratio: '16:10' },
  { label: '1920 × 1080', w: 1920, h: 1080, ratio: '16:9' },
  { label: '1920 × 1200', w: 1920, h: 1200, ratio: '16:10' },
  { label: '2048 × 1536', w: 2048, h: 1536, ratio: '4:3' },
  { label: '2560 × 1440', w: 2560, h: 1440, ratio: '16:9' },
  { label: '2560 × 1600', w: 2560, h: 1600, ratio: '16:10' },
  { label: '2560 × 2048', w: 2560, h: 2048, ratio: '5:4' },
  { label: '2880 × 1800', w: 2880, h: 1800, ratio: '16:10' },
  { label: '3072 × 1920', w: 3072, h: 1920, ratio: '16:10' },
  { label: '3200 × 1800', w: 3200, h: 1800, ratio: '16:9' },
  { label: '3200 × 2048', w: 3200, h: 2048, ratio: '~3:2' },
  { label: '3200 × 2400', w: 3200, h: 2400, ratio: '4:3' },
  { label: '3840 × 2160', w: 3840, h: 2160, ratio: '16:9 (4K)' },
  { label: '3840 × 2400', w: 3840, h: 2400, ratio: '16:10' },
  { label: '4096 × 3072', w: 4096, h: 3072, ratio: '4:3' },
  { label: '5120 × 2880', w: 5120, h: 2880, ratio: '16:9 (5K)' },
  { label: '5120 × 3200', w: 5120, h: 3200, ratio: '16:10' },
  { label: '5120 × 4096', w: 5120, h: 4096, ratio: '5:4' },
  { label: '6400 × 4096', w: 6400, h: 4096, ratio: '~3:2' },
  { label: '6400 × 4800', w: 6400, h: 4800, ratio: '4:3' },
  { label: '7680 × 4320', w: 7680, h: 4320, ratio: '16:9 (8K)' },
  { label: '7680 × 4800', w: 7680, h: 4800, ratio: '16:10' },
]

// ── 색상 팔레트 (20가지 조합) ─────────────────────────────────────────────────
// MB 구간별로 자동 할당: 0~1, 1~2, ... (1MB 단위, 20개)
const COLOR_PALETTES = [
  { bg: '#1a1a2e', text: '#e0e0ff' }, // ~1MB
  { bg: '#16213e', text: '#a8d8ea' }, // ~2MB
  { bg: '#0f3460', text: '#f5f5f5' }, // ~3MB
  { bg: '#533483', text: '#ffe0f0' }, // ~4MB
  { bg: '#2d6a4f', text: '#d8f3dc' }, // ~5MB
  { bg: '#1b4332', text: '#95d5b2' }, // ~6MB
  { bg: '#7b2d00', text: '#ffe8d6' }, // ~7MB
  { bg: '#6d2b3d', text: '#ffd6e0' }, // ~8MB
  { bg: '#1a3a4a', text: '#b2ebf2' }, // ~9MB
  { bg: '#2c2c54', text: '#c8b6ff' }, // ~10MB
  { bg: '#4a4e69', text: '#f2e9e4' }, // ~11MB
  { bg: '#3d405b', text: '#e0fbfc' }, // ~12MB
  { bg: '#264653', text: '#e9c46a' }, // ~13MB
  { bg: '#2a9d8f', text: '#264653' }, // ~14MB
  { bg: '#e9c46a', text: '#264653' }, // ~15MB
  { bg: '#f4a261', text: '#1a1a1a' }, // ~16MB
  { bg: '#e76f51', text: '#fff8f0' }, // ~17MB
  { bg: '#6a0572', text: '#f8c8ff' }, // ~18MB
  { bg: '#0d7377', text: '#e0f7fa' }, // ~19MB
  { bg: '#14213d', text: '#fca311' }, // ~20MB
]

function getPalette(targetMB) {
  const idx = Math.min(19, Math.max(0, Math.floor(targetMB) - 1))
  return COLOR_PALETTES[idx]
}

// ── 언어 감지 ─────────────────────────────────────────────────────────────────
let lang = navigator.language?.startsWith('ko') ? 'ko' : 'en'
let t = MESSAGES[lang]

// ── 앱 렌더링 ─────────────────────────────────────────────────────────────────
function render() {
  t = MESSAGES[lang]
  document.documentElement.lang = lang
  document.title = `${t.title} — Create Test Images by Size or Resolution`
  document.querySelector('#app').innerHTML = buildHTML()
  bindEvents()
  drawPreview()
}

function buildHTML() {
  return `
  <div class="max-w-xl mx-auto px-4 py-10 flex flex-col gap-6">

    <!-- Header -->
    <header class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-white">${t.title}</h1>
        <p class="text-sm text-neutral-400 mt-1">${t.subtitle}</p>
      </div>
      <div class="flex items-center gap-3 shrink-0">
        <a href="https://github.com/seokuuu" target="_blank" rel="noopener"
           class="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          장석원
        </a>
        <button id="btn-lang" class="text-xs px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition-colors">
          ${lang === 'en' ? '한국어' : 'English'}
        </button>
      </div>
    </header>

    <!-- Mode selector -->
    <div class="grid grid-cols-2 gap-2">
      <button data-mode="resolution" class="mode-btn px-4 py-3 rounded-xl text-sm font-semibold border transition-all
        ${currentMode === 'resolution' ? 'bg-violet-600 border-violet-500 text-white' : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:border-neutral-500'}">
        ${t.modeResolution}
      </button>
      <button data-mode="filesize" class="mode-btn px-4 py-3 rounded-xl text-sm font-semibold border transition-all
        ${currentMode === 'filesize' ? 'bg-violet-600 border-violet-500 text-white' : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:border-neutral-500'}">
        ${t.modeFilesize}
      </button>
    </div>

    <!-- Resolution Mode -->
    ${currentMode === 'resolution' ? `
    <section class="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col gap-4">
      <p class="text-xs font-semibold uppercase tracking-widest text-neutral-500">${t.resolution}</p>

      <!-- Sub mode: manual / preset -->
      <div class="grid grid-cols-2 gap-2">
        <button data-sub="manual" class="sub-btn px-3 py-2 rounded-lg text-sm font-medium border transition-all
          ${resSubMode === 'manual' ? 'bg-violet-700/40 border-violet-600 text-violet-200' : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-500'}">
          ${t.manualInput}
        </button>
        <button data-sub="preset" class="sub-btn px-3 py-2 rounded-lg text-sm font-medium border transition-all
          ${resSubMode === 'preset' ? 'bg-violet-700/40 border-violet-600 text-violet-200' : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-500'}">
          ${t.recommended}
        </button>
      </div>

      ${resSubMode === 'manual' ? `
      <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div class="flex flex-col gap-1">
          <label class="text-xs text-neutral-500">${t.widthPx}</label>
          <input id="width" type="number" value="${currentW}" min="1" max="8000"
            class="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 w-full" />
        </div>
        <span class="text-neutral-600 mt-5">×</span>
        <div class="flex flex-col gap-1">
          <label class="text-xs text-neutral-500">${t.heightPx}</label>
          <input id="height" type="number" value="${currentH}" min="1" max="8000"
            class="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 w-full" />
        </div>
      </div>
      ` : `
      <button id="btn-open-preset"
        class="w-full flex items-center justify-between px-4 py-3 bg-neutral-800 border border-neutral-700 hover:border-violet-500 rounded-xl text-sm text-neutral-300 transition-colors">
        <span id="preset-label">${selectedPreset ? selectedPreset.label + ' (' + selectedPreset.ratio + ')' : t.selectPreset}</span>
        <svg class="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
      </button>
      `}
    </section>
    ` : ''}

    <!-- File Size Mode -->
    ${currentMode === 'filesize' ? `
    <section class="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col gap-4">
      <p class="text-xs font-semibold uppercase tracking-widest text-neutral-500">${t.fileSize}</p>
      <div class="flex flex-col gap-1">
        <label class="text-xs text-neutral-500">${t.sizeMB} <span class="text-neutral-600">(${t.sizeRange})</span></label>
        <input id="target-size" type="number" value="${targetSizeMB}" min="1" max="20" step="0.1"
          class="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 w-full" />
      </div>
      <p class="text-xs text-neutral-600">${t.pngNote}</p>
    </section>
    ` : ''}

    <!-- Format -->
    <section class="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col gap-3">
      <p class="text-xs font-semibold uppercase tracking-widest text-neutral-500">${t.format}</p>
      <div class="grid grid-cols-3 gap-2">
        ${(currentMode === 'filesize' ? ['image/jpeg', 'image/webp'] : ['image/jpeg', 'image/webp', 'image/png']).map(mime => {
          const label = mime.split('/')[1].toUpperCase()
          const active = currentFormat === mime
          return `<button data-fmt="${mime}" class="fmt-btn px-3 py-2 rounded-lg text-sm font-medium border transition-all
            ${active ? 'bg-violet-700/40 border-violet-600 text-violet-200' : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-500'}">${label}</button>`
        }).join('')}
      </div>
    </section>

    <!-- Show info toggle -->
    <label class="flex items-center gap-3 cursor-pointer select-none">
      <div class="relative">
        <input type="checkbox" id="show-info" class="sr-only peer" ${showInfo ? 'checked' : ''} />
        <div class="w-10 h-6 bg-neutral-700 rounded-full peer-checked:bg-violet-600 transition-colors"></div>
        <div class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
      </div>
      <span class="text-sm text-neutral-400">${t.showInfo}</span>
    </label>

    <!-- Preview -->
    <section class="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col items-center gap-3">
      <p class="text-xs font-semibold uppercase tracking-widest text-neutral-500 self-start">${t.preview}</p>
      <canvas id="preview-canvas" class="max-w-full max-h-64 rounded-lg object-contain"></canvas>
      <p id="preview-meta" class="text-xs text-neutral-600">${t.previewPlaceholder}</p>
    </section>

    <!-- Progress -->
    <div id="progress-wrap" class="hidden flex-col gap-1">
      <div class="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
        <div id="progress-bar" class="h-full bg-violet-500 transition-all duration-100" style="width:0%"></div>
      </div>
      <p id="status-text" class="text-xs text-neutral-500 text-center"></p>
    </div>

    <!-- Generate button -->
    <button id="btn-generate"
      class="w-full py-4 rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-[0.98] text-white font-semibold text-base transition-all disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed">
      ${t.generate}
    </button>

  </div>

  <!-- Preset Modal -->
  <div id="preset-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/70 backdrop-blur-sm p-4">
    <div class="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-md flex flex-col max-h-[80vh]">
      <div class="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
        <h2 class="font-semibold text-white">${t.selectPreset}</h2>
        <button id="btn-close-modal" class="text-neutral-400 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="px-5 py-3 border-b border-neutral-800">
        <input id="preset-search" type="text" placeholder="${t.searchPreset}"
          class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500" />
      </div>
      <ul id="preset-list" class="overflow-y-auto flex-1 py-2">
        ${PRESETS.map((p, i) => `
        <li>
          <button data-idx="${i}" class="preset-item w-full text-left px-5 py-3 hover:bg-neutral-800 transition-colors flex items-center justify-between">
            <span class="text-sm text-white font-medium">${p.label}</span>
            <span class="text-xs text-neutral-500 ml-2">${p.ratio}</span>
          </button>
        </li>`).join('')}
      </ul>
    </div>
  </div>
  `
}

// ── 상태 ──────────────────────────────────────────────────────────────────────
let currentMode = 'resolution'
let resSubMode = 'manual'
let currentW = 1920
let currentH = 1080
let currentFormat = 'image/jpeg'
let targetSizeMB = 5
let showInfo = true
let selectedPreset = null

// ── 이벤트 바인딩 ─────────────────────────────────────────────────────────────
function bindEvents() {
  // 언어 전환
  document.getElementById('btn-lang')?.addEventListener('click', () => {
    lang = lang === 'en' ? 'ko' : 'en'
    render()
  })

  // 모드 전환
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentMode = btn.dataset.mode
      if (currentMode === 'filesize' && currentFormat === 'image/png') currentFormat = 'image/jpeg'
      render()
    })
  })

  // 해상도 서브모드
  document.querySelectorAll('.sub-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      resSubMode = btn.dataset.sub
      render()
    })
  })

  // 포맷 선택
  document.querySelectorAll('.fmt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFormat = btn.dataset.fmt
      render()
    })
  })

  // 직접입력 해상도
  document.getElementById('width')?.addEventListener('input', e => {
    currentW = parseInt(e.target.value) || currentW
    drawPreview()
  })
  document.getElementById('height')?.addEventListener('input', e => {
    currentH = parseInt(e.target.value) || currentH
    drawPreview()
  })

  // 용량 입력
  document.getElementById('target-size')?.addEventListener('input', e => {
    targetSizeMB = parseFloat(e.target.value) || targetSizeMB
    drawPreview()
  })

  // show info 토글
  document.getElementById('show-info')?.addEventListener('change', e => {
    showInfo = e.target.checked
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
      selectedPreset = p
      currentW = p.w
      currentH = p.h
      closeModal()
      render()
    })
  })

  // 생성 버튼
  document.getElementById('btn-generate')?.addEventListener('click', handleGenerate)
}

function closeModal() {
  const modal = document.getElementById('preset-modal')
  modal.classList.add('hidden')
  modal.classList.remove('flex')
}

// ── 색상 결정 ─────────────────────────────────────────────────────────────────
function getColors() {
  if (currentMode === 'filesize') {
    return getPalette(targetSizeMB)
  }
  // 해상도 모드: 픽셀 수 기반으로 팔레트 인덱스 결정
  const pixels = currentW * currentH
  const idx = Math.min(19, Math.floor(pixels / (7680 * 4320 / 20)))
  return COLOR_PALETTES[idx]
}

// ── Canvas 그리기 ─────────────────────────────────────────────────────────────
function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  }
}

function drawToCanvas(canvas, w, h, bgColor, textColor, infoLines, noiseAmount = 0) {
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')

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

function drawTextLines(ctx, w, h, textColor, lines) {
  const fontSize = Math.max(14, Math.min(w, h) * 0.055)
  ctx.fillStyle = textColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `bold ${fontSize}px 'Segoe UI', sans-serif`
  const lineHeight = fontSize * 1.7
  const startY = h / 2 - (lineHeight * (lines.length - 1)) / 2
  lines.forEach((line, i) => ctx.fillText(line, w / 2, startY + i * lineHeight))
}

function drawTextOnly(canvas, textColor, lines) {
  const ctx = canvas.getContext('2d')
  drawTextLines(ctx, canvas.width, canvas.height, textColor, lines)
}

// ── 미리보기 ──────────────────────────────────────────────────────────────────
function drawPreview() {
  const canvas = document.getElementById('preview-canvas')
  if (!canvas) return
  const { bg, text } = getColors()
  const w = currentW, h = currentH
  const lines = showInfo ? [`${w} × ${h} px`, '···'] : []
  drawToCanvas(canvas, w, h, bg, text, lines)
  document.getElementById('preview-meta').textContent = `${w} × ${h} px`
}

// ── Canvas → Blob ─────────────────────────────────────────────────────────────
function canvasToBlob(canvas, mime, quality) {
  return new Promise(resolve => {
    if (mime === 'image/png') canvas.toBlob(resolve, mime)
    else canvas.toBlob(resolve, mime, quality)
  })
}

// ── 이진탐색 (노이즈 + 해상도 스케일업) ─────────────────────────────────────
// 노이즈만 그림 (텍스트 없음) — 텍스트는 완료 후 1회만 렌더링
async function adjustToTargetSize(canvas, targetBytes, mime, bgColor, textColor, baseW, baseH, onProgress) {
  if (mime === 'image/png') return canvasToBlob(canvas, mime)

  const allowance = 50 * 1024 // 50KB 허용오차

  drawToCanvas(canvas, baseW, baseH, bgColor, textColor, [], 255)
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
      drawToCanvas(canvas, sw, sh, bgColor, textColor, [], 255)
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
    drawToCanvas(canvas, finalW, finalH, bgColor, textColor, [], noise)
    blob = await canvasToBlob(canvas, mime, 1.0)
    onProgress(Math.round((i / 25) * 30) + 68, `${t.finetuning} (${formatBytes(blob.size)})`)

    if (blob.size >= targetBytes && blob.size - targetBytes < allowance) break
    if (high - low <= 1) break
    if (blob.size < targetBytes) low = noise
    else high = noise
  }

  return blob
}

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  return (bytes / 1024).toFixed(1) + ' KB'
}

// ── 생성 & 다운로드 ───────────────────────────────────────────────────────────
async function handleGenerate() {
  // 유효성 체크
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

  const { bg, text } = getColors()
  const canvas = document.createElement('canvas')

  try {
    let blob

    if (currentMode === 'resolution') {
      const lines = showInfo ? [`${currentW} × ${currentH} px`] : []
      drawToCanvas(canvas, currentW, currentH, bg, text, lines)
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
      })

      if (showInfo) {
        const finalLines = [`${canvas.width} × ${canvas.height} px`, formatBytes(blob.size)]
        drawTextOnly(canvas, text, finalLines)
        blob = await canvasToBlob(canvas, currentFormat, 1.0)
      }
    }

    setProgress(100, `${t.done} ${formatBytes(blob.size)}`)

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

function setProgress(pct, msg) {
  const bar = document.getElementById('progress-bar')
  const txt = document.getElementById('status-text')
  if (bar) bar.style.width = pct + '%'
  if (txt && msg) txt.textContent = msg
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

// ── 초기 렌더링 ───────────────────────────────────────────────────────────────
render()
