/**
 * ISHAN MADUSHANKA PORTFOLIO - MAIN JS
 * Navigation, theme toggle, custom cursor, transitions, smooth scroll
 */

import { portfolioData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTopProgressBar();
  initHeaderAndNav();
  initCustomCursor();
  initMagneticButtons();
  initSmoothScroll();
  initPageTransitions();
  hidePreloader();
});

/* --------------------------------------------------------------------------
   1. Theme Toggle (Light / Dark)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('ishan_theme') || 'light';
  
  applyTheme(storedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('ishan_theme', next);
    });
  });
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcons(true);
  } else {
    document.documentElement.removeAttribute('data-theme');
    updateThemeIcons(false);
  }
}

function updateThemeIcons(isDark) {
  const icons = document.querySelectorAll('.theme-toggle-icon');
  icons.forEach(el => {
    el.innerHTML = isDark
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  });
}

/* --------------------------------------------------------------------------
   2. Top Horizontal Scroll Progress Bar
   -------------------------------------------------------------------------- */
function initTopProgressBar() {
  const progressBar = document.getElementById('top-progress-bar');
  if (!progressBar) return;

  let ticking = false;
  const updateProgress = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight <= 0) {
          progressBar.style.width = '0%';
        } else {
          const progress = (window.scrollY / totalHeight) * 100;
          progressBar.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* --------------------------------------------------------------------------
   3. Navigation & Sticky Glass Header
   -------------------------------------------------------------------------- */
function initHeaderAndNav() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  // Sticky header class (RAF throttled)
  let headerTicking = false;
  const onScroll = () => {
    if (!headerTicking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 30) {
          header?.classList.add('scrolled');
        } else {
          header?.classList.remove('scrolled');
        }
        headerTicking = false;
      });
      headerTicking = true;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu drawer
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Active link highlight based on current pathname
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link, .pill-nav-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   4. Custom Glowing Cursor (Desktop Only)
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  // Check if touch device
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  const renderRing = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderRing);
  };
  requestAnimationFrame(renderRing);

  // Hover states on clickable targets
  const interactiveSelector = 'a, button, input, textarea, .pill-tab-btn, .glass-panel, .carousel-arrow-btn';
  document.querySelectorAll(interactiveSelector).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* --------------------------------------------------------------------------
   5. Magnetic Button Effect
   -------------------------------------------------------------------------- */
function initMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const magneticBtns = document.querySelectorAll('.btn-primary, .btn-outline, .social-circle-btn, .btn-cv-pill');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate3d(0, 0, 0)';
    });
  });
}

/* --------------------------------------------------------------------------
   6. Smooth Scroll (Lenis)
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  if (typeof window.Lenis !== 'undefined') {
    const lenis = new window.Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

/* --------------------------------------------------------------------------
   7. Page Transitions (GSAP Curtain Wipe)
   -------------------------------------------------------------------------- */
function initPageTransitions() {
  const overlay = document.querySelector('.curtain-overlay');
  if (!overlay || typeof window.gsap === 'undefined') return;

  // Reveal current page by wiping curtain away
  window.gsap.fromTo(overlay, 
    { y: '0%' }, 
    { y: '-100%', duration: 0.6, ease: 'power2.inOut', delay: 0.1 }
  );

  // Intercept internal page navigation links
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetHref = link.getAttribute('href');
      // If external or anchor
      if (!targetHref || targetHref.startsWith('http') || targetHref.startsWith('#')) return;

      e.preventDefault();
      window.gsap.fromTo(overlay,
        { y: '100%' },
        { 
          y: '0%', 
          duration: 0.5, 
          ease: 'power2.inOut',
          onComplete: () => {
            window.location.href = targetHref;
          }
        }
      );
    });
  });
}

/* --------------------------------------------------------------------------
   8. Preloader (Ultra-fast dismissal on DOMContentLoaded - No blocking delay)
   -------------------------------------------------------------------------- */
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  function dismiss() {
    preloader.style.transition = 'opacity 0.35s ease, visibility 0.35s ease';
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
    setTimeout(() => {
      if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
    }, 400);
  }

  // Dismiss as soon as DOM is ready; never hold users waiting on slow images
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setTimeout(dismiss, 120);
  } else {
    document.addEventListener('DOMContentLoaded', () => setTimeout(dismiss, 120));
  }

  // Safety fallback in case event already passed
  window.addEventListener('load', () => setTimeout(dismiss, 50));
  setTimeout(dismiss, 600); // 600ms absolute hard ceiling
}

