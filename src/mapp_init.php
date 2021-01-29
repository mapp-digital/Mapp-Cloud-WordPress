<?php
require_once('MappIntelligence.php');

function Mapp_init($file) {
    $MappPlugin = new MappIntelligence();

    // Install the plugin
    // NOTE: this file gets run each time you *activate* the plugin.
    // So in WP when you "install" the plugin, all that does it dump its files in the plugin-templates directory
    // but it does not call any of its code.
    // So here, the plugin tracks whether or not it has run its install operation, and we ensure it is run only once
    // on the first activation
    if (!$MappPlugin->isInstalled()) {
        $MappPlugin->install();
    }
    else {
        // Perform any version-upgrade activities prior to activation (e.g. database changes)
        $MappPlugin->upgrade();
    }

    // Add callbacks to hooks
    $MappPlugin->addActionsAndFilters();

    if (!$file) {
        $file = __FILE__;
    }
    // Register the Plugin Activation Hook
    register_activation_hook($file, array(&$MappPlugin, 'activate'));


    // Register the Plugin Deactivation Hook
    register_deactivation_hook($file, array(&$MappPlugin, 'deactivate'));
}
