make:
	vim makefile

deps:
	npm install --global web-ext && npm install --global prettier

run:
	web-ext run

lint:
	web-ext lint

pretty:
	prettier morsefire.js background.js -w

build: pretty lint
	web-ext build --overwrite-dest

checkin: pretty lint
	git add -Ap && git commit && git push origin main
