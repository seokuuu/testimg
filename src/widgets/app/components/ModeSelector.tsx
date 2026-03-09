import { useApp } from '../context/AppContext.js'
import type { Mode } from '../../../shared/lib/color.js'

export default function ModeSelector() {
  const { currentMode, setMode, t } = useApp()

  return (
    <div className="grid grid-cols-2 gap-2">
      {(['resolution', 'filesize'] as Mode[]).map(mode => (
        <button
          key={mode}
          onClick={() => setMode(mode)}
          className={`px-4 py-3 rounded-xl text-sm font-semibold border transition-all ${
            currentMode === mode
              ? 'bg-violet-600 border-violet-500 text-white'
              : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:border-neutral-500'
          }`}
        >
          {mode === 'resolution' ? t.modeResolution : t.modeFilesize}
        </button>
      ))}
    </div>
  )
}
