import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const IntakePage = lazy(() => import('./pages/IntakePage.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/kom-i-gang" element={
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <IntakePage />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
