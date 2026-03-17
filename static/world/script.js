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

/* close menu with Escape key */
window.addEventListener('keydown', function(e) {
	if (e.key === 'Escape' && menuOpen) {
		toggleMenu();
	}
});

/* close menu after click for in-page navigation (comments) */
window.addEventListener('click', function(e) {
	var pid = e.target.parentElement.id;
	if (pid == 'menu' || pid == 'menuScroller') {
		toggleMenu();
	}
});

/* Fullscreen image gallery */
(function() {
  var overlay, galleryImg, counter, images, currentIndex;

  function createOverlay() {
    overlay = document.createElement('div');
    overlay.id = 'gallery-overlay';
    overlay.innerHTML =
      '<span id="gallery-close"><svg viewBox="0 0 24 24" width="12" height="12"><line x1="4" y1="4" x2="20" y2="20" stroke="white" stroke-width="2.5" stroke-linecap="round"/><line x1="20" y1="4" x2="4" y2="20" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg></span>' +
      '<img>' +
      '<div id="gallery-bar">' +
        '<span id="gallery-prev">&#8249;</span>' +
        '<span id="gallery-counter"></span>' +
        '<span id="gallery-next">&#8250;</span>' +
      '</div>';
    document.body.appendChild(overlay);
    galleryImg = overlay.querySelector('img');
    counter = overlay.querySelector('#gallery-counter');

    overlay.querySelector('#gallery-close').addEventListener('click', close);
    overlay.querySelector('#gallery-prev').addEventListener('click', function(e) { e.stopPropagation(); navigate(-1); });
    overlay.querySelector('#gallery-next').addEventListener('click', function(e) { e.stopPropagation(); navigate(1); });
    // click on left/right half of overlay to navigate (suppressed after pinch-to-zoom or when zoomed)
    overlay.addEventListener('click', function(e) {
      if (suppressClick) { suppressClick = false; return; }
      if (e.target.closest('#gallery-close')) return;
      navigate(e.clientX < window.innerWidth / 2 ? -1 : 1);
    });

    // touch swipe: left/right navigate, down close; pinch-to-zoom must not trigger navigation
    // clientX used throughout so tap position can be compared with window.innerWidth
    var touchStartX = 0, touchStartY = 0, wasPinch = false, suppressClick = false;
    overlay.addEventListener('touchstart', function(e) {
      if (e.touches.length > 1) { wasPinch = true; return; }
      wasPinch = false;
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, {passive: true});
    overlay.addEventListener('touchmove', function(e) {
      if (e.touches.length > 1) { wasPinch = true; return; }
      e.preventDefault(); // prevent page scroll behind overlay on iOS
    }, {passive: false});
    overlay.addEventListener('touchend', function(e) {
      // preventDefault in touchmove suppresses the synthetic click; handle all touch
      // navigation here and block the click event to avoid double-firing on desktop
      suppressClick = true;
      setTimeout(function() { suppressClick = false; }, 400);
      if (wasPinch) {
        if (e.touches.length === 0) wasPinch = false;
        return;
      }
      var touch = e.changedTouches[0];
      var dx = touch.clientX - touchStartX;
      var dy = touch.clientY - touchStartY;
      var dominated = Math.abs(dy) > Math.abs(dx);
      if (dominated && dy > 80) {
        close();
      } else if (Math.abs(dx) > 50 && !dominated) {
        navigate(dx < 0 ? 1 : -1);
      } else if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
        // tap: navigate by position, close button and nav bar have their own handlers
        if (touch.target.closest('#gallery-close')) { close(); }
        else if (!touch.target.closest('#gallery-bar')) {
          navigate(touchStartX < window.innerWidth / 2 ? -1 : 1);
        }
      }
    });
  }

  function show(index) {
    currentIndex = index;
    var src = images[index].src;
    galleryImg.src = src;
    counter.textContent = (index + 1) + ' / ' + images.length;
    // try to collapse Safari toolbar before showing overlay
    if (document.activeElement) document.activeElement.blur();
    window.scrollBy(0, 1);
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    var next = currentIndex + dir;
    if (next < 0) next = images.length - 1;
    if (next >= images.length) next = 0;
    show(next);
  }

  document.addEventListener('keydown', function(e) {
    if (!overlay || !overlay.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') navigate(1);
    else if (e.key === 'ArrowLeft') navigate(-1);
  });

  function init() {
    images = Array.from(document.querySelectorAll('.entry .text img'));
    if (images.length === 0) return;
    createOverlay();
    images.forEach(function(img, i) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        show(i);
      });
    });
  }

  // async script may load after DOMContentLoaded has already fired
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

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
