// ═══ Custom Cursor ═══
const cursor   = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const hoverEls = document.querySelectorAll('a, button, .project-card, .skills-tags span, .highlight-chip');

let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top  = `${mouseY}px`;
});

(function animate() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = `${followerX}px`;
    follower.style.top  = `${followerY}px`;
    requestAnimationFrame(animate);
})();

hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        follower.style.borderColor = 'rgba(239,68,68,0.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.borderColor = 'rgba(59,130,246,0.4)';
    });
});

// ═══ Nav scroll ═══
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ═══ Scroll Reveal ═══
const revealEls = document.querySelectorAll(
    '.project-card, .about-text-block, .skills-block, .skills-category, .perk, .contact-form-box, .contact-info, .section-header, .hero-stats, .about-highlights'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// ═══ Form Submit ═══
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.submit-btn');
        btn.textContent = '✅ Message Sent! I\'ll be in touch soon.';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = 'Send My Application 🚀';
            btn.style.background = '';
            btn.disabled = false;
            form.reset();
        }, 4000);
    });
}
