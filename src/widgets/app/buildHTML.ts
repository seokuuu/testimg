import { SHOW_ADS } from '../../shared/config/ads.js'
import { PRESETS } from '../../entities/preset/presets.js'
import { state } from './state.js'
import type { Messages, Lang } from '../../shared/i18n/messages.js'

export function buildHTML(t: Messages, lang: Lang) {
  const { currentMode, resSubMode, inputW, inputH, currentFormat, inputSize, showInfo, selectedPreset } = state

  const isGenerateDisabled =
    (currentMode === 'resolution' && state.resSubMode === 'manual' && (inputW === '' || inputH === '')) ||
    (currentMode === 'filesize' && inputSize === '')

  const githubIcon = `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`

  return `
  <div class="min-h-screen flex flex-col">

  <!-- 상단 광고 영역 -->
  ${SHOW_ADS ? `
  <div class="w-full flex justify-center px-4 py-3 bg-neutral-950 border-b border-neutral-800">
    <div class="w-full max-w-5xl h-[90px] bg-neutral-900 border border-dashed border-neutral-700 rounded-xl flex items-center justify-center text-xs text-neutral-600">
      광고 영역 (728×90)
    </div>
  </div>` : ''}

  <!-- 본문 -->
  <main class="flex-1 w-full max-w-5xl mx-auto px-4 py-8">

    <!-- Header -->
    <header class="flex items-start justify-between gap-4 mb-8">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-white">${t.title}</h1>
        <p class="text-sm text-neutral-400 mt-1">${t.subtitle}</p>
      </div>
      <button id="btn-lang" class="shrink-0 text-xs px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition-colors">
        ${lang === 'en' ? '한국어' : 'English'}
      </button>
    </header>

    <!-- PC 2열 레이아웃 -->
    <div class="flex flex-col lg:flex-row gap-6 items-start">

      <!-- 좌측: 설정 패널 -->
      <div class="w-full lg:flex-1 flex flex-col gap-4">

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

          <!-- Sub mode: preset / manual (preset 먼저) -->
          <div class="grid grid-cols-2 gap-2">
            <button data-sub="preset" class="sub-btn px-3 py-2 rounded-lg text-sm font-medium border transition-all
              ${resSubMode === 'preset' ? 'bg-violet-700/40 border-violet-600 text-violet-200' : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-500'}">
              ${t.recommended}
            </button>
            <button data-sub="manual" class="sub-btn px-3 py-2 rounded-lg text-sm font-medium border transition-all
              ${resSubMode === 'manual' ? 'bg-violet-700/40 border-violet-600 text-violet-200' : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-500'}">
              ${t.manualInput}
            </button>
          </div>

          ${resSubMode === 'manual' ? `
          <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-xs text-neutral-500">${t.widthPx}</label>
              <input id="width" type="number" value="${inputW}" min="1" max="9999"
                class="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 w-full" />
            </div>
            <span class="text-neutral-600 mt-5">×</span>
            <div class="flex flex-col gap-1">
              <label class="text-xs text-neutral-500">${t.heightPx}</label>
              <input id="height" type="number" value="${inputH}" min="1" max="9999"
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
            <input id="target-size" type="number" value="${inputSize}" min="1" max="20" step="1"
              class="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 w-full" />
          </div>
          <p class="text-xs text-neutral-600">${t.pngNote}</p>
          <p class="text-xs text-neutral-600">${t.decimalNote}</p>
        </section>
        ` : ''}

        <!-- Format -->
        <section class="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col gap-3">
          <p class="text-xs font-semibold uppercase tracking-widest text-neutral-500">${t.format}</p>
          <div class="grid ${currentMode === 'filesize' ? 'grid-cols-2' : 'grid-cols-3'} gap-2">
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

        <!-- 사이드 광고 (모바일에서는 숨김, PC에서는 좌측 하단에 노출) -->
        ${SHOW_ADS ? `
        <div class="hidden lg:flex w-full h-[250px] bg-neutral-900 border border-dashed border-neutral-700 rounded-xl items-center justify-center text-xs text-neutral-600">
          광고 영역 (300×250)
        </div>` : ''}

      </div>

      <!-- 우측: 미리보기 + 생성 버튼 -->
      <div class="w-full lg:w-[380px] flex flex-col gap-4 lg:sticky lg:top-6">

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
        <button id="btn-generate" ${isGenerateDisabled ? 'disabled' : ''}
          class="w-full py-4 rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-[0.98] text-white font-semibold text-base transition-all disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed">
          ${t.generate}
        </button>

        <!-- 우측 하단 광고 (PC 전용) -->
        ${SHOW_ADS ? `
        <div class="hidden lg:flex w-full h-[250px] bg-neutral-900 border border-dashed border-neutral-700 rounded-xl items-center justify-center text-xs text-neutral-600">
          광고 영역 (300×250)
        </div>` : ''}

      </div>
    </div>

    <!-- 모바일 하단 광고 -->
    ${SHOW_ADS ? `
    <div class="lg:hidden mt-6 h-[100px] bg-neutral-900 border border-dashed border-neutral-700 rounded-xl flex items-center justify-center text-xs text-neutral-600">
      광고 영역 (320×100)
    </div>` : ''}

  </main>

  <!-- Footer -->
  <footer class="w-full border-t border-neutral-800 bg-neutral-950 mt-8">
    <div class="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p class="text-xs text-neutral-600">
        © ${new Date().getFullYear()} 장석원. All rights reserved.
      </p>
      <div class="flex items-center gap-4">
        <a href="https://github.com/seokuuu" target="_blank" rel="noopener"
           class="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-400 transition-colors">
          ${githubIcon}
          GitHub
        </a>
        <span class="text-neutral-700 text-xs">·</span>
        <span class="text-xs text-neutral-700">Image Generator v1.0</span>
      </div>
    </div>
  </footer>

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
