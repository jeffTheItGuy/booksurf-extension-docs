const mobileToggle = document.getElementById('mobileToggle');
const navLinksContainer = document.querySelector('.nav-links');
if (mobileToggle && navLinksContainer) {
  mobileToggle.addEventListener('click', () => navLinksContainer.classList.toggle('active'));
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinksContainer.classList.remove('active'));
  });
}