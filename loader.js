function runScriptsIn(container) {
  const scripts = container.querySelectorAll('script');
  scripts.forEach(old => {
    const s = document.createElement('script');
    for (const { name, value } of Array.from(old.attributes)) s.setAttribute(name, value);
    if (old.src) s.src = old.src; else s.textContent = old.textContent;
    document.body.appendChild(s);
    old.remove();
  });
}


async function loadView(path, containerSel = '#content') {
  const url = new URL(path.replace(/^\//, ''), window.location.origin + window.location.pathname);
  try {
    const res = await fetch(url.href, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const html = await res.text();
    const container = document.querySelector(containerSel);
    container.innerHTML = html;
    runScriptsIn(container);
    if (window.onViewReady) window.onViewReady();
  } catch (err) {
    console.error('loadView error:', url.href, err);
    document.querySelector(containerSel).innerHTML = '<p class="msg">Cannot load view.</p>';
  }
}
