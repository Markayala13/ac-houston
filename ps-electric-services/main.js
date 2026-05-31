import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Set current year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Simple Intersection Observer for fade-up animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.fade-up');
  animatedElements.forEach(el => observer.observe(el));

  // Language Switcher
  const flags = document.querySelectorAll('.flag');
  flags.forEach(flag => {
    flag.addEventListener('click', (e) => {
      flags.forEach(f => f.classList.remove('active'));
      e.target.classList.add('active');
    });
  });

  // Sticky Navbar shadow on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    } else {
      navbar.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
    }
  });
});
