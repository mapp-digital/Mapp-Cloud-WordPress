<?php

namespace MappCloud;

use MappCloud\Settings\Settings;
use MappCloud\Intelligence\Runtime;
use MappCloud\Intelligence\DataLayer\DataLayer;
use MappCloud\Intelligence\Helper;

class Init
{
	public function __construct()
	{
		$config = Settings::get_settings();
		$woocommerce_enabled = in_array(
			"woocommerce/woocommerce.php",
			get_option("active_plugins")
		);
		$dataLayer = new DataLayer($woocommerce_enabled);
		new Runtime($config, $dataLayer, $woocommerce_enabled);
	}
}
