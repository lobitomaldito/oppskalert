import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'

const IntakePage = lazy(() => import('./pages/IntakePage.jsx'))
const BlogPage = lazy(() => import('./pages/BlogPage.jsx'))
const ArticlePage = lazy(() => import('./pages/ArticlePage.jsx'))
const VårtArbeidPage = lazy(() => import('./pages/VårtArbeidPage.jsx'))
const FrisorDemo = lazy(() => import('./pages/eksempler/FrisorDemo.jsx'))
const HandverkerDemo = lazy(() => import('./pages/eksempler/HandverkerDemo.jsx'))
const RestaurantDemo = lazy(() => import('./pages/eksempler/RestaurantDemo.jsx'))
const TannlegeDemo = lazy(() => import('./pages/eksempler/TannlegeDemo.jsx'))

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
        <Route path="/eksempler/frisor" element={
          <Suspense fallback={<Fallback />}>
            <FrisorDemo />
          </Suspense>
        } />
        <Route path="/eksempler/handverker" element={
          <Suspense fallback={<Fallback />}>
            <HandverkerDemo />
          </Suspense>
        } />
        <Route path="/eksempler/restaurant" element={
          <Suspense fallback={<Fallback />}>
            <RestaurantDemo />
          </Suspense>
        } />
        <Route path="/eksempler/tannlege" element={
          <Suspense fallback={<Fallback />}>
            <TannlegeDemo />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
    <Analytics />
  </StrictMode>,
)
