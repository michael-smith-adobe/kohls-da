export default function decorate(block) {
  const rows = [...block.children];
  // row 0: heading + link; row 1: tab pills; rows 2+: product cards
  const [head, tabs, ...cards] = rows;

  if (head) head.classList.add('gift-finder-head');
  if (tabs) {
    tabs.classList.add('gift-finder-tabs');
    [...tabs.querySelectorAll('a')].forEach((a) => a.classList.add('gift-finder-tab'));
  }

  const grid = document.createElement('div');
  grid.className = 'gift-finder-cards';
  cards.forEach((card) => {
    card.classList.add('gift-finder-card');
    grid.append(card);
  });

  block.textContent = '';
  if (head) block.append(head);
  if (tabs) block.append(tabs);
  block.append(grid);
}
