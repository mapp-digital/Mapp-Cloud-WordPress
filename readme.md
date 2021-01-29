# Wordpress / Woocommerce - Mapp Cloud Extension

[Site](https://mapp.com/) |
[Docs](https://docs.mapp.com/display/WP) |
[Support](https://support.webtrekk.com/) |
[Changelog](./CHANGELOG.md)

The Mapp Cloud plugin provides basic tracking for WordPress and advanced e-commerce tracking for WooCommerce.

The plugin provides the following features:

- loading the tiLoader, which is needed to start tracking page and action requests.
- providing a data layer in a window._ti object
- in WooCommerce, the plugin also fires trackrequests when adding an item to the cart.

## Run e2e tests

From main directory, run `npm run e2e:xxx`.
 
- e2e:5.0: run tests for wordpress v5.0
- e2e:5.1: run tests for wordpress v5.1
- e2e:5.2: run tests for wordpress v5.2
- e2e:5.3: run tests for wordpress v5.3
- e2e:5.4: run tests for wordpress v5.4
- e2e:release: run tests for wordpress v5.0 - v5.4 and latest
- e2e:latest: run tests for latest wordpress
- e2e:nightly: run tests for nightly wordpress
