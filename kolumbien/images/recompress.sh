#! /bin/bash

for i in $(ls -S |head -n5); do
	ls -lh $i
	convert $i -quality 65 $i.tmp && mv $i.tmp $i
	ls -lh $i
done
