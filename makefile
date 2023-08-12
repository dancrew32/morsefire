make:
	vim makefile

ext:
	npm install --global web-ext

run:
	web-ext run

lint:
	web-ext lint

build: lint
	web-ext build --overwrite-dest

checkin: lint
	git add -Ap && git commit && git push origin main
