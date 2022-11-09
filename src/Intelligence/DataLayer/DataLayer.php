<?php

namespace MappCloud\Intelligence\DataLayer;

use MappCloud\Intelligence\Helper;
use MappCloud\Intelligence\DataLayer\Page;
use MappCloud\Intelligence\DataLayer\User;
use MappCloud\Intelligence\DataLayer\Woocommerce;

class Datalayer
{
	use Page;
	use User;
	use Woocommerce;
	private $datalayer = []; // will be exposed to client as window._ti
	private $woocommerce_enabled = false;

	public function __construct($woocommerce_enabled)
	{
		$this->woocommerce_enabled = $woocommerce_enabled;
	}

		/**
	 * Makes sure that ' and " are escaped, also converts numbers to strings.
	 * @param array|object $datalayer
	 */
	private function decode_datalayer(&$datalayer)
	{
		foreach ($datalayer as &$item) {
			switch (gettype($item)) {
				case "string":
					$item = addslashes(html_entity_decode($item));
					break;
				case "integer":
				case "double":
					$item = strval($item);
					break;
				case "array":
				case "object":
					$this->decode_datalayer($item);
					break;
			}
		}
		unset($item);
	}

	/**
	 * Filters datalayer before it is exposed to client
	 * @param array $filter_keys array of strings with keys to filter
	 * @param array $filter_object array where the keys shall be filtered
	 * @return void
	 */
	private function filter_datalayer($filter_keys, &$filter_object)
	{
		foreach ($filter_keys as $filter_key) {
			if (isset($filter_object[$filter_key])) {
				unset($filter_object[$filter_key]);
			}
		}
		foreach ($filter_object as &$item) {
			if (gettype($item) === "array") {
				$this->filter_datalayer($filter_keys, $item);
			}
		}
	}

	/**
	 * Exposes dataLayer to client
	 * @param array $config configuration settings of user
	 * @return false|array
	 */
	public function create_datalayer($config)
	{
		$filter_keys = isset($config["General"]["filterKeys"])
			? explode(",", $config["General"]["filterKeys"])
			: [];
		if (count($filter_keys) > 0) {
			$filter_keys = array_map("trim", $filter_keys);
			$this->filter_datalayer($filter_keys, $this->datalayer);
		}
		$this->decode_datalayer($this->datalayer);
		if ($config["General"]["v"] === 5) {
			echo "<script>";
			echo "window._ti = " . json_encode($this->datalayer) . ";";
			echo "window._ti.pageName = location.host + location.pathname;";
			echo "</script>";
		} elseif ($config["General"]["v"] === 6) {
			return $this->datalayer;
		}
		return false;
	}

	public function log($data)
	{
		echo "<script>", "\n";
		echo "console.log(" . json_encode($data) . ");", "\n";
		echo "</script>", "\n";
	}
}
