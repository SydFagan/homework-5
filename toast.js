const Toast = {
  wrap: null,
  ensure(){ this.wrap = this.wrap || document.getElementById('toast-wrap'); },
  show(msg, type='info', ms=2200){
    this.ensure();
    const d = document.createElement('div');
    d.className = 'toast ' + type;
    d.textContent = msg;
    this.wrap.appendChild(d);
    setTimeout(()=>{ d.remove(); }, ms);
  },
  success(m){ this.show(m, 'success'); },
  error(m){ this.show(m, 'error'); },
  info(m){ this.show(m, 'info'); }
};
