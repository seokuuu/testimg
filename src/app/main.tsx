import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { AppProvider } from '../widgets/app/context/AppContext.js'
import App from '../widgets/app/App.js'
import { trackPageView } from '../features/analytics/ga.js'

trackPageView()

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
)
