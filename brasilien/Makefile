
pages := bonito.html jeri.html lencois.html maranhenses.html olinda.html pantanal.html index.html salvador.html

all: ${pages}

%.html: render.xsl page.tmpl journey.xml
	xsltproc --html --stringparam curr '$@' render.xsl page.tmpl > $@

clean:
	rm  ${pages}
