import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'
import { ScrollToTop } from './components/Layout.jsx'
import './lib/posthog.js'

const ArbeidPage = lazy(() => import('./pages/ArbeidPage.jsx'))
const PriserPage = lazy(() => import('./pages/PriserPage.jsx'))
const MetodePage = lazy(() => import('./pages/MetodePage.jsx'))
const OmPage = lazy(() => import('./pages/OmPage.jsx'))
const KontaktPage = lazy(() => import('./pages/KontaktPage.jsx'))
const BlogPage = lazy(() => import('./pages/BlogPage.jsx'))
const ArticlePage = lazy(() => import('./pages/ArticlePage.jsx'))
const FrisorDemo = lazy(() => import('./pages/eksempler/FrisorDemo.jsx'))
const HandverkerDemo = lazy(() => import('./pages/eksempler/HandverkerDemo.jsx'))
const RestaurantDemo = lazy(() => import('./pages/eksempler/RestaurantDemo.jsx'))
const TannlegeDemo = lazy(() => import('./pages/eksempler/TannlegeDemo.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      {/* Én Suspense rundt hele rutetreet. Forsiden er ikke lazy, så
          fallbacken vises kun ved navigasjon til en underside. */}
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/arbeid" element={<ArbeidPage />} />
          {/* Gammel rute, beholdt så delte lenker og Google ikke havner i 404 */}
          <Route path="/vårt-arbeid" element={<Navigate to="/arbeid" replace />} />
          <Route path="/priser" element={<PriserPage />} />
          <Route path="/metode" element={<MetodePage />} />
          <Route path="/om" element={<OmPage />} />
          <Route path="/kontakt" element={<KontaktPage />} />
          {/* Gammelt talerliste-skjema, fjernet 2026-07. Ruta lever videre
              som redirect så delte lenker og Google ikke havner i 404. */}
          <Route path="/kom-i-gang" element={<Navigate to="/kontakt" replace />} />
          <Route path="/blogg" element={<BlogPage />} />
          <Route path="/blogg/:slug" element={<ArticlePage />} />
          <Route path="/eksempler/frisor" element={<FrisorDemo />} />
          <Route path="/eksempler/handverker" element={<HandverkerDemo />} />
          <Route path="/eksempler/restaurant" element={<RestaurantDemo />} />
          <Route path="/eksempler/tannlege" element={<TannlegeDemo />} />
          {/* Ukjent rute → forsiden, i stedet for en blank skjerm */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
    <Analytics />
  </StrictMode>,
)
