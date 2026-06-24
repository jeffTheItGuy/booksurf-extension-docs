// Docs tabs horizontal scroll
const docsTabs = document.getElementById('docsTabs');
const docsScrollLeft = document.getElementById('docsScrollLeft');
const docsScrollRight = document.getElementById('docsScrollRight');
if (docsTabs && docsScrollLeft && docsScrollRight) {
  const SCROLL_AMOUNT = 220;
  function updateScrollBtnVisibility() {
    const { scrollLeft, scrollWidth, clientWidth } = docsTabs;
    docsScrollLeft.classList.toggle('hidden', scrollLeft <= 2);
    docsScrollRight.classList.toggle('hidden', scrollLeft + clientWidth >= scrollWidth - 2);
  }
  docsScrollLeft.addEventListener('click', () => docsTabs.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' }));
  docsScrollRight.addEventListener('click', () => docsTabs.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' }));
  docsTabs.addEventListener('scroll', updateScrollBtnVisibility);
  window.addEventListener('resize', updateScrollBtnVisibility);
  updateScrollBtnVisibility();
}

// Home tabs horizontal scroll
const homeTabs = document.getElementById('homeTabs');
const homeScrollLeft = document.getElementById('homeScrollLeft');
const homeScrollRight = document.getElementById('homeScrollRight');
if (homeTabs && homeScrollLeft && homeScrollRight) {
  const SCROLL_AMOUNT = 200;
  function updateHomeScrollBtnVisibility() {
    const { scrollLeft, scrollWidth, clientWidth } = homeTabs;
    homeScrollLeft.classList.toggle('hidden', scrollLeft <= 2);
    homeScrollRight.classList.toggle('hidden', scrollLeft + clientWidth >= scrollWidth - 2);
  }
  homeScrollLeft.addEventListener('click', () => homeTabs.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' }));
  homeScrollRight.addEventListener('click', () => homeTabs.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' }));
  homeTabs.addEventListener('scroll', updateHomeScrollBtnVisibility);
  window.addEventListener('resize', updateHomeScrollBtnVisibility);
  updateHomeScrollBtnVisibility();
}