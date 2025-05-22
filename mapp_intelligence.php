<?php
/*
 * Plugin Name:       Mapp Cloud Integration
 * Plugin URI:        https://documentation.mapp.com/1.0/de/mapp-intelligence-wordpress-plugin-7217612.html
 * Description:       Adds the Mapp Cloud Tag Integration code to your WordPress blog or WooCommerce shop and creates the necessary data layer for your customer insights dashboards.
 * Version:           1.2.1
 * Author:            Mapp Digital US, LLC
 * Author URI:        https://mapp.com
 * Text Domain:       mapp-intelligence
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package           mapp-cloud-wordpress
 */

if (!defined("ABSPATH")) {
	exit();
}

if (!class_exists("MappCloud") && is_readable(__DIR__ . "/vendor/autoload.php")) {
	require __DIR__ . "/vendor/autoload.php";
	new MappCloud\Init();
}
