<?php
// if uninstall.php is not called by WordPress, die
if (!defined('WP_UNINSTALL_PLUGIN')) {
die;
}

$option_names = array('MappIntelligence_mappConfig', 'MappIntelligence__version', 'MappIntelligence__installed');
foreach ($option_names as $option)
{
    delete_option($option);
}
