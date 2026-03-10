import { CHANGELOG } from '../data.js'
import type { Lang } from '../../../shared/i18n/messages.js'

interface ChangelogModalProps {
  lang: Lang
  onClose: () => void
}

export default function ChangelogModal({ lang, onClose }: ChangelogModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-neutral-800">
          <h2 className="text-base font-semibold text-neutral-100">Changelog</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-300 transition-colors text-lg leading-none"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-4 flex flex-col gap-6">
          {CHANGELOG.map((release) => (
            <div key={release.version}>
              <p className="text-xs font-semibold text-neutral-400 mb-2">{release.version}</p>
              <ul className="flex flex-col gap-1.5">
                {release.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-neutral-600 shrink-0" />
                    {item[lang]}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="px-6 py-3 border-t border-neutral-800">
          <button
            onClick={onClose}
            className="w-full py-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            {lang === 'ko' ? '닫기' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  )
}
