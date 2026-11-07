/**
 * ISHAN MADUSHANKA - ANIMATIONS & INTERACTIVE LOGIC
 * Counters, Pill Tabs, Radial Rings, Tilt Cards, Project Carousel & Modals
 */

import { portfolioData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  initStatCounters();
  initPillTabs();
  initRadialSkillRings();
  initCardTilt();
  initProjectCarousel();
  initHorizontalSliders();
  initProjectModal();
  initProjectFilters();
  initCVModal();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Animated Stat Counters
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const counterElements = document.querySelectorAll('.stat-counter-value');
  if (counterElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counterElements.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10) || 0;
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1600;
  const startTime = performance.now();

  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out quart
    const ease = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(ease * target);
    el.textContent = `${current}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = `${target}${suffix}`;
    }
  };
  requestAnimationFrame(step);
}

/* --------------------------------------------------------------------------
   2. Pill Tab Switching (Education/Skills/Certificates & Experience/Projects)
   -------------------------------------------------------------------------- */
function initPillTabs() {
  const tabContainers = document.querySelectorAll('.pill-tabs-nav');

  tabContainers.forEach(container => {
    const buttons = container.querySelectorAll('.pill-tab-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTabId = btn.getAttribute('data-tab');
        if (!targetTabId) return;

        // Active class on button
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Toggle corresponding content panel
        const parentSection = container.closest('section') || document;
        const panels = parentSection.querySelectorAll('.tab-content-panel');
        panels.forEach(panel => {
          if (panel.id === targetTabId) {
            panel.classList.add('active');
            // Re-trigger skill ring animations if entering skills tab or all dashboard
            if (targetTabId === 'tab-skills' || targetTabId === 'tab-all') {
              animateAllSkillRings();
            }
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. Radial Skill Rings Animation
   -------------------------------------------------------------------------- */
function initRadialSkillRings() {
  const rings = document.querySelectorAll('.circle-progress');
  if (rings.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateAllSkillRings();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const skillsSection = document.querySelector('.radial-skills-row');
  if (skillsSection) observer.observe(skillsSection);
}

function animateAllSkillRings() {
  const rings = document.querySelectorAll('.circle-progress');
  const circumference = 2 * Math.PI * 50; // r=50 -> ~314

  rings.forEach(ring => {
    const percent = parseFloat(ring.getAttribute('data-percent')) || 0;
    const offset = circumference - (percent / 100) * circumference;
    ring.style.strokeDashoffset = offset;
  });
}

/* --------------------------------------------------------------------------
   4. 3D Card Hover Tilt (Plain JS Vanilla-Tilt style)
   -------------------------------------------------------------------------- */
function initCardTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = document.querySelectorAll('.glass-panel, .stat-glass-card, .timeline-card, .certificate-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* --------------------------------------------------------------------------
   5. Projects Carousel with Dots & Arrows
   -------------------------------------------------------------------------- */
let currentSlideIndex = 0;
let carouselAutoTimer = null;

function initProjectCarousel() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.project-carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-arrow-prev');
  const nextBtn = document.querySelector('.carousel-arrow-next');

  if (!track || slides.length === 0) return;

  const updateSlide = (index) => {
    currentSlideIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlideIndex);
    });
  };

  prevBtn?.addEventListener('click', () => {
    updateSlide(currentSlideIndex - 1);
    resetCarouselTimer();
  });

  nextBtn?.addEventListener('click', () => {
    updateSlide(currentSlideIndex + 1);
    resetCarouselTimer();
  });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      updateSlide(idx);
      resetCarouselTimer();
    });
  });

  // Touch Swipe for mobile
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) updateSlide(currentSlideIndex + 1);
      else updateSlide(currentSlideIndex - 1);
      resetCarouselTimer();
    }
  }, { passive: true });

  // Optional subtle auto-rotate every 7 seconds
  const startCarouselTimer = () => {
    carouselAutoTimer = setInterval(() => {
      updateSlide(currentSlideIndex + 1);
    }, 7000);
  };

  const resetCarouselTimer = () => {
    clearInterval(carouselAutoTimer);
    startCarouselTimer();
  };

  startCarouselTimer();
}

/* --------------------------------------------------------------------------
   6. Project Detail Modal
   -------------------------------------------------------------------------- */
function initProjectModal() {
  const modal = document.getElementById('project-detail-modal');
  const closeBtn = modal?.querySelector('.modal-close-btn');
  const viewBtns = document.querySelectorAll('.btn-view-project');

  if (!modal) return;

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project-id');
      const project = portfolioData.projects.find(p => p.id === projId) || portfolioData.projects[0];
      if (!project) return;

      // Populate modal content
      modal.querySelector('#modal-project-title').textContent = project.title;
      modal.querySelector('#modal-project-role').textContent = project.role;
      modal.querySelector('#modal-project-desc').textContent = project.longDescription || project.description;
      modal.querySelector('#modal-project-img').setAttribute('src', project.thumbnail);
      modal.querySelector('#modal-project-img').setAttribute('alt', project.title);

      // Tech tags
      const techContainer = modal.querySelector('#modal-project-tech');
      techContainer.innerHTML = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

      // Features list
      const featuresContainer = modal.querySelector('#modal-project-features');
      if (project.features && featuresContainer) {
        featuresContainer.innerHTML = project.features.map(f => `<li>${f}</li>`).join('');
      }

      // Action links
      const liveLink = modal.querySelector('#modal-live-link');
      if (liveLink) {
        if (project.liveUrl && project.liveUrl !== '#' && !project.liveUrl.startsWith('#TODO')) {
          liveLink.setAttribute('href', project.liveUrl);
          liveLink.style.display = 'inline-flex';
        } else {
          liveLink.style.display = 'none';
        }
      }

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

/* --------------------------------------------------------------------------
   7. CV PDF Viewer Modal
   -------------------------------------------------------------------------- */
function initCVModal() {
  const modal = document.getElementById('cv-pdf-modal');
  const triggerBtns = document.querySelectorAll('.btn-view-cv-modal');
  const closeBtn = modal?.querySelector('.modal-close-btn');

  if (!modal) return;

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

/* --------------------------------------------------------------------------
   8. Contact Form Handler (Direct AJAX to idishanmadushanka@gmail.com - No Reload)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status-msg');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('[name="name"]');
    const emailInput = form.querySelector('[name="email"]');
    const messageInput = form.querySelector('[name="message"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !message) {
      showStatus('Please fill in all required fields (Name, Email, Message).', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending Message...</span>';
    submitBtn.disabled = true;

    // 6-second timeout controller so users are never stuck waiting on third-party outages
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    let sentSuccessfully = false;

    try {
      const endpoint = "https://formsubmit.co/ajax/idishanmadushanka@gmail.com";
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Accept': 'application/json' 
        },
        body: JSON.stringify({ 
          name: name, 
          email: email, 
          message: message,
          _subject: `New Portfolio Message from ${name} (${email})`,
          _captcha: "false",
          _template: "table"
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json().catch(() => null);
        if (!data || data.success === "true" || data.success === true) {
          sentSuccessfully = true;
          showStatus('✓ Message sent successfully! Delivered directly to idishanmadushanka@gmail.com.', 'success');
          form.reset();
        } else if (data && data.message && data.message.toLowerCase().includes('activate')) {
          showStatus('⚠️ <strong>One-time verification:</strong> FormSubmit sent an activation link to <strong>idishanmadushanka@gmail.com</strong>. Please check your Gmail inbox or spam once.', 'success');
          form.reset();
          sentSuccessfully = true;
        }
      }
    } catch (err) {
      clearTimeout(timeoutId);
      console.warn('FormSubmit endpoint timed out or failed (e.g. Cloudflare 522):', err);
    }

    // Resilient Instant Delivery Options (WhatsApp & Direct Gmail / Email)
    if (!sentSuccessfully) {
      const emailSubject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const emailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:idishanmadushanka@gmail.com?subject=${emailSubject}&body=${emailBody}`;
      const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=idishanmadushanka@gmail.com&su=${emailSubject}&body=${emailBody}`;
      const waText = encodeURIComponent(`Hello Ishan, my name is ${name} (${email}).\n\n${message}`);
      const waUrl = `https://wa.me/94723331165?text=${waText}`;

      showStatus(`
        <div style="font-size:0.92rem; line-height:1.6; text-align:left;">
          <div style="font-weight:700; color:var(--accent-mint); margin-bottom:6px;">💬 Send Directly to Ishan:</div>
          <p style="margin-bottom:12px; color:var(--text-secondary);">Click below to deliver your message instantly to Ishan via WhatsApp or Gmail:</p>
          <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:8px;">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding:10px 16px; font-size:0.85rem; text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
              <span>💬 WhatsApp (072 333 1165)</span>
            </a>
            <a href="${gmailWebUrl}" target="_blank" rel="noopener noreferrer" class="btn-outline" style="padding:10px 16px; font-size:0.85rem; text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
              <span>✉️ Open in Gmail</span>
            </a>
            <a href="${mailtoUrl}" class="btn-outline" style="padding:10px 16px; font-size:0.85rem; text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
              <span>📧 Mail App</span>
            </a>
          </div>
        </div>
      `, 'info');
    }

    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });

  function showStatus(text, type) {
    if (!statusMsg) return;
    statusMsg.innerHTML = text;
    statusMsg.className = `form-status-msg ${type}`;
    statusMsg.style.display = 'block';
    statusMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/* --------------------------------------------------------------------------
   9. Project Category Filters (Technical & NVQ vs Digital & Design)
   Matching Screenshot media_1794041275974_9c4d9029.jpg
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const topFeatured = document.getElementById('top-featured-carousel-block');
  const techSection = document.getElementById('section-technical-projects');
  const digitalSection = document.getElementById('section-digital-projects');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      if (filter === 'all') {
        if (topFeatured) topFeatured.style.display = 'block';
        if (techSection) techSection.style.display = 'block';
        if (digitalSection) digitalSection.style.display = 'block';
      } else if (filter === 'technical') {
        // Hide top featured carousel ("udama thiyana eka enne nathuwa")
        if (topFeatured) topFeatured.style.display = 'none';
        if (techSection) techSection.style.display = 'block';
        if (digitalSection) digitalSection.style.display = 'none';
      } else if (filter === 'digital') {
        // Hide top featured carousel ("udama thiyana eka enne nathuwa")
        if (topFeatured) topFeatured.style.display = 'none';
        if (techSection) techSection.style.display = 'none';
        if (digitalSection) digitalSection.style.display = 'block';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   10. Horizontal Category Project Sliders (Smooth Scroll with Arrows)
   -------------------------------------------------------------------------- */
function initHorizontalSliders() {
  const sliderBtns = document.querySelectorAll('.slider-nav-btn');
  if (!sliderBtns.length) return;

  sliderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const track = document.getElementById(targetId);
      if (!track) return;

      const isPrev = btn.classList.contains('slider-prev-btn');
      const cardWidth = track.querySelector('.project-category-card')?.offsetWidth || 350;
      const scrollOffset = cardWidth + 24; // card width + gap

      track.scrollBy({
        left: isPrev ? -scrollOffset : scrollOffset,
        behavior: 'smooth'
      });
    });
  });
}

