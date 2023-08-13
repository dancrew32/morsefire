make:
	vim makefile

deps:
	npm install --global web-ext && npm install --global prettier

run:
	web-ext run

lint:
	web-ext lint

pretty:
	prettier manifest.json morsefire.js background.js options.js options.html options.css -w

build: pretty lint
	web-ext build --overwrite-dest \
		--ignore-files=makefile icons/icon_128.png screenshots/*

checkin: pretty lint
	git add -Ap && git commit && git push origin main
