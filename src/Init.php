<?php

namespace MappCloud;

use MappCloud\Settings\Settings;
use MappCloud\Runtime;
use MappCloud\DataLayer\DataLayer;
use MappCloud\Helper;

class Init
{

	public function __construct()
	{

		$config = Settings::get_settings();
		$woocommerce_enabled = in_array(
			"woocommerce/woocommerce.php",
			get_option("active_plugins")
		);

		if (Helper::shall_user_be_tracked($config)) {
			$dataLayer = new DataLayer($woocommerce_enabled);
			new Runtime($config, $dataLayer, $woocommerce_enabled);
		}
		Runtime::addSettingsMenu();
	}
}
