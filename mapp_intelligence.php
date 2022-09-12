<?php
/*
 * Plugin Name:       Mapp Cloud Integration
 * Plugin URI:        https://docs.mapp.com/display/WP
 * Description:       Adds the Mapp Cloud Tag Integration code to your WordPress blog or WooCommerce shop and creates the necessary data layer for your customer insights dashboards.
 * Version:           1.1.6
 * Author:            Mapp Digital US, LLC
 * Author URI:        https://mapp.com/mapp-cloud/mapp-intelligence/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */


$Mapp_minimalRequiredPhpVersion = '7.0';

/**
 * Check the PHP version and give a useful error message if the user's version is less than the required version
 * @return boolean true if version check passed. If false, triggers an error which WP will handle, by displaying
 * an error message on the Admin page
 */
function Mapp_noticePhpVersionWrong() {
    global $Mapp_minimalRequiredPhpVersion;
    echo '<div class="updated fade">' .
      __('Error: plugin "Mapp Intelligence" requires a newer version of PHP to be running.',  'mapp').
            '<br/>' . __('Minimal version of PHP required: ', 'mapp') . '<strong>' . $Mapp_minimalRequiredPhpVersion . '</strong>' .
            '<br/>' . __('Your server\'s PHP version: ', 'mapp') . '<strong>' . phpversion() . '</strong>' .
         '</div>';
}


function Mapp_PhpVersionCheck() {
    global $Mapp_minimalRequiredPhpVersion;
    if (version_compare(phpversion(), $Mapp_minimalRequiredPhpVersion) < 0) {
        add_action('admin_notices', 'Mapp_noticePhpVersionWrong');
        return false;
    }
    return true;
}


/**
 * Initialize internationalization (i18n) for this plugin.
 * References:
 *      http://codex.wordpress.org/I18n_for_WordPress_Developers
 *      http://www.wdmac.com/how-to-create-a-po-language-translation#more-631
 * @return void
 */
function Mapp_i18n_init() {
    $pluginDir = dirname(plugin_basename(__FILE__));
    load_plugin_textdomain('mapp', false, $pluginDir . '/languages/');
}


//////////////////////////////////
// Run initialization
/////////////////////////////////

// Initialize i18n
add_action('plugins_loadedi','Mapp_i18n_init');

// Run the version check.
// If it is successful, continue with initialization for this plugin
if (Mapp_PhpVersionCheck()) {
    // Only load and run the init function if we know PHP version can parse it
    include_once('src/mapp_init.php');
    Mapp_init(__FILE__);
}
