import React from 'react'
import ReactDOM from 'react-dom/client'
import { HeroUIProvider, ToastProvider } from "@heroui/react"
import App from './App.tsx'
import './index.css'
import { LanguageProvider } from './contexts/LanguageContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HeroUIProvider>
      <ToastProvider/>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </HeroUIProvider>
  </React.StrictMode>,
)
