import { useState } from 'react'
import { MESSAGES, type Lang } from '../../../shared/i18n/messages.js'

const FORMSPREE_URL = 'https://formspree.io/f/xyknkrpz'

type FeedbackType = 'bug' | 'suggestion' | 'other'

interface FeedbackModalProps {
  lang: Lang
  onClose: () => void
}

export default function FeedbackModal({ lang, onClose }: FeedbackModalProps) {
  const t = MESSAGES[lang]
  const [type, setType] = useState<FeedbackType>('bug')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ type, message, email }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-neutral-100">{t.feedbackTitle}</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-300 transition-colors text-lg leading-none"
            aria-label={t.feedbackClose}
          >
            ✕
          </button>
        </div>

        {status === 'success' ? (
          <div className="text-center py-8">
            <p className="text-2xl mb-3">🙏</p>
            <p className="text-neutral-200 font-medium">{t.feedbackThankYou}</p>
            <p className="text-neutral-500 text-sm mt-1">{t.feedbackSentSuccess}</p>
            <button
              onClick={onClose}
              className="mt-6 px-5 py-2 rounded-lg bg-neutral-800 text-neutral-300 text-sm hover:bg-neutral-700 transition-colors"
            >
              {t.feedbackClose}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs text-neutral-400 mb-1.5">{t.feedbackTypeLabel}</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as FeedbackType)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-500"
              >
                <option value="bug">{t.feedbackTypeBug}</option>
                <option value="suggestion">{t.feedbackTypeFeature}</option>
                <option value="other">{t.feedbackTypeOther}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1.5">{t.feedbackMessageLabel} <span className="text-neutral-600">{t.feedbackMessageRequired}</span></label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                placeholder={t.feedbackMessagePlaceholder}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1.5">{t.feedbackEmailLabel} <span className="text-neutral-600">{t.feedbackEmailOptional}</span></label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-500"
              />
            </div>

            {status === 'error' && (
              <p className="text-xs text-red-400">{t.feedbackErrorSend}</p>
            )}

            <div className="flex gap-3 mt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 rounded-lg bg-neutral-800 text-neutral-400 text-sm hover:bg-neutral-700 transition-colors"
              >
                {t.feedbackCancel}
              </button>
              <button
                type="submit"
                disabled={status === 'submitting' || !message.trim()}
                className="flex-1 py-2 rounded-lg bg-neutral-200 text-neutral-900 text-sm font-medium hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? t.feedbackSending : t.feedbackSubmit}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
