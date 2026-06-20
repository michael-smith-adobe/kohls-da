export default function decorate(block) {
  const placeholder = block.textContent.trim() || 'What are you looking for today?';

  block.textContent = '';
  const form = document.createElement('form');
  form.className = 'search-form';
  form.setAttribute('role', 'search');
  form.action = '#';

  const icon = document.createElement('span');
  icon.className = 'search-icon';
  icon.setAttribute('aria-hidden', 'true');

  const input = document.createElement('input');
  input.type = 'search';
  input.className = 'search-input';
  input.placeholder = placeholder;
  input.setAttribute('aria-label', 'Search');

  form.append(icon, input);
  block.append(form);
}
