import { useState } from 'react'
import { PRESETS, type Preset } from '../../../entities/preset/presets.js'
import { useApp } from '../context/AppContext.js'

type Props = {
  open: boolean
  onClose: () => void
}

export default function PresetModal({ open, onClose }: Props) {
  const { selectPreset, t } = useApp()
  const [query, setQuery] = useState('')

  if (!open) return null

  const filtered = PRESETS.filter(p =>
    p.label.toLowerCase().includes(query.toLowerCase())
  )

  function handleSelect(preset: Preset) {
    selectPreset(preset)
    setQuery('')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-md flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
          <h2 className="font-semibold text-white">{t.selectPreset}</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-5 py-3 border-b border-neutral-800">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t.searchPreset}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
          />
        </div>
        <ul className="overflow-y-auto flex-1 py-2">
          {filtered.map(p => (
            <li key={p.label}>
              <button
                onClick={() => handleSelect(p)}
                className="w-full text-left px-5 py-3 hover:bg-neutral-800 transition-colors flex items-center justify-between"
              >
                <span className="text-sm text-white font-medium">{p.label}</span>
                <span className="text-xs text-neutral-500 ml-2">{p.ratio}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
