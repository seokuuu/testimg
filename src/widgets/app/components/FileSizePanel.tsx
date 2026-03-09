import { useApp } from '../context/AppContext.js'

export default function FileSizePanel() {
  const { inputSize, setSize, t } = useApp()

  return (
    <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col gap-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">{t.fileSize}</p>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-neutral-500">
          {t.sizeMB} <span className="text-neutral-600">({t.sizeRange})</span>
        </label>
        <input
          type="number" value={inputSize} min="1" max="20" step="1"
          onChange={e => setSize(e.target.value)}
          className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 w-full"
        />
      </div>
      <p className="text-xs text-neutral-600">{t.pngNote}</p>
    </section>
  )
}
