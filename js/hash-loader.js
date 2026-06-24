// ==========================================
// HANDLE HASH ON LOAD
// ==========================================
window.addEventListener('load', () => {
  if (!window.location.hash) return;

  const hash = window.location.hash;
  const NAVBAR_OFFSET = 140;

  function scrollToHash() {
    const target = document.querySelector(hash);
    if (!target) return false;

    const y = target.getBoundingClientRect().top + window.pageYOffset - NAVBAR_OFFSET;
    window.scrollTo({ top: y, behavior: 'smooth' });

    document.querySelectorAll('.docs-tab, .home-tab').forEach(tab => {
      const isActive = tab.getAttribute('href') === hash;
      tab.classList.toggle('active', isActive);
    });

    if (typeof window.initTabIndicators === 'function') {
      setTimeout(() => window.initTabIndicators(), 50);
    }

    return true;
  }

  // Try immediately in case elements are already in the DOM
  if (scrollToHash()) return;

  // Otherwise watch for them to appear (partials loaded async)
  const observer = new MutationObserver(() => {
    if (scrollToHash()) observer.disconnect();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Stop watching after 5 seconds
  setTimeout(() => observer.disconnect(), 5000);
});