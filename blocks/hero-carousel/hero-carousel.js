function showSlide(block, index) {
  const slides = [...block.querySelectorAll('.hero-carousel-slide')];
  const dots = [...block.querySelectorAll('.hero-carousel-dot')];
  const count = slides.length;
  const next = (index + count) % count;

  slides.forEach((slide, i) => {
    slide.setAttribute('aria-hidden', i !== next);
    slide.classList.toggle('active', i === next);
  });
  dots.forEach((dot, i) => {
    dot.setAttribute('aria-selected', i === next);
    dot.tabIndex = i === next ? 0 : -1;
  });
  block.dataset.activeSlide = next;
}

export default function decorate(block) {
  const slides = [...block.children];
  slides.forEach((slide, i) => {
    slide.classList.add('hero-carousel-slide');
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `Slide ${i + 1} of ${slides.length}`);
    slide.setAttribute('aria-hidden', i !== 0);
    if (i === 0) slide.classList.add('active');

    // separate the image (background) from the text (overlay).
    // EDS may wrap loose content in a <p>, so query by type rather than by sibling.
    const cell = slide.firstElementChild || slide;
    const picture = cell.querySelector('picture');
    const content = document.createElement('div');
    content.className = 'hero-carousel-content';
    cell.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((h) => content.append(h));
    cell.querySelectorAll('p').forEach((p) => {
      if (p.querySelector('a') && !p.querySelector('picture')) content.append(p);
    });
    cell.textContent = '';
    if (picture) cell.append(picture);
    cell.append(content);
  });

  const track = document.createElement('div');
  track.className = 'hero-carousel-track';
  track.append(...slides);

  // controls: prev / dots+play-pause / next
  const controls = document.createElement('div');
  controls.className = 'hero-carousel-controls';

  const playPause = document.createElement('button');
  playPause.type = 'button';
  playPause.className = 'hero-carousel-playpause';
  playPause.setAttribute('aria-label', 'Pause carousel');
  playPause.dataset.state = 'playing';

  const prev = document.createElement('button');
  prev.type = 'button';
  prev.className = 'hero-carousel-prev';
  prev.setAttribute('aria-label', 'Previous slide');

  const dotsNav = document.createElement('div');
  dotsNav.className = 'hero-carousel-dots';
  dotsNav.setAttribute('role', 'tablist');
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'hero-carousel-dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Show slide ${i + 1}`);
    dot.setAttribute('aria-selected', i === 0);
    dot.tabIndex = i === 0 ? 0 : -1;
    dot.addEventListener('click', () => {
      // eslint-disable-next-line no-use-before-define
      stopAutoplay();
      showSlide(block, i);
    });
    dotsNav.append(dot);
  });

  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'hero-carousel-next';
  next.setAttribute('aria-label', 'Next slide');

  controls.append(playPause, prev, dotsNav, next);

  block.textContent = '';
  block.append(track, controls);
  block.dataset.activeSlide = 0;

  let timer;
  const advance = () => showSlide(block, (Number(block.dataset.activeSlide) || 0) + 1);
  const startAutoplay = () => {
    if (timer) return;
    timer = setInterval(advance, 5000);
    playPause.dataset.state = 'playing';
    playPause.setAttribute('aria-label', 'Pause carousel');
  };
  function stopAutoplay() {
    clearInterval(timer);
    timer = undefined;
    playPause.dataset.state = 'paused';
    playPause.setAttribute('aria-label', 'Play carousel');
  }

  prev.addEventListener('click', () => {
    stopAutoplay();
    showSlide(block, (Number(block.dataset.activeSlide) || 0) - 1);
  });
  next.addEventListener('click', () => {
    stopAutoplay();
    showSlide(block, (Number(block.dataset.activeSlide) || 0) + 1);
  });
  playPause.addEventListener('click', () => {
    if (timer) stopAutoplay();
    else startAutoplay();
  });

  startAutoplay();
}
