// Mobile-only, reversible globe-first interface. Desktop is unaffected.
import './mobile-panels.css';

const media = window.matchMedia('(max-width: 720px)');
const button = document.createElement('button');
button.id = 'mobile-panels-toggle';
button.type = 'button';
button.textContent = 'Hide panels';
button.setAttribute('aria-controls', 'left-panel-stack right-context-rail command-dock');
button.setAttribute('aria-expanded', 'true');
button.setAttribute('aria-label', 'Hide interface panels');
document.body.append(button);

function setHidden(hidden) {
  document.body.classList.toggle('mobile-panels-hidden', hidden);
  button.textContent = hidden ? 'Show panels' : 'Hide panels';
  button.setAttribute('aria-expanded', String(!hidden));
  button.setAttribute('aria-label', hidden ? 'Show interface panels' : 'Hide interface panels');
}
button.addEventListener('click', () => setHidden(!document.body.classList.contains('mobile-panels-hidden')));
media.addEventListener('change', () => setHidden(false));

// Existing panel-collapse controls remain authoritative for each individual panel.
// Do not remove/reparent panels: doing so would disrupt their event listeners.
