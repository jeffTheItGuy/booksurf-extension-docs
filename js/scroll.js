let isScrollingClick = false;
let scrollTimeout;

// Expose globally so scrollspy modules can use the guard
window.__scrollState = { get isScrollingClick() { return isScrollingClick; } };

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    e.preventDefault();
    isScrollingClick = true;
    clearTimeout(scrollTimeout);
    const duration = 1200;
    const navbarOffset = 140;
    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.getBoundingClientRect().top + startPosition - navbarOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    function ease(timeElapsed, start, dist, duration) {
      timeElapsed /= duration / 2;
      if (timeElapsed < 1) return dist / 2 * Math.pow(timeElapsed, 3) + start;
      timeElapsed -= 2;
      return dist / 2 * (Math.pow(timeElapsed, 3) + 2) + start;
    }
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const nextScrollY = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, nextScrollY);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        window.scrollTo(0, targetPosition);
        history.pushState(null, '', targetId);
        scrollTimeout = setTimeout(() => { isScrollingClick = false; }, 100);
      }
    }
    requestAnimationFrame(animation);
    document.querySelectorAll('.home-tab, .docs-tab').forEach(tab => {
      const isActive = tab.getAttribute('href') === targetId;
      tab.classList.toggle('active', isActive);
      if (isActive) tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });
});