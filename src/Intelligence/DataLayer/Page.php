<?php

namespace MappCloud\Intelligence\DataLayer;

use MappCloud\Intelligence\Helper;

trait Page
{
	/**
	 * Writes page information to dataLayer
	 */
	public function get_page_info()
	{
		$post_id = get_the_ID();
		$post_type = get_post_type();
		$this->datalayer["customFields"] = get_post_custom($post_id);
		$this->datalayer["language"] = get_locale();
		$this->datalayer["pageTitle"] = preg_replace(
			'/\W\|\W$/',
			"",
			strip_tags(wp_title("|", false, "right"))
		);

		// Pages with single content (post, product, page etc.)
		if (is_singular()) {
			$this->datalayer["contentCategory"] = $post_type;
			$this->datalayer["contentSubcategory"] = "single-" . $post_type;

			// post terms / taxonomies
			$this->datalayer["taxonomies"] = Helper::get_taxonomies($post_id);

			// Archive pages
		} elseif (is_archive() || is_post_type_archive()) {
			$pageNumber = get_query_var("paged");
			$this->datalayer["pageNumber"] =
				$pageNumber > 0 ? strval($pageNumber) : "1";
			$orderBy = get_query_var("orderby", "");
			$this->datalayer["orderBy"] =
				$orderBy !== "menu_order title"
					? $orderBy
					: "default";
			// loop through the different types of archives
			$f = [
				"category",
				"tag",
				"tax",
				"author",
				"year",
				"month",
				"day",
				"time",
				"date",
			];
			for ($i = 0; $i < count($f); $i++) {
				if (call_user_func("is_" . $f[$i])) {
					// is_category(), is_tag() etc.
					$this->datalayer["contentCategory"] = "archive";
					$this->datalayer["contentSubcategory"] =
						$f[$i] . "-" . $post_type;
					if ($f[$i] === "category") {
						$_post_cats = get_the_category();
						$this->datalayer["category"] = [];
						foreach ($_post_cats as $_one_cat) {
							$this->datalayer["category"][] = $_one_cat->name;
						}
					}
					break;
				}
			}
		}
		// contentCategory for special pages:
		if (is_front_page()) {
			$this->datalayer["contentCategory"] = "home";
			$this->datalayer["pageTitle"] = get_bloginfo("name");
		} elseif (is_search()) {
			$this->datalayer["contentCategory"] = "internal search";
		} elseif ($this->woocommerce_enabled) {
			if (is_shop()) {
				$this->datalayer["contentCategory"] = isset(
					$this->datalayer["contentCategory"]
				)
					? $this->datalayer["contentCategory"]
					: "shop-startpage";
			}
			if (is_order_received_page()) {
				$this->datalayer["contentCategory"] = "order-received";
				unset($this->datalayer["contentSubcategory"]);
			}
		}
	}

	/**
	 * Writes search query and amount of results in dataLayer
	 */
	public function get_search_info()
	{
		if (is_search()) {
			global $wp_query;
			$this->datalayer["internalSearch"] = get_search_query();
			$this->datalayer["numberSearchResults"] = $wp_query->post_count;
		}
	}

	/**
	 * Writes 404 parameters to dataLayer
	 */
	public function get_404_info()
	{
		if (is_404()) {
			$this->datalayer["pageTitle"] = "404";
			$this->datalayer["errorCode"] = "404";
			$this->datalayer["errorMessage"] = "page not found";
		}
	}
}
