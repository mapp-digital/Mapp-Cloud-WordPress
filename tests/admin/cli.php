<?php
header("Content-Type: application/json");
if (isset($_SERVER["HTTP_ORIGIN"])) {
	header("Access-Control-Allow-Origin: {$_SERVER["HTTP_ORIGIN"]}");
	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Max-Age: 86400"); // cache for 1 day
}
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
	if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"])) {
		header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
	}
	if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"])) {
		header(
			"Access-Control-Allow-Headers: {$_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]}"
		);
	}
}

if (isset($_GET["command"])) {
	if (function_exists($_GET["command"])) {
		call_user_func($_GET["command"]);
	} else {
		respond("Error: Command not known");
	}
} else {
	respond(
		"Error: No command given! Please add a command query parameter to your request!"
	);
}

function deactivate_woo()
{
	shell_exec("wp plugin deactivate woocommerce");
	respond("Woocommerce deactivated!");
}

function activate_woo()
{
	shell_exec("wp plugin activate woocommerce");
	respond("Woocommerce activated!");
}

function set_settings()
{
	if (isset($_GET["json"])) {
		$newConfig = json_decode(html_entity_decode($_GET["json"]), true);
		$options = json_decode(
			shell_exec("wp option get MappIntelligence_mappConfig"), true
		);

		$newOptions = [
			"General" => array_merge($options["General"], $newConfig)
		];

		shell_exec("wp option set MappIntelligence_mappConfig '" . json_encode($newOptions) . "'");
		get_settings();
	} else {
		respond(
			"Error: you need to add a 'json' query parameter to your request"
		);
	}
}

function get_settings() {
	$settings = trim(shell_exec("wp option get MappIntelligence_mappConfig"));
	respond("Current settings", $settings);
}

function respond($msg, $data = false)
{
	if ($data) {
		echo '{"message": "' . $msg . '", "data":' . $data . '}';
	} else {
		echo '{"message": "' . $msg . '"}';
	}
}
