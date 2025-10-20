const Router = {
  go(path) {
    const clean = path.replace(/^#/, '').replace(/^\//, '');
    if (location.hash !== '#' + clean) history.pushState({ view: clean }, '', '#' + clean);
    loadView(clean, '#content');
  }
};

document.addEventListener('click', (e) => {
  const a = e.target.closest('[data-link]');
  if (!a) return;
  e.preventDefault();
  const path = a.getAttribute('href');
  Router.go(path);
  document.querySelectorAll('.main-nav a').forEach(x => x.classList.remove('active'));
  if (a.closest('.main-nav')) a.classList.add('active');
});

function syncFromHash() {
  const path = location.hash.replace(/^#/, '') || 'views/home.html';
  loadView(path, '#content');
}
window.addEventListener('popstate', syncFromHash);
window.addEventListener('hashchange', syncFromHash);
document.addEventListener('DOMContentLoaded', syncFromHash);
