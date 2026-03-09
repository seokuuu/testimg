import { useState } from 'react'
import { useApp } from '../context/AppContext.js'
import PresetModal from './PresetModal.js'

export default function ResolutionPanel() {
  const { resSubMode, setResSubMode, inputW, inputH, setWidth, setHeight, selectedPreset, t } = useApp()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">{t.resolution}</p>

        <div className="grid grid-cols-2 gap-2">
          {(['preset', 'manual'] as const).map(sub => (
            <button
              key={sub}
              onClick={() => setResSubMode(sub)}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                resSubMode === sub
                  ? 'bg-violet-700/40 border-violet-600 text-violet-200'
                  : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-500'
              }`}
            >
              {sub === 'preset' ? t.recommended : t.manualInput}
            </button>
          ))}
        </div>

        {resSubMode === 'manual' ? (
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-neutral-500">{t.widthPx}</label>
              <input
                type="number" value={inputW} min="1" max="8000"
                onChange={e => setWidth(e.target.value)}
                className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 w-full"
              />
            </div>
            <span className="text-neutral-600 mt-5">×</span>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-neutral-500">{t.heightPx}</label>
              <input
                type="number" value={inputH} min="1" max="8000"
                onChange={e => setHeight(e.target.value)}
                className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 w-full"
              />
            </div>
          </div>
        ) : (
          <button
            onClick={() => setModalOpen(true)}
            className="w-full flex items-center justify-between px-4 py-3 bg-neutral-800 border border-neutral-700 hover:border-violet-500 rounded-xl text-sm text-neutral-300 transition-colors"
          >
            <span>{selectedPreset ? `${selectedPreset.label} (${selectedPreset.ratio})` : t.selectPreset}</span>
            <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </section>

      <PresetModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
