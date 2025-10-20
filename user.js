const User = {
  get(){ try{return JSON.parse(localStorage.getItem('booknook_user'))}catch{return null}},
  isSignedIn(){ return !!this.get(); }
};
