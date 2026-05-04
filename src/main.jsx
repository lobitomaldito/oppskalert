import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const IntakePage = lazy(() => import('./pages/IntakePage.jsx'))
const BlogPage = lazy(() => import('./pages/BlogPage.jsx'))
const ArticlePage = lazy(() => import('./pages/ArticlePage.jsx'))
const VårtArbeidPage = lazy(() => import('./pages/VårtArbeidPage.jsx'))

const Fallback = () => <div className="min-h-screen bg-background" />

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/kom-i-gang" element={
          <Suspense fallback={<Fallback />}>
            <IntakePage />
          </Suspense>
        } />
        <Route path="/blogg" element={
          <Suspense fallback={<Fallback />}>
            <BlogPage />
          </Suspense>
        } />
        <Route path="/blogg/:slug" element={
          <Suspense fallback={<Fallback />}>
            <ArticlePage />
          </Suspense>
        } />
        <Route path="/vårt-arbeid" element={
          <Suspense fallback={<Fallback />}>
            <VårtArbeidPage />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
