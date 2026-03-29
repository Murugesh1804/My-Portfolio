// Smooth reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .work-card, .testimonial-card, .process-step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Animate skill bars on scroll
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const w = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = w; }, 100);
      });
    }
  });
}, { threshold: 0.3 });

const skillsPanel = document.querySelector('.skills-panel');
if (skillsPanel) skillObserver.observe(skillsPanel);

// Form submit
document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  btn.textContent = '✓ Message sent! I\'ll reply within 24h';
  btn.style.background = 'var(--green)';
});
