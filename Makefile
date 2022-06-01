.PHONY: test-e2e release get-smartpixel

test-e2e:
	./synchronizer.sh $(VERSION) $(OUTPUT_URL)

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

