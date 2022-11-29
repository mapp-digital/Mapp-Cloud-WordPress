USER_NAME := $(shell id -un)
USER_ID := $(shell id -u)
GROUP_ID := $(shell id -g)
USER_GROUP = $(USER_ID):$(GROUP_ID)

wp=latest
woo=7.1.0

export USER_ID
export GROUP_ID

start-e2e:
	cd ./tests/admin && docker-compose up -d
build-e2e:
	cd ./tests/admin && docker-compose up --build -d 
stop-e2e: 
	cd ./tests/admin && docker-compose down

exec-cypress:
	docker exec -it  mapp_e2e_wp_cypress bash	
exec-wpcli:
	docker exec -it -u xfs  mapp_e2e_wpcli bash

cypress-run:
	docker exec -t mapp_e2e_wp_cypress bash -c "cypress run"
cypress-local:
	cd ./tests && if [ ! -d "./node_modules" ];then npm install;fi && cd ./admin && docker-compose up -d && cd .. && npm run test

reset-wp:
	docker exec -t -u xfs mapp_e2e_wpcli bash -c "php /db.php drop_db"
init-wp:
	docker exec -t -u xfs mapp_e2e_wpcli bash -c "bash /init-wp.sh"
switch-wp-version:
	 docker exec -t -u xfs mapp_e2e_wpcli bash -c "wp core update --version="$(wp)" --path=/var/www/html --force"
switch-woo-version:
	 docker exec -t -u xfs mapp_e2e_wpcli bash -c "wp plugin install woocommerce --version=$(woo) --force"
get-wordpress-version:
	@docker exec -t -u xfs mapp_e2e_wpcli bash -c "wp core version"
get-woocommerce-version:
	@docker exec -t -u xfs mapp_e2e_wpcli bash -c "wp plugin list --format=json" | grep -oE "woocommerce.+name" | grep -o "[0-9.]\+"
get-latest-woo-version-number:
	@git -c 'versionsort.suffix=-' ls-remote --exit-code --refs --sort='version:refname' --tags https://github.com/woocommerce/woocommerce '*.*.*'  |  cut --delimiter='/' --fields=3 | grep -o "^[0-9]\.[0-9]\.[0-9]$\" |  tail --lines=1

set-version:
	@npm run set-version $(version)
set-tested-version:
	@node ./bin/set-tested-version.js

build-settings-frontend:
	cd ./src/Settings/admin-menu && if [ ! -d "./node_modules" ];then npm install;fi && npm run build

prepare-release:
	svn co https://plugins.svn.wordpress.org/mapp-intelligence release
	rm -rf ./release/trunk/*
	cp ./*.php ./release/trunk/
	cp -r ./js/ ./release/trunk/
	rsync -r --exclude="admin-menu" ./src ./release/trunk
	mkdir ./release/trunk/src/Settings/admin-menu/
	cp -r ./src/Settings/admin-menu/dist ./release/trunk/src/Settings/admin-menu/
	cp -r ./vendor ./release/trunk/
	cp ./readme.txt ./release/trunk/
	cp ./assets/* ./release/assets/

	$(info ----------------  INFO  ----------------------)
	$(info write new version into readme.txt and mapp_intelligence.php header, add changelog to readme.txt)
	$(info now run: cd release && svn copy ./trunk ./tags/1.x.x && svn ci -m"MESSAGE" --username mappdigital --password PW)
	$(info password here: https://wiki.webtrekk.com/pages/viewpage.action?pageId=26804873)
	$(info ---------------- OUTPUT ----------------------)

get-smartpixel:
	curl https://raw.githubusercontent.com/Webtrekk/Webtrekk-Smart-Pixel/master/packages/core/dist/smart-pixel.min.js --output ./js/smart-pixel.min.js
	curl https://raw.githubusercontent.com/Webtrekk/Webtrekk-Smart-Pixel/master/packages/core/dist/smart-pixel.debug.js --output ./js/smart-pixel.debug.js

