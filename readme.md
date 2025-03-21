# Wordpress / Woocommerce - Mapp Cloud Extension

[Site](https://mapp.com/) |
[Docs](https://docs.mapp.com/v1/docs/en/wordpress-woocommerce) |
[Support](https://support.mapp.com/) |
[Changelog](./readme.txt)

The Mapp Cloud plugin provides basic tracking for WordPress and advanced e-commerce tracking for WooCommerce.

The plugin provides the following features:

- loading the tiLoader, which is needed to start tracking page and action requests.
- providing a data layer in a window._ti object
- in WooCommerce, the plugin also fires trackrequests when adding an item to the cart.
- it can also load Google Tag Manager and interact with Mapp GTM template

## Run e2e tests

From main directory, run `make start:e2e` to start the docker container.  
Run `make init-wp` to install Wordpress and the plugins with test data.
Run `make cypress-run`to start headless tests.
After the tests, you can run `make set-tested-version` to update readme.txt with the versions used in the test.

## Other scripts

- npm run i18n: creates a pot file for translations - use this if new strings are introduced
