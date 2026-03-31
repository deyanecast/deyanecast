import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const ref = useRef(null);
  const location = useLocation();

  // Set initial hidden state before first paint
  useLayoutEffect(() => {
    gsap.set(ref.current, { opacity: 0 });
  }, []);

  // Animate in on every route change (including initial mount)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'transform' }
    );
  }, [location.pathname]);

  return (
    <div ref={ref} className="page-transition-shell">
      {children}
    </div>
  );
};

export default PageTransition;
