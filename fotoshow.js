function exchangeZooms() 
{
	var zoom;
	if (zoom = document.getElementById("zoom")) {
		zoom.src = this.src;
	}


	// scroll magic
	var zoomdiv = document.getElementById("zoomdiv");
	var offsetTop = zoomdiv.parentNode.offsetTop - 10;
	var offsetBottom = zoomdiv.parentNode.offsetTop + zoomdiv.parentNode.offsetHeight;
	var visibleTop = window.pageYOffset;
	var visibleBottom = window.pageYOffset + window.innerHeight;

	if (offsetBottom > visibleBottom) {
		var missingBottom = offsetBottom - visibleBottom;
		// scroll down if thumbnails are not visible
		if (offsetTop - missingBottom >= visibleTop) {
			window.scrollBy(0, missingBottom);
		// scroll to zoom if there is not enough space for zoom and thumbs
		} else {
			window.scroll(0, offsetTop);
		}
	}
	// scroll up if zoom-top is not visible
	else if (offsetTop < visibleTop) {
		window.scroll(0, offsetTop);
	}

	delete this;
}


function openFoto(thumbnail)
{
	var zoom = document.getElementById("zoom");
	var div = document.getElementById("zoomdiv");
	var cap = document.getElementById("zoomcap");
	var url = thumbnail.parentNode.getAttribute("href");
	var title = thumbnail.getAttribute("alt");

	// close zoom if 2nd click on same thumbnail 
	if (zoom.thumbnail && zoom.thumbnail.parentNode.getAttribute("href") == url) {
		return closeZoom(zoom);
	} else {
		// change caption, if element is present
		if (cap) {
			cap.innerHTML = title;
		}
		var container = thumbnail.parentNode.parentNode;
		container.insertBefore(div, container.firstChild);
		if (zoom.style.display != "block") {
			// show zoom at another foto-block
			zoom.style.display = "block";
			window.scrollBy(0, zoom.offsetHeight + 20);
		}
		if (div.style.display != "block") {
			div.style.display = "block";
		}
	}

	zoom.thumbnail = thumbnail;

	// exchange img in open zoom
	tmpImg = new Image(10, 10);
	tmpImg.onload = exchangeZooms;
	tmpImg.src = url;
}

function closeZoom(zoom)
{
	var div = document.getElementById("zoomdiv");
	var scrollBack = div.offsetHeight + 20;
	zoom.style.display = "none";
	div.style.display = "none";
	// scroll back to where we've been before the zoom was closed
	window.scrollBy(0, -scrollBack);
	// remove reference to old thumb to distinguish the 2nd-click-case
	zoom.thumbnail = null;
}

function nextFotoOrClose()
{
	var image = document.getElementById("zoom");
	var thumbnail = image.thumbnail;
	// find next element node
	var next = image.thumbnail.parentNode.nextSibling;
	while (next && next.nodeType != 1) {
		next = next.nextSibling;
	}
	if (next && next.firstChild.className == "thumbnail") {
		openFoto(next.firstChild);
	} else {
		closeZoom(image);
	}
}

function initFotos()
{
	document.getElementById("zoom").onclick = nextFotoOrClose;

	var images = document.getElementsByTagName("img");

	for (var i = 0; i < images.length; i++) {
		var image = images[i];
		
		if (image.className != 'thumbnail' || !image.src) {
			continue;
		}
		
		image.onclick = new Function("openFoto(this)");
		image.parentNode.onclick = new Function("return false;");
	}
}

window.onload = initFotos;
