.PHONY: start-e2e stop-e2e exec-cypress cypress-run reset-wp init-wp release get-smartpixel

USER_NAME := $(shell id -un)
USER_ID := $(shell id -u)
GROUP_ID := $(shell id -g)
USER_GROUP = $(USER_ID):$(GROUP_ID)

export USER_ID
export GROUP_ID

start-e2e:
	cd ./tests/admin && docker-compose up -d
stop-e2e: 
	cd ./tests/admin && docker-compose down

exec-cypress:
	docker exec -it  mapp_e2e_wp_cypress bash

cypress-run:
	docker exec -t mapp_e2e_wp_cypress bash -c "cypress run"

reset-wp:
	docker exec -t -u xfs mapp_e2e_wpcli bash -c "php /db.php drop_db"

init-wp:
	docker exec -t -u xfs mapp_e2e_wpcli bash -c "bash /init-wp.sh"

release:
	svn co https://plugins.svn.wordpress.org/mapp-intelligence release
	cp ./*.php ./release/trunk/
	cp ./js/*.js ./release/trunk/js/
	cp ./src/*.php ./release/trunk/src/
	cp ./readme.txt ./release/trunk/
	cp ./assets/* ./release/assets/
	cp ./frontend/public/build/bundle.js ./release/trunk/frontend/public/build/
	cp ./frontend/public/build/bundle.css ./release/trunk/frontend/public/build/
	$(info ----------------  INFO  ----------------------)
	$(info write new version into readme.txt and mapp_intelligence.php header, add changelog to readme.txt)
	$(info now run: cd release && svn copy ./trunk ./tags/1.x.x && svn ci -m"MESSAGE" --username mappdigital --password PW)
	$(info password here: https://wiki.webtrekk.com/pages/viewpage.action?pageId=26804873)
	$(info ---------------- OUTPUT ----------------------)

get-smartpixel:
	curl https://raw.githubusercontent.com/Webtrekk/Webtrekk-Smart-Pixel/master/packages/core/dist/smart-pixel.min.js --output ./js/smart-pixel.min.js
	curl https://raw.githubusercontent.com/Webtrekk/Webtrekk-Smart-Pixel/master/packages/core/dist/smart-pixel.debug.js --output ./js/smart-pixel.debug.js

