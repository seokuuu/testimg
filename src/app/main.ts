import './style.css'
import { MESSAGES } from '../shared/i18n/messages.js'
import { trackPageView } from '../features/analytics/ga.js'
import { buildHTML } from '../widgets/app/buildHTML.js'
import { bindEvents, setRender } from '../widgets/app/bindEvents.js'
import { drawPreview } from '../widgets/app/drawPreview.js'
import type { Lang } from '../shared/i18n/messages.js'

let lang: Lang = navigator.language?.startsWith('ko') ? 'ko' : 'en'

function render() {
  const t = MESSAGES[lang]
  document.documentElement.lang = lang
  document.title = `${t.title} — Create Test Images by Size or Resolution`
  document.querySelector('#app')!.innerHTML = buildHTML(t, lang)

  // 언어 전환 버튼은 여기서 직접 바인딩
  document.getElementById('btn-lang')?.addEventListener('click', () => {
    lang = lang === 'en' ? 'ko' : 'en'
    render()
  })

  bindEvents(t, lang)
  drawPreview()
}

setRender(render)

trackPageView()
render()
