function scrollByCards(track, dir) {
  const card = track.querySelector('.product-carousel-card');
  const amount = card ? card.offsetWidth + 16 : 300;
  track.scrollBy({ left: dir * amount * 2, behavior: 'smooth' });
}

export default function decorate(block) {
  const rows = [...block.children];
  // row 0: heading; rows 1+: product cards
  const [head, ...cards] = rows;
  if (head) head.classList.add('product-carousel-head');

  const track = document.createElement('div');
  track.className = 'product-carousel-track';
  cards.forEach((card) => {
    card.classList.add('product-carousel-card');
    const cta = card.querySelector('a');
    if (cta) cta.classList.add('product-carousel-cta');
    track.append(card);
  });

  const prev = document.createElement('button');
  prev.type = 'button';
  prev.className = 'product-carousel-prev';
  prev.setAttribute('aria-label', 'Previous products');
  prev.addEventListener('click', () => scrollByCards(track, -1));

  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'product-carousel-next';
  next.setAttribute('aria-label', 'Next products');
  next.addEventListener('click', () => scrollByCards(track, 1));

  const viewport = document.createElement('div');
  viewport.className = 'product-carousel-viewport';
  viewport.append(prev, track, next);

  block.textContent = '';
  if (head) block.append(head);
  block.append(viewport);
}
