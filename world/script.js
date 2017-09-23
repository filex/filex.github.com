/* mail */
function b(){return'@';}
function a(){u=document.location;p=u.host.split('.');return"mailto:felix"+b()+p[p.length-2]+"."+p[p.length-1]+",az"+(9-1)+b()+"gmx."+p[p.length-1];}

/* fixed header verdeckt sprungmarke */
function scrollShowTargetHeading() {
	if (document.location.hash == "#main") {
		window.scrollTo(0, window.scrollY - 90);
	}
	/* only once */
	window.removeEventListener('scroll', scrollShowTargetHeading);
}

window.addEventListener('scroll', scrollShowTargetHeading);

/* close menu after click for in-page navigation (comments) */
window.addEventListener('click', function(e) {
	if (e.target.parentElement.id == 'menu') {
		toggleMenu();
	}
});

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
