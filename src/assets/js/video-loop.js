(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const videos = document.querySelectorAll('video[data-autoplay-loop]');

  for (const video of videos) {
    video.muted = true;
    const updateMotionPreference = () => {
      if (reducedMotion.matches) {
        video.autoplay = false;
        video.pause();
      } else {
        video.autoplay = true;
        // Native controls remain available if the browser blocks autoplay.
        video.play().catch(() => {});
      }
    };
    updateMotionPreference();
    reducedMotion.addEventListener('change', updateMotionPreference);
  }
})();
