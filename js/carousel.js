const track = document.querySelector('.carousel-track');
const originalSlides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const carousel = document.querySelector('.carousel');

if (track && originalSlides.length > 0) {
  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, originalSlides[0]);
  const allSlides = track.querySelectorAll('.carousel-slide');
  let currentIndex = 1;
  track.style.transition = 'none';
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  track.offsetHeight;
  track.style.transition = 'transform 0.5s ease-in-out';
  function updateDots() {
    let realIndex = currentIndex - 1;
    if (realIndex < 0) realIndex = originalSlides.length - 1;
    if (realIndex >= originalSlides.length) realIndex = 0;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === realIndex));
  }
  function goToSlide(index, animate = true) {
    track.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
    track.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
    updateDots();
  }
  function nextSlide() { goToSlide(currentIndex + 1); }
  function prevSlide() { goToSlide(currentIndex - 1); }
  track.addEventListener('transitionend', () => {
    if (currentIndex === 0) goToSlide(allSlides.length - 2, false);
    else if (currentIndex === allSlides.length - 1) goToSlide(1, false);
  });
  let slideInterval;
  function startCarousel() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4500);
  }
  function resetCarouselTimer() {
    clearInterval(slideInterval);
    startCarousel();
  }
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => { goToSlide(index + 1); resetCarouselTimer(); });
  });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetCarouselTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetCarouselTimer(); });
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
    carousel.addEventListener('mouseleave', startCarousel);
    let startX = 0, isDragging = false;
    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      clearInterval(slideInterval);
    }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
      isDragging = false;
      startCarousel();
    });
  }
  updateDots();
  startCarousel();
}