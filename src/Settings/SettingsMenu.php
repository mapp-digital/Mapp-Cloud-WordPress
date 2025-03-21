<?php
namespace MappCloud\Settings;

use MappCloud\Intelligence\Helper;
use MappCloud\i18n\Translation;

class SettingsMenu
{
	private $assets_url;

	public function __construct($assets_url)
	{
		$this->assets_url = $assets_url;
		add_action("admin_menu", [$this, "add_page"]);
		add_action("admin_enqueue_scripts", [$this, "register_assets"]);
	}

	public static function add_settings_menu()
	{
		$assets_url = plugin_dir_url(__FILE__);
		if (is_admin()) {
			new SettingsMenu($assets_url);
		}
	}

	public static function initSettingsMenu()
	{
		add_action("init", [
			Translation::class,
			"load_mapp_intelligence_textdomain",
		]);
		add_action("init", [SettingsMenu::class, "add_settings_menu"]);
		add_action("rest_api_init", [new SettingRoutes(), "register_routes"]);
	}

	public function add_page()
	{
		add_submenu_page(
			'plugins.php',
			__("Mapp Cloud", Helper::$slug, "mapp-intelligence"),
			__("Mapp Cloud", Helper::$slug, "mapp-intelligence"),
			"manage_options",
			Helper::$slug,
			[$this, "render_admin"]
		);
	}

	public function register_assets()
	{
		wp_register_script(
			Helper::$slug,
			$this->assets_url . "admin-menu/dist/assets/index-B-JYUo6k.js",
			[]
		);
		wp_localize_script("admin-bar", "_mappConfig", [
			"strings" => Translation::get_translations(),
			"api" => [
				"url" => esc_url_raw(rest_url("mapp-digital/v1/settings")),
				"nonce" => wp_create_nonce("wp_rest"),
			],
			"settings" => Settings::get_settings(),
		]);
	}

	public function enqueue_assets()
	{
		if (!wp_script_is(Helper::$slug, "registered")) {
			$this->register_assets();
		}
		wp_enqueue_script(Helper::$slug);
		wp_enqueue_style(Helper::$slug);
	}

	public function render_admin()
	{
		$this->enqueue_assets(); ?>
		<div id="mapp_wordpress_config"></div>
		<?php
	}
}
