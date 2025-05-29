document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      const prevLink = document.getElementById('prev-slide-link');
      if (prevLink && !prevLink.hasAttribute('aria-disabled')) {
        prevLink.click();
      }
    } else if (event.key === 'ArrowRight') {
      const nextLink = document.getElementById('next-slide-link');
      if (nextLink && !nextLink.hasAttribute('aria-disabled')) {
        nextLink.click();
      }
    }
  });
});
