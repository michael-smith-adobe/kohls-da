export default function decorate(block) {
  const rows = [...block.children];
  const [intro, ...offers] = rows;

  intro.classList.add('promo-bar-intro');

  const offersWrapper = document.createElement('div');
  offersWrapper.className = 'promo-bar-offers';
  offers.forEach((row) => {
    row.classList.add('promo-bar-offer');
    // the cell is the first child div; style keyword is its first paragraph
    const cell = row.firstElementChild || row;
    const styleP = cell.querySelector(':scope > p');
    if (styleP && /^(green|red|dashed)$/i.test(styleP.textContent.trim())) {
      row.classList.add(`promo-bar-offer-${styleP.textContent.trim().toLowerCase()}`);
      styleP.remove();
    }
    offersWrapper.append(row);
  });

  block.textContent = '';
  block.append(intro, offersWrapper);
}
