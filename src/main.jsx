import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import './lib/posthog.js'
import App from './App.jsx'
import { ScrollToTop } from './components/Layout.jsx'

// Vite gir hver chunk et innholdshash i filnavnet. Etter en deploy peker en
// fane som stod åpen fra før fortsatt på de gamle navnene, og første
// navigasjon til en lazy rute 404-er med «Failed to fetch dynamically
// imported module» og en hvit Suspense-fallback. Én reload henter fersk
// index.html og løser det. Flagget hindrer en evig løkke hvis importen
// feiler av en annen grunn (offline, blokkert av en utvidelse).
const RELOAD_FLAGG = 'oppskalert_chunk_reload'

const sesjon = {
  les: (n) => { try { return sessionStorage.getItem(n) } catch { return null } },
  skriv: (n, v) => { try { sessionStorage.setItem(n, v) } catch { /* privat modus */ } },
  slett: (n) => { try { sessionStorage.removeItem(n) } catch { /* privat modus */ } },
}

const lazySide = (last) =>
  lazy(() =>
    last().then(
      (mod) => {
        sesjon.slett(RELOAD_FLAGG)
        return mod
      },
      (err) => {
        if (sesjon.les(RELOAD_FLAGG)) throw err
        sesjon.skriv(RELOAD_FLAGG, '1')
        window.location.reload()
        // Løses aldri: reloaden overtar før React rekker å rendre noe.
        return new Promise(() => {})
      },
    ),
  )

const ArbeidPage = lazySide(() => import('./pages/ArbeidPage.jsx'))
const CasePage = lazySide(() => import('./pages/CasePage.jsx'))
const PriserPage = lazySide(() => import('./pages/PriserPage.jsx'))
const MetodePage = lazySide(() => import('./pages/MetodePage.jsx'))
const OmPage = lazySide(() => import('./pages/OmPage.jsx'))
const KontaktPage = lazySide(() => import('./pages/KontaktPage.jsx'))
const BlogPage = lazySide(() => import('./pages/BlogPage.jsx'))
const ArticlePage = lazySide(() => import('./pages/ArticlePage.jsx'))
const FrisorDemo = lazySide(() => import('./pages/eksempler/FrisorDemo.jsx'))
const HandverkerDemo = lazySide(() => import('./pages/eksempler/HandverkerDemo.jsx'))
const RestaurantDemo = lazySide(() => import('./pages/eksempler/RestaurantDemo.jsx'))
const TannlegeDemo = lazySide(() => import('./pages/eksempler/TannlegeDemo.jsx'))
const KalkulatorPage = lazySide(() => import('./pages/KalkulatorPage.jsx'))
const DriftPage = lazySide(() => import('./pages/DriftPage.jsx'))
const SammenlignPage = lazySide(() => import('./pages/SammenlignPage.jsx'))
import PopulaereSokPage from './pages/PopulaereSokPage';
import SporsmalPage from './pages/SporsmalPage';
import OrdlistePage from './pages/OrdlistePage';
import BegrepPage from './pages/BegrepPage';
const VsWixPage = lazySide(() => import('./pages/sammenlign/VsWixPage.jsx'))
const VsWordPressPage = lazySide(() => import('./pages/sammenlign/VsWordPressPage.jsx'))
const SeoPage = lazySide(() => import('./pages/SeoPage.jsx'))
const WebdesignOsloPage = lazySide(() => import('./pages/WebdesignOsloPage.jsx'))
const NettsideDesignPage = lazySide(() => import('./pages/NettsideDesignPage.jsx'))
const NettsideBedriftPage = lazySide(() => import('./pages/NettsideBedriftPage.jsx'))
const NyNettsidePage = lazySide(() => import('./pages/NyNettsidePage.jsx'))
const NettbutikkPage = lazySide(() => import('./pages/NettbutikkPage.jsx'))
const PersonvernPage = lazySide(() => import('./pages/PersonvernPage.jsx'))
const DashboardPage = lazySide(() => import('./pages/DashboardPage.jsx'))

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
          <Route path="/arbeid/:slug" element={<CasePage />} />
          {/* /vårt-arbeid redirecter nå på Vercel-nivå (vercel.json), ekte 308 */}
          <Route path="/priser" element={<PriserPage />} />
          <Route path="/kalkulator" element={<KalkulatorPage />} />
          <Route path="/drift" element={<DriftPage />} />
          <Route path="/sammenlign" element={<SammenlignPage />} />
        <Route path="/vanlige-sporsmal" element={<PopulaereSokPage />} />
        <Route path="/vanlige-sporsmal/:slug" element={<SporsmalPage />} />
        <Route path="/ordliste" element={<OrdlistePage />} />
        <Route path="/ordliste/:slug" element={<BegrepPage />} />
          <Route path="/sammenlign/wix" element={<VsWixPage />} />
          <Route path="/sammenlign/wordpress" element={<VsWordPressPage />} />
          <Route path="/sokemotoroptimalisering" element={<SeoPage />} />
          <Route path="/webdesign-oslo" element={<WebdesignOsloPage />} />
          <Route path="/nettside-design" element={<NettsideDesignPage />} />
          <Route path="/nettside-til-bedrift" element={<NettsideBedriftPage />} />
          <Route path="/ny-nettside" element={<NyNettsidePage />} />
          <Route path="/lage-nettbutikk" element={<NettbutikkPage />} />
          <Route path="/metode" element={<MetodePage />} />
          <Route path="/om" element={<OmPage />} />
          <Route path="/kontakt" element={<KontaktPage />} />
          <Route path="/personvern" element={<PersonvernPage />} />
          {/* /kom-i-gang redirecter nå på Vercel-nivå (vercel.json), ekte 308 */}
          <Route path="/blogg" element={<BlogPage />} />
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
