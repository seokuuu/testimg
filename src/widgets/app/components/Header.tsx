import { useApp } from '../context/AppContext.js'

export default function Header() {
  const { lang, t, toggleLang } = useApp()

  return (
    <header className="flex items-start justify-between gap-4 mb-8">
      <div>
        <h1>
          <img src="/testimg-logo.svg" alt={t.title} className="h-10" />
        </h1>
        <p className="text-sm text-neutral-400 mt-1">{t.subtitle}</p>
      </div>
      <button
        onClick={toggleLang}
        className="shrink-0 text-xs px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition-colors"
      >
        {lang === 'en' ? '한국어' : 'English'}
      </button>
    </header>
  )
}
