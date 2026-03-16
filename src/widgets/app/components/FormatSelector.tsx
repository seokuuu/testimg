import { useApp } from '../context/AppContext.js'

export default function FormatSelector() {
  const { currentMode, currentFormat, setCurrentFormat, t } = useApp()

  const formats = ['image/jpeg', 'image/webp', 'image/png']

  return (
    <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">{t.format}</p>
      <div className="grid gap-2 grid-cols-3">
        {formats.map(mime => (
          <button
            key={mime}
            onClick={() => setCurrentFormat(mime)}
            className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
              currentFormat === mime
                ? 'bg-violet-700/40 border-violet-600 text-violet-200'
                : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-500'
            }`}
          >
            {mime.split('/')[1].toUpperCase()}
          </button>
        ))}
      </div>
    </section>
  )
}
