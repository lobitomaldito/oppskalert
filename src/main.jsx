import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import './lib/posthog.js'
import App from './App.jsx'
import { ScrollToTop } from './components/Layout.jsx'

const ArbeidPage = lazy(() => import('./pages/ArbeidPage.jsx'))
const PriserPage = lazy(() => import('./pages/PriserPage.jsx'))
const MetodePage = lazy(() => import('./pages/MetodePage.jsx'))
const OmPage = lazy(() => import('./pages/OmPage.jsx'))
const KontaktPage = lazy(() => import('./pages/KontaktPage.jsx'))
const BlogPage = lazy(() => import('./pages/BlogPage.jsx'))
const ArticlePage = lazy(() => import('./pages/ArticlePage.jsx'))
const KategoriPage = lazy(() => import('./pages/blogg/KategoriPage.jsx'))
const ForfatterPage = lazy(() => import('./pages/blogg/ForfatterPage.jsx'))
const FrisorDemo = lazy(() => import('./pages/eksempler/FrisorDemo.jsx'))
const HandverkerDemo = lazy(() => import('./pages/eksempler/HandverkerDemo.jsx'))
const RestaurantDemo = lazy(() => import('./pages/eksempler/RestaurantDemo.jsx'))
const TannlegeDemo = lazy(() => import('./pages/eksempler/TannlegeDemo.jsx'))
const KalkulatorPage = lazy(() => import('./pages/KalkulatorPage.jsx'))
const DriftPage = lazy(() => import('./pages/DriftPage.jsx'))
const SammenlignPage = lazy(() => import('./pages/SammenlignPage.jsx'))
const VsWixPage = lazy(() => import('./pages/sammenlign/VsWixPage.jsx'))
const VsWordPressPage = lazy(() => import('./pages/sammenlign/VsWordPressPage.jsx'))
const SeoPage = lazy(() => import('./pages/SeoPage.jsx'))
const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'))

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
          {/* /vårt-arbeid redirecter nå på Vercel-nivå (vercel.json), ekte 308 */}
          <Route path="/priser" element={<PriserPage />} />
          <Route path="/kalkulator" element={<KalkulatorPage />} />
          <Route path="/drift" element={<DriftPage />} />
          <Route path="/sammenlign" element={<SammenlignPage />} />
          <Route path="/sammenlign/wix" element={<VsWixPage />} />
          <Route path="/sammenlign/wordpress" element={<VsWordPressPage />} />
          <Route path="/sokemotoroptimalisering" element={<SeoPage />} />
          <Route path="/metode" element={<MetodePage />} />
          <Route path="/om" element={<OmPage />} />
          <Route path="/kontakt" element={<KontaktPage />} />
          {/* /kom-i-gang redirecter nå på Vercel-nivå (vercel.json), ekte 308 */}
          <Route path="/blogg" element={<BlogPage />} />
          <Route path="/blogg/kategori/:slug" element={<KategoriPage />} />
          <Route path="/blogg/forfatter/:slug" element={<ForfatterPage />} />
          <Route path="/blogg/:slug" element={<ArticlePage />} />
          <Route path="/eksempler/frisor" element={<FrisorDemo />} />
          <Route path="/eksempler/handverker" element={<HandverkerDemo />} />
          <Route path="/eksempler/restaurant" element={<RestaurantDemo />} />
          <Route path="/eksempler/tannlege" element={<TannlegeDemo />} />
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          {/* Ukjent rute → forsiden, i stedet for en blank skjerm */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
    <Analytics />
  </StrictMode>,
)
