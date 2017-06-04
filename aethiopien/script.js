
window.addEventListener('scroll', function(e) {
  var nav = document.getElementById("navhead");
  if (this.scrollY > 200) {
    nav.className = "nav-show-link"
  } else {
    nav.className = ""
  }
});
