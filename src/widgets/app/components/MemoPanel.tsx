import { useApp } from '../context/AppContext.js'

export default function MemoPanel() {
  const { memo, setMemo, t } = useApp()

  return (
    <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
        {t.memoLabel}
      </label>
      <input
        type="text"
        value={memo}
        maxLength={30}
        placeholder={t.memoPlaceholder}
        onChange={e => setMemo(e.target.value)}
        className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 w-full"
      />
    </section>
  )
}
