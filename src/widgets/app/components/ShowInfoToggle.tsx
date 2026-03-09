import { useApp } from '../context/AppContext.js'

export default function ShowInfoToggle() {
  const { showInfo, setShowInfo, t } = useApp()

  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={showInfo}
          onChange={e => setShowInfo(e.target.checked)}
        />
        <div className="w-10 h-6 bg-neutral-700 rounded-full peer-checked:bg-violet-600 transition-colors" />
        <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
      </div>
      <span className="text-sm text-neutral-400">{t.showInfo}</span>
    </label>
  )
}
