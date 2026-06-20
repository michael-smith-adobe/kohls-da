export default function decorate(block) {
  const groups = [...block.children];
  groups.forEach((group, i) => {
    group.classList.add('nav-utility-group');
    group.classList.add(i === 0 ? 'nav-utility-left' : 'nav-utility-right');
  });

  // Normalize each item: ensure the icon and text label live inside one link,
  // regardless of how the content was authored (DA may split img/text apart).
  block.querySelectorAll('li').forEach((li) => {
    const link = li.querySelector('a');
    if (!link) return;
    const icon = li.querySelector('img');
    if (icon && !link.contains(icon)) {
      link.prepend(icon);
    }
    // pull any stray text nodes left outside the link into the link
    [...li.childNodes].forEach((node) => {
      if (node !== link && (node.nodeType === Node.TEXT_NODE ? node.textContent.trim() : true)) {
        link.append(node);
      }
    });
    link.classList.add('nav-utility-link');
  });
}
