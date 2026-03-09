import { useEffect } from 'react'
import { useApp } from './context/AppContext.js'
import { SHOW_ADS } from '../../shared/config/ads.js'
import Header from './components/Header.js'
import ModeSelector from './components/ModeSelector.js'
import ResolutionPanel from './components/ResolutionPanel.js'
import FileSizePanel from './components/FileSizePanel.js'
import FormatSelector from './components/FormatSelector.js'
import ShowInfoToggle from './components/ShowInfoToggle.js'
import PreviewPanel from './components/PreviewPanel.js'
import GenerateButton from './components/GenerateButton.js'
import Footer from './components/Footer.js'

export default function App() {
  const { currentMode, lang, t } = useApp()

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = `${t.title} — Create Test Images by Size or Resolution`
  }, [lang, t.title])

  return (
    <div className="min-h-screen flex flex-col">
      {SHOW_ADS && (
        <div className="w-full flex justify-center px-4 py-3 bg-neutral-950 border-b border-neutral-800">
          <div className="w-full max-w-5xl h-[90px] bg-neutral-900 border border-dashed border-neutral-700 rounded-xl flex items-center justify-center text-xs text-neutral-600">
            광고 영역 (728×90)
          </div>
        </div>
      )}

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        <Header />
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <ModeSelector />
            {currentMode === 'resolution' && <ResolutionPanel />}
            {currentMode === 'filesize' && <FileSizePanel />}
            <FormatSelector />
            <ShowInfoToggle />
            {SHOW_ADS && (
              <div className="hidden lg:flex w-full h-[250px] bg-neutral-900 border border-dashed border-neutral-700 rounded-xl items-center justify-center text-xs text-neutral-600">
                광고 영역 (300×250)
              </div>
            )}
          </div>
          <div className="w-full lg:w-[380px] flex flex-col gap-4 lg:sticky lg:top-6">
            <PreviewPanel />
            <GenerateButton />
            {SHOW_ADS && (
              <div className="hidden lg:flex w-full h-[250px] bg-neutral-900 border border-dashed border-neutral-700 rounded-xl items-center justify-center text-xs text-neutral-600">
                광고 영역 (300×250)
              </div>
            )}
          </div>
        </div>
        {SHOW_ADS && (
          <div className="lg:hidden mt-6 h-[100px] bg-neutral-900 border border-dashed border-neutral-700 rounded-xl flex items-center justify-center text-xs text-neutral-600">
            광고 영역 (320×100)
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
