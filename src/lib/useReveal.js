import { useEffect, useRef } from 'react';

// Reliable scroll-reveal via IntersectionObserver. Unlike GSAP's ScrollTrigger
// it recomputes element positions live, so it can't be thrown off by the custom
// fonts/images reflowing the page after load, and a CSS transition can never
// freeze mid-tween. Items inside [data-reveal] stay visible if JS never runs,
// and prefers-reduced-motion is handled in index.css (shown instantly, no transform).
export function useReveal(stagger = 90) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll('[data-reveal]'));
    // Fallback: if IntersectionObserver is unavailable, show everything
    // immediately rather than risk leaving content hidden.
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    root.classList.add('reveal-armed');
    items.forEach((el, i) => { el.style.transitionDelay = `${i * stagger}ms`; });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
    // Failsafe: a renderer that has IntersectionObserver but never scrolls
    // (headless capture, OG-image, print) would otherwise leave below-fold
    // [data-reveal] content stuck at opacity:0. Reveal anything still hidden
    // after a few seconds so the page can never ship blank. Real users scroll
    // long before this fires, so the reveal animation is unaffected.
    const failsafe = setTimeout(() => {
      items.forEach((el) => el.classList.add('is-visible'));
    }, 4000);
    return () => { io.disconnect(); clearTimeout(failsafe); };
  }, [stagger]);
  return ref;
}
