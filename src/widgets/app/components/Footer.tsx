import { useState } from 'react'
import { FeedbackModal } from '../../../features/feedback/index.js'
import { ChangelogModal } from '../../../features/changelog/index.js'
import PrivacyModal from '../../../features/privacy/components/PrivacyModal.js'
import { useApp } from '../context/AppContext.js'

const githubIcon = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

function GitHubModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-4 pb-6 sm:pb-0"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-xs bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-3">
          <p className="text-xs text-neutral-500 mb-3">GitHub</p>
          <div className="flex flex-col gap-2">
            <a
              href="https://github.com/seokuuu/testimg"
              target="_blank"
              rel="noopener"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              <span className="text-neutral-300">{githubIcon}</span>
              <div>
                <p className="text-sm text-neutral-200 font-medium">seokuuu / testimg</p>
                <p className="text-xs text-neutral-500">TestImg 프로젝트 저장소</p>
              </div>
            </a>
            <a
              href="https://github.com/seokuuu"
              target="_blank"
              rel="noopener"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              <span className="text-neutral-300">{githubIcon}</span>
              <div>
                <p className="text-sm text-neutral-200 font-medium">seokuuu</p>
                <p className="text-xs text-neutral-500">개발자 프로필</p>
              </div>
            </a>
          </div>
        </div>
        <div className="px-5 py-3 border-t border-neutral-800">
          <button
            onClick={onClose}
            className="w-full py-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  const { t, lang } = useApp()
  const [showFeedback, setShowFeedback] = useState(false)
  const [showGitHub, setShowGitHub] = useState(false)
  const [showChangelog, setShowChangelog] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  return (
    <>
      <footer id="site-footer" className="w-full border-t border-neutral-800 bg-neutral-950 mt-8">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()}{' '}
            <a
              href="https://github.com/seokuuu"
              target="_blank"
              rel="noopener"
              className="hover:text-neutral-400 transition-colors"
            >
              {t.footerAuthor}
            </a>
            . All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowPrivacy(true)}
              className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
            >
              {lang === 'ko' ? '개인정보처리방침' : 'Privacy Policy'}
            </button>
            <span className="text-neutral-700 text-xs">·</span>
            <button
              onClick={() => setShowFeedback(true)}
              className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
            >
              {t.feedbackButton}
            </button>
            <span className="text-neutral-700 text-xs">·</span>
            <button
              onClick={() => setShowGitHub(true)}
              className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
            >
              {githubIcon}
              GitHub
            </button>
            <span className="text-neutral-700 text-xs">·</span>
            <button
              onClick={() => setShowChangelog(true)}
              className="text-xs text-neutral-700 hover:text-neutral-500 transition-colors"
            >
              testImg v1.12
            </button>
          </div>
        </div>
      </footer>

      {showFeedback && <FeedbackModal lang={lang} onClose={() => setShowFeedback(false)} />}
      {showGitHub && <GitHubModal onClose={() => setShowGitHub(false)} />}
      {showChangelog && <ChangelogModal lang={lang} onClose={() => setShowChangelog(false)} />}
      {showPrivacy && <PrivacyModal lang={lang} onClose={() => setShowPrivacy(false)} />}
    </>
  )
}
