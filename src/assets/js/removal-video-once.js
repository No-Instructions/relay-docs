(() => {
  const video = document.querySelector('video[data-removal-autoplay-once]');
  if (!video) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  video.muted = true;
  video.loop = !motion.matches;
  let attempted = false;
  let observer;
  const playOnce = () => {
    if (attempted || motion.matches) return;
    attempted = true;
    observer?.disconnect();
    video.play().catch(() => {}); // Native controls remain available if blocked.
  };
  video.addEventListener('play', () => {
    attempted = true;
    observer?.disconnect();
  });
  motion.addEventListener('change', () => {
    video.loop = !motion.matches;
    if (motion.matches) {
      attempted = true;
      observer?.disconnect();
      video.pause();
    }
  });
  if (!motion.matches) {
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) playOnce();
      }, { threshold: 0.5 });
      observer.observe(video);
    } else {
      playOnce();
    }
  }
})();
