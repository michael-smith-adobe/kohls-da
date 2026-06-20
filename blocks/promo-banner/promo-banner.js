export default function decorate(block) {
  const rows = [...block.children];
  const [text, media] = rows;
  if (text) text.classList.add('promo-banner-text');
  if (media) media.classList.add('promo-banner-media');
}
