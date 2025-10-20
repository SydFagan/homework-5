const Auth = {
  key: 'booknook_user',
  signIn(username, password) {
    if (!username || !password) return {ok:false, msg:'Enter username and password'};
    const user = {username, displayName: (username.split('@')[0] || username)};
    localStorage.setItem(this.key, JSON.stringify(user));
    document.dispatchEvent(new CustomEvent('authChanged', {detail: user}));
    Toast.success('Signed in');
    return {ok:true, user};
  },
  signOut() {
    localStorage.removeItem(this.key);
    document.dispatchEvent(new CustomEvent('authChanged', {detail: null}));
    Toast.info('Signed out');
  },
  currentUser() {
    try { return JSON.parse(localStorage.getItem(this.key)); } catch { return null; }
  }
};
document.addEventListener('authChanged', e => {
  const user = e.detail;
  const acctLinks = Array.from(document.querySelectorAll('a[href="views/login.html"]'));
  acctLinks.forEach(link=>{
    if (user) {
      link.innerHTML = `Hi, ${user.displayName} (Sign out)`;
      link.onclick = ev=>{ ev.preventDefault(); Auth.signOut(); };
    } else {
      link.innerHTML = `<img src="assets/images/user.png" alt="">Account`;
      link.onclick = null;
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  document.dispatchEvent(new CustomEvent('authChanged', {detail: Auth.currentUser()}));
});
