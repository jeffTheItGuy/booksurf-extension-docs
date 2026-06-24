const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// 1. Standard fade-in for non-feature cards
document.querySelectorAll('.step-card, .custom-card, .faq-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});

// 2. Staggered fade-in specifically for feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  // Multiply the index by 0.1s to create the cascading entry delay
  el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.1}s`;
  fadeObserver.observe(el);
});

// 3. Mouse tracking glow effect for the features grid
const featuresGrid = document.getElementById('featuresGrid');
if (featuresGrid) {
  featuresGrid.addEventListener('mousemove', (e) => {
    for (const card of featureCards) {
      const rect = card.getBoundingClientRect();
      // Calculate mouse position relative to each specific card
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Pass coordinates to CSS variables
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  });
}