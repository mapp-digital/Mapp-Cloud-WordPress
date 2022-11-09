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
		return_message("Error: Command not known");
	}
} else {
	return_message(
		"Error: No command given! Please add a command query parameter to your request!"
	);
}

function deactivate_woo()
{
	shell_exec("wp plugin deactivate woocommerce");
	return_message("Woocommerce deactivated!");
}

function activate_woo()
{
	shell_exec("wp plugin activate woocommerce");
	return_message("Woocommerce activated!");
}

function set_option()
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
		return_message("settings", $newOptions);
	} else {
		return_message(
			"Error: you need to add a 'json' query parameter to your request"
		);
	}
}

function return_message($msg, $data = false)
{
	if ($data) {
		echo '{"message": "' . $msg . '", "data":' . json_encode($data) . '}';
	} else {
		echo '{"message": "' . $msg . '"}';
	}
}
