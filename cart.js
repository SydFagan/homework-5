const Cart = {
  key: 'booknook_cart',
  load() { return JSON.parse(localStorage.getItem(this.key) || '[]'); },
  save(items) { localStorage.setItem(this.key, JSON.stringify(items)); },
  add(item) {
    const items = this.load();
    const found = items.find(i => i.id === item.id);
    if (found) found.qty += item.qty || 1;
    else items.push({...item, qty: item.qty || 1});
    this.save(items);
    document.dispatchEvent(new CustomEvent('cartChanged', {detail: items}));
    Toast.success(`Added “${item.title}”`);
  },
  remove(id) {
    let items = this.load().filter(i => i.id !== id);
    this.save(items);
    document.dispatchEvent(new CustomEvent('cartChanged', {detail: items}));
    Toast.info('Item removed');
  },
  updateQty(id, qty) {
    const items = this.load();
    const it = items.find(i=>i.id===id);
    if (!it) return;
    it.qty = qty;
    if (it.qty <= 0) this.remove(id);
    else this.save(items);
    document.dispatchEvent(new CustomEvent('cartChanged', {detail: items}));
    Toast.info('Quantity updated');
  },
  clear() {
    localStorage.removeItem(this.key);
    document.dispatchEvent(new CustomEvent('cartChanged', {detail: []}));
    Toast.info('Cart cleared');
  }
};
document.addEventListener('cartChanged', e=>{
  const items = e.detail || Cart.load();
  const count = items.reduce((s,i)=>s+i.qty,0);
  const el = document.querySelector('#cart-count');
  if (el) el.textContent = count;
});
document.addEventListener('DOMContentLoaded', ()=>{
  document.dispatchEvent(new CustomEvent('cartChanged', {detail: Cart.load()}));
});
