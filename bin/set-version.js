const fs = require("fs");
const root = __dirname + "/../";

const newVersion = process.argv[2];
const versionPattern = /^[0-9]+\.[0-9]+\.[0-9]+$/;
if (!newVersion) {
	console.log(
		'no version set - set a version like this: "npm run set-version 1.x.x"'
	);
	console.log('or "make set-version version=1.x.x"');
	return;
}

if (versionPattern.test(newVersion)) {
	const jsonFiles = [
		"package.json",
		"composer.json",
		"tests/package.json",
		"src/Settings/admin-menu/package.json",
	];

	jsonFiles.forEach((path) => {
		const fullPath = root + path;
		const package = require(fullPath);
		package.version = newVersion;
		fs.writeFileSync(fullPath, JSON.stringify(package, null, 2));
		console.log(`Set version to ${newVersion} in ${path}`);
	});

	const files = [
		{
			file: "mapp_intelligence.php",
			pattern: /[0-9]+\.[0-9]+\.[0-9]+/,
			replacement: "###version###",
		},
		{
			file: "readme.txt",
			pattern: /Version:\s[0-9]+\.[0-9]+\.[0-9]+/,
			replacement: "Version: ###version###",
		},
		{
			file: "src/Helper.php",
			pattern: /\tpublic\sstatic\s\$version\s=\s"[0-9]+\.[0-9]+\.[0-9]+"/,
			replacement: '\tpublic static $version = "###version###"',
		},
	];

	files.forEach((file) => {
		fs.readFile(root + file.file, "utf-8", (err, text) => {
			if (err) {
				console.error(err);
				return;
			}
			const newString = file.replacement.replace(
				"###version###",
				newVersion
			);
			const newText = text.replace(file.pattern, newString);
			fs.writeFile(root + file.file, newText, "utf-8", (_) => {
				console.log(`Set version to ${newVersion} in ${file.file}`);
			});
		});
	});
} else {
	console.log(
		'Error: version needs to be in format "[digit(s)].[digit(s)].[digit(s)]"'
	);
}
