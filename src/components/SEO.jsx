import { useEffect } from 'react';

const SEO = ({ title, description, keywords, canonical, ogType = 'website', ogImage, jsonLd, noindex = false }) => {
  useEffect(() => {
    // Title
    const defaultTitle = 'Oppskalert | Nettsider som faktisk selger';
    const finalTitle = title ? `${title} | Oppskalert` : defaultTitle;
    document.title = finalTitle;

    // Helper to set meta tags by name
    const setMetaByName = (name, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to set meta tags by property (Open Graph)
    const setMetaByProperty = (property, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Primary Meta Tags
    setMetaByName('title', finalTitle);
    setMetaByName('description', description || 'Jeg bygger lynraske, konverteringsoptimaliserte nettsider for norske bedrifter. Gratis demo før du betaler en krone. Ingen binding.');
    
    if (keywords) {
      setMetaByName('keywords', Array.isArray(keywords) ? keywords.join(', ') : keywords);
    }

    // Robots: demo/concept pages are noindex so fictional businesses never
    // rank or confuse anyone. Default real pages stay indexable.
    setMetaByName('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Canonical link
    const finalCanonical = canonical || window.location.href;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', finalCanonical);

    // Open Graph / Facebook
    const finalOgImage = ogImage || 'https://oppskalert.no/oppskalert%20fav.png';
    setMetaByProperty('og:title', finalTitle);
    setMetaByProperty('og:description', description || 'Jeg bygger lynraske, konverteringsoptimaliserte nettsider for norske bedrifter. Gratis demo først.');
    setMetaByProperty('og:type', ogType);
    setMetaByProperty('og:url', finalCanonical);
    setMetaByProperty('og:image', finalOgImage);

    // Twitter
    setMetaByName('twitter:title', finalTitle);
    setMetaByName('twitter:description', description || 'Jeg bygger lynraske, konverteringsoptimaliserte nettsider for norske bedrifter. Gratis demo først.');
    setMetaByName('twitter:image', finalOgImage);
    setMetaByName('twitter:url', finalCanonical);

    // JSON-LD Structured Data
    let scriptLd = document.getElementById('json-ld-seo');
    if (scriptLd) {
      scriptLd.remove();
    }
    if (jsonLd) {
      scriptLd = document.createElement('script');
      scriptLd.id = 'json-ld-seo';
      scriptLd.type = 'application/ld+json';
      scriptLd.innerHTML = JSON.stringify(jsonLd);
      document.head.appendChild(scriptLd);
    }

    return () => {
      // Clean up dynamic schema markup when leaving page
      const activeScript = document.getElementById('json-ld-seo');
      if (activeScript) {
        activeScript.remove();
      }
    };
  }, [title, description, keywords, canonical, ogType, ogImage, jsonLd, noindex]);

  return null;
};

export default SEO;
