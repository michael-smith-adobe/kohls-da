export default function decorate(block) {
  const groups = [...block.children];
  groups.forEach((group, i) => {
    group.classList.add('nav-utility-group');
    group.classList.add(i === 0 ? 'nav-utility-left' : 'nav-utility-right');
  });
}
