import type { Lang } from '../../../shared/i18n/messages.js'

interface PrivacyModalProps {
  lang: Lang
  onClose: () => void
}

const CONTENT = {
  ko: {
    title: '개인정보처리방침',
    sections: [
      {
        heading: '수집하는 정보',
        body: '본 서비스는 Google Analytics 4(GA4)를 통해 방문 통계를 수집합니다. 수집되는 정보는 IP 주소(익명화), 브라우저 및 기기 정보, 페이지 방문 기록 등이며, 개인을 직접 식별하는 정보는 수집하지 않습니다.',
      },
      {
        heading: '수집 목적',
        body: '수집된 정보는 서비스 이용 현황 파악 및 품질 개선 목적으로만 사용됩니다.',
      },
      {
        heading: '제3자 제공',
        body: '수집된 정보는 Google LLC에 의해 처리됩니다. Google의 개인정보처리방침은 policies.google.com에서 확인할 수 있습니다.',
      },
      {
        heading: '쿠키',
        body: 'GA4는 쿠키를 사용합니다. 브라우저 설정에서 쿠키를 비활성화하거나, Google 애널리틱스 opt-out 브라우저 부가기능을 통해 데이터 수집을 거부할 수 있습니다.',
      },
      {
        heading: '문의',
        body: '개인정보 관련 문의는 사이트 하단의 피드백 버튼을 이용해주세요.',
      },
    ],
    close: '닫기',
  },
  en: {
    title: 'Privacy Policy',
    sections: [
      {
        heading: 'Information We Collect',
        body: 'This service uses Google Analytics 4 (GA4) to collect usage statistics. This includes anonymized IP addresses, browser and device information, and page visit data. No personally identifiable information is collected.',
      },
      {
        heading: 'Purpose',
        body: 'Collected data is used solely to understand service usage and improve quality.',
      },
      {
        heading: 'Third Parties',
        body: 'Data is processed by Google LLC. You can review Google\'s privacy policy at policies.google.com.',
      },
      {
        heading: 'Cookies',
        body: 'GA4 uses cookies. You can disable cookies in your browser settings or opt out via the Google Analytics opt-out browser add-on.',
      },
      {
        heading: 'Contact',
        body: 'For privacy-related inquiries, please use the feedback button at the bottom of the site.',
      },
    ],
    close: 'Close',
  },
}

export default function PrivacyModal({ lang, onClose }: PrivacyModalProps) {
  const c = CONTENT[lang]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-neutral-800">
          <h2 className="text-base font-semibold text-neutral-100">{c.title}</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-300 transition-colors text-lg leading-none"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-4 flex flex-col gap-5">
          {c.sections.map((s) => (
            <div key={s.heading}>
              <p className="text-xs font-semibold text-neutral-400 mb-1">{s.heading}</p>
              <p className="text-sm text-neutral-300 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="px-6 py-3 border-t border-neutral-800">
          <button
            onClick={onClose}
            className="w-full py-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            {c.close}
          </button>
        </div>
      </div>
    </div>
  )
}
