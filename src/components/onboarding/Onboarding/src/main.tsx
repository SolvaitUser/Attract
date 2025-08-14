import React from 'react'
import ReactDOM from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'
import App from './App.tsx'
import { LanguageProvider } from './contexts/LanguageContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HeroUIProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </HeroUIProvider>
  </React.StrictMode>,
)
