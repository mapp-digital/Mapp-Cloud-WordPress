<?php
namespace MappCloud\Settings;

class Settings
{
	private static $option_key = "MappIntelligence_mappConfig";

	private static $defaults = [
		"General" => [
			"v" => 5,
			"excludeWpUser" => false,
			"tiId" => "111111111111111",
			"tiDomain" => "responder.wt-safetag.com",
			"gtmId" => "",
			"filterKeys" => "customFields",
			"acquire" => "",
		],
	];

	public static function get_settings()
	{
		$saved = get_option(self::$option_key);
		$saved = stripslashes($saved);
		if ($saved) {
			$saved = json_decode($saved, true);
		}
		return wp_parse_args($saved, self::$defaults);
	}

	public static function save_settings($settings)
	{
		update_option(self::$option_key, $settings["settings"]);
	}

	public static function can_manage_options()
	{
		return current_user_can("manage_options");
	}

	
}
