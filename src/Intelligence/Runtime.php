<?php

namespace MappCloud\Intelligence;

use MappCloud\i18n\Translation;
use MappCloud\Intelligence\Loader;
use MappCloud\Intelligence\Helper;

class Runtime
{
	private $config;
	private $dataLayer;
	private $woocommerce_enabled;
	private $shallUserBeTracked = true;

	public function __construct($config, $dataLayer, $woocommerce_enabled)
	{
		$this->config = $config;
		$this->dataLayer = $dataLayer;
		$this->woocommerce_enabled = $woocommerce_enabled;
		$this->addActionsAndFilters();
	}

	private function addActionsAndFilters()
	{
		add_action("wp_head", [&$this, "wp_head_actions"]);

		if ($this->woocommerce_enabled) {
			add_action("woocommerce_after_shop_loop_item", [
				&$this,
				"woo_item_loop_actions",
			]);
			add_action("woocommerce_before_single_product", [
				&$this,
				"woo_single_product",
			]);
			add_action("woocommerce_thankyou", [
				&$this,
				"woo_after_order_actions",
			]);
		}
		add_action("wp_footer", [&$this, "wp_footer_actions"]);
	}

	public function wp_head_actions()
	{
		$this->shallUserBeTracked = Helper::shall_user_be_tracked(
			$this->config
		);
		if ($this->shallUserBeTracked) {
			if ($this->config["General"]["v"] === 6) {
				Loader::smartpixel_loader();
				if (isset($this->config["General"]["gtmId"])) {
					Loader::gtm_loader($this->config["General"]["gtmId"]);
				}
			}
			$this->dataLayer->get_404_info();
			$this->dataLayer->get_page_info();
			$this->dataLayer->get_search_info();
			$this->dataLayer->get_user_info();
		}
	}

	public function woo_single_product()
	{
		if ($this->shallUserBeTracked) {
			$this->dataLayer->get_product_info();
			$this->dataLayer->get_product_status("view");
			$this->dataLayer->create_is_collection_info();
		}
	}

	public function woo_after_order_actions()
	{
		if ($this->shallUserBeTracked) {
			$this->dataLayer->get_order_info();
		}
	}

	public function wp_footer_actions()
	{
		if ($this->shallUserBeTracked) {
			if ($this->woocommerce_enabled) {
				$this->dataLayer->add_product_categories_based_on_taxonomies();
			}
			if ($this->config["General"]["v"] === 5) {
				$this->dataLayer->create_datalayer($this->config);
				$this->dataLayer->mappify_order_items();
				Loader::ti_loader($this->config);
				$this->dataLayer->track_add_product_single(true);
				$this->dataLayer->track_add_product_archive(true);
				$this->dataLayer->product_variant_events(true);
			} elseif ($this->config["General"]["v"] === 6) {
				Loader::smartpixel_push($this->config, $this->dataLayer);
				$this->dataLayer->track_add_product_single(false);
				$this->dataLayer->track_add_product_archive(false);
				$this->dataLayer->product_variant_events(false);
			}
		}
	}

	public function woo_item_loop_actions()
	{
		if ($this->shallUserBeTracked) {
			$this->dataLayer->get_product_info(true);
		}
	}
}
