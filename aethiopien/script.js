/* fixed header verdeckt sprungmarke */
function scrollShowTargetHeading() {
	if (document.location.hash == "#main") {
		window.scrollTo(0, window.scrollY - 90);
	}
	/* only once */
	window.removeEventListener('scroll', scrollShowTargetHeading);
}

window.addEventListener('scroll', scrollShowTargetHeading);

var menuOpen = false;

function toggleMenu() {
  var button = document.getElementById("menubutton");
  var menu = document.getElementById("menu");

  if (menuOpen) {
    button.className = "open";
    menu.className = "";
  } else {
    button.className = "close";
    menu.className = "show-menu";
  }

  menuOpen = !menuOpen;
}


window.addEventListener('scroll', function(e) {
  var nav = document.getElementById("navhead");
  if (this.scrollY > 200) {
    nav.className = "nav-show-link"
  } else {
    nav.className = ""
  }
});
