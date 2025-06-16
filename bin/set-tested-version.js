const { execSync } = require("child_process");
const { readFile, writeFile } = require("fs");
const root = __dirname + "/../";
const readme = root + "readme.txt";

const dockerPS = execSync("docker ps").toString();
if (!dockerPS.includes("mapp_e2e_wpcli")) {
	console.error("Docker container not running!");
	return;
}

const pluginDataWithPotentialPhpNotices = execSync(
	'docker exec -t -u 33:33 mapp_e2e_wpcli bash -c "wp plugin list --format=json"'
).toString();
const pluginData = JSON.parse(pluginDataWithPotentialPhpNotices.slice(pluginDataWithPotentialPhpNotices.indexOf('[{"name"')));

const wooVersion = pluginData
	.filter((plugin) => plugin.name === "woocommerce")
	.map((woo) => woo.version)[0];
const wpVersion = execSync(
	'docker exec -t -u 33:33 mapp_e2e_wpcli bash -c "wp core version"'
)
	.toString()
	.trim();

const newWpString = `Tested up to: ${wpVersion}`;
const newWooString = `WC tested up to: ${wooVersion}`;

readFile(readme, "utf-8", (err, text) => {
	if (err) {
		console.error(err);
		return;
	}

	const newText = text
		.replace(/Tested up to:\s[0-9.]+/, newWpString)
		.replace(/WC tested up to:\s[0-9.]+/, newWooString);
	writeFile(readme, newText, "utf-8", () => {
		console.log("Changed readme.txt:");
		console.log(`Set Wordpress tested up to ${wpVersion}`);
		console.log(`Set Woocommerce tested up to ${wooVersion}`);
	});
});
