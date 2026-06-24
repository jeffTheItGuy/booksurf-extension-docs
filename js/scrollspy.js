// Docs tabs scrollspy
const docBlocks = document.querySelectorAll('.doc-block');
const docTabs = document.querySelectorAll('.docs-tab');
if (docBlocks.length > 0 && docTabs.length > 0) {
  const docObserver = new IntersectionObserver((entries) => {
    if (window.__scrollState?.isScrollingClick) return;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        docTabs.forEach(tab => {
          const isActive = tab.getAttribute('href') === `#${activeId}`;
          tab.classList.toggle('active', isActive);
          if (isActive) tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
      }
    });
  }, { rootMargin: '-140px 0px -85% 0px', threshold: 0 });
  docBlocks.forEach(block => docObserver.observe(block));
}

// Home tabs scrollspy
const homeSections = document.querySelectorAll('#hero, #features, #faq, #cta');
const homeTabLinks = document.querySelectorAll('.home-tab');
if (homeSections.length > 0 && homeTabLinks.length > 0) {
  const homeObserver = new IntersectionObserver((entries) => {
    if (window.__scrollState?.isScrollingClick) return;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        homeTabLinks.forEach(tab => {
          const isActive = tab.getAttribute('href') === `#${activeId}`;
          tab.classList.toggle('active', isActive);
          if (isActive) tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
      }
    });
  }, { rootMargin: '-140px 0px -85% 0px', threshold: 0 });
  homeSections.forEach(section => homeObserver.observe(section));
}