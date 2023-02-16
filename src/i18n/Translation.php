<?php

namespace MappCloud\i18n;

use MappCloud\Intelligence\Helper;

class Translation
{
	public static function load_mapp_intelligence_textdomain()
	{
		load_plugin_textdomain(
			Helper::$slug,
			false,
			dirname(plugin_basename(__FILE__))
		);
	}

	public static function get_translations()
	{
		return [
			"header" => [
				"pixel_version" => __(
					"Mapp Intelligence Pixel Version",
					Helper::$slug
				),
				"ti_id" => __("Tag Integration ID", Helper::$slug),
				"gtm_id" => __(
					"Google Tag Manager Container ID",
					Helper::$slug
				),
				"ti_domain" => __("Tag Integration Domain", Helper::$slug),
				"exclude_keys" => __("Exclude keys", Helper::$slug),
				"exclude_users" => __("Exclude users", Helper::$slug),
				"acquire" => __("Mapp Acquire", Helper::$slug),
			],
			"hints" => [
				"pixel_version" => __(
					"Please choose if you want to use Tag Integration or Google Tag Manager for your implementation.",
					Helper::$slug
				),
				"ti_id" => __("Enter your Tag Integration ID.", Helper::$slug),
				"gtm_id" => __(
					"Enter your Google Tag Manager Container ID if you have not embedded the Google Tag Manager script already on your website.",
					Helper::$slug
				),
				"ti_domain" => __(
					"If you use a custom Tag Integration Domain, please indicate it here, otherwise keep empty and \"responder.wt-safetag.com\" will be used.",
					Helper::$slug
				),
				"exclude_keys" => __(
					"Please enter the keys you do not want to include in the datalayer here (comma separated). customFields are excluded by default.",
					Helper::$slug
				),
				"exclude_users" => __(
					"Disable tracking for users logged into WordPress.",
					Helper::$slug
				),
				"acquire" => __(
					"If you use Mapp Acquire alongside Mapp Intelligence, please add your Mapp Acquire tracking script here.",
					Helper::$slug
				),
			],
			"error" => [
				"ti_id" => __(
					"The tiId has to consist of 15 numbers.",
					Helper::$slug
				),
				"gtm_id" => __(
					"GTM Container ID not valid - keep this field empty or enter \"GTM-XXXXXXX\" ID.",
					Helper::$slug
				),
				"ti_domain" => __(
					"Please enter a valid URL or keep empty",
					Helper::$slug
				),
				"acquire" => __(
					"Could not detect Mapp Acquire script input.",
					Helper::$slug
				),
				"save" => __(
					"Please enter a valid value for: ",
					Helper::$slug
				),
				"error" => __(
					"Error",
					Helper::$slug
				),
				
			],
			"save_changes" => __("Save Changes", Helper::$slug),
			"saving_changes" => __("Saving Changes...", Helper::$slug),
			"settings_saved" => __(
				"Settings saved successfully",
				Helper::$slug
			),
			"settings_error" => __(
				"An error occured. More details in JS console.",
				Helper::$slug
			),
			"docs" => __(
				"For a detailed step-by-step implementation guide, please visit ",
				Helper::$slug
			),
			"link" => __(
				"https://documentation.mapp.com/1.0/en/mapp-intelligence-wordpress-plugin-7217612.html",
				Helper::$slug
			)
		];
	}
}
