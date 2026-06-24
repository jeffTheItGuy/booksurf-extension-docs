// ==========================================
// SLIDING TAB INDICATOR ANIMATION
// ==========================================
// Expose globally so it can be re-called after partials are injected
window.initTabIndicators = function () {
  const containers = [
    document.getElementById('docsTabs'),
    document.getElementById('homeTabs')
  ];

  containers.forEach(container => {
    if (!container) return;

    // Prevent double-initialization
    if (container.dataset.indicatorInit === 'true') return;
    container.dataset.indicatorInit = 'true';

    let indicator = container.querySelector('.tab-indicator');
    if (!indicator) {
      indicator = document.createElement('span');
      indicator.className = 'tab-indicator';
      container.prepend(indicator);
    }

    function updateIndicator() {
      const activeTab = container.querySelector('.active');
      if (!activeTab) {
        indicator.style.width = '0px';
        indicator.style.opacity = '0';
        return;
      }
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeTab.getBoundingClientRect();
      const left = activeRect.left - containerRect.left + container.scrollLeft;
      const width = activeRect.width;
      indicator.style.width = `${width}px`;
      indicator.style.transform = `translateX(${left}px)`;
      indicator.style.opacity = '1';
    }

    container.addEventListener('scroll', updateIndicator, { passive: true });
    window.addEventListener('resize', updateIndicator);

    const observer = new MutationObserver(updateIndicator);
    observer.observe(container, {
      attributes: true,
      subtree: true,
      attributeFilter: ['class']
    });

    // Initial positioning
    setTimeout(updateIndicator, 100);
    window.addEventListener('load', updateIndicator);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => setTimeout(updateIndicator, 50));
    }
  });
};

// Run once on initial load (for non-modular pages or future-proofing)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.initTabIndicators());
} else {
  window.initTabIndicators();
}