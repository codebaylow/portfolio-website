// ═══ Nav scroll ═══
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ═══ UPGRADE 2: Scroll reveal — fade up + slide (vanilla IntersectionObserver) ═══
const revealSelectors = [
    'section:not(.hero) .section-header',
    '.about-text-block',
    '.skills-block',
    '.skills-category',
    '.about-highlights',
    '.project-card',
    '.website-box',
    '.stat-card',
    '.hero-card',
    '.contact-info',
    '.contact-form-box',
    '.perk',
    '.marquee-bar',
    '.footer-inner'
].join(', ');

const revealEls = document.querySelectorAll(revealSelectors);
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

revealEls.forEach((el) => {
    if (!prefersReducedMotion) el.classList.add('reveal');
    else el.classList.add('visible');
});

if (!prefersReducedMotion && revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const siblings = [...revealEls].filter((el) => el.closest('section') === entry.target.closest('section'));
            const staggerIndex = siblings.indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, Math.max(0, staggerIndex) * 60);
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach((el) => revealObserver.observe(el));
}

// ═══ UPGRADE 3: Disable mesh animation on narrow viewports (performance) ═══
const meshRoot = document.querySelector('.gradient-mesh');
function syncMeshPerformance() {
    if (!meshRoot) return;
    const mobilePreview = root.classList.contains('viewport-mobile');
    const heavy = window.innerWidth <= 768
        || mobilePreview
        || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    meshRoot.classList.toggle('mesh-static', heavy);
}
syncMeshPerformance();
window.addEventListener('resize', syncMeshPerformance, { passive: true });

// ═══ Form Submit ═══
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.submit-btn');
        btn.textContent = '✅ Application Sent — Thank You!';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #10B981)';
        btn.disabled = true;
        const footnote = form.querySelector('.form-footnote');
        if (footnote) footnote.textContent = '✦ I\'ll reply within 24 hours. Talk soon!';
        setTimeout(() => {
            btn.textContent = 'Send My Application 🚀';
            btn.style.background = '';
            btn.disabled = false;
            if (footnote) footnote.textContent = '✦ Free review · Reply within 24 hours · No spam, ever';
            form.reset();
        }, 4000);
    });
}

// ═══ Desktop / Mobile viewport toggle (default: desktop) ═══
const VIEWPORT_KEY = 'baylow-viewport';
const viewDesktop = document.getElementById('view-desktop');
const viewMobile  = document.getElementById('view-mobile');
const root = document.documentElement;

function setViewportMode(mode) {
    const isMobile = mode === 'mobile';
    root.classList.remove('viewport-desktop', 'viewport-mobile');
    root.classList.add(isMobile ? 'viewport-mobile' : 'viewport-desktop');
    if (viewDesktop) {
        viewDesktop.classList.toggle('is-active', !isMobile);
        viewDesktop.setAttribute('aria-pressed', String(!isMobile));
    }
    if (viewMobile) {
        viewMobile.classList.toggle('is-active', isMobile);
        viewMobile.setAttribute('aria-pressed', String(isMobile));
    }
    try { localStorage.setItem(VIEWPORT_KEY, mode); } catch (_) {}
    if (typeof syncMeshPerformance === 'function') syncMeshPerformance();
}

const savedView = (() => {
    try { return localStorage.getItem(VIEWPORT_KEY); } catch (_) { return null; }
})();
setViewportMode(savedView === 'mobile' ? 'mobile' : 'desktop');

viewDesktop?.addEventListener('click', () => setViewportMode('desktop'));
viewMobile?.addEventListener('click', () => setViewportMode('mobile'));

// Theme toggler
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('light-theme');
        themeToggle.textContent = document.documentElement.classList.contains('light-theme') ? '☀️' : '🌙';
    });
}
