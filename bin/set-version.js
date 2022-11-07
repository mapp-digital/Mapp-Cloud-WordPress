const fs = require('fs');

const newVersion = process.argv[2];
const versionPattern = /^[0-9]+\.[0-9]+\.[0-9]+$/;
if(!newVersion ) {
    console.log("no version set - set a version like this: \"npm run set-version 1.x.x\"");
    return;
}

if(versionPattern.test(newVersion)) {


	const mainPackage = require('../package.json');
	mainPackage.version = newVersion;
	fs.writeFileSync('./package.json', JSON.stringify(mainPackage, null, 2));

	

	console.log(`Setting new version to ${newVersion}`);
	fs.readFile('./package.json', 'utf-8', function (err, contents) {
		if (err) {
			return;
		}
		// console.log(contents);
		// const replaced = contents.replace(/index.+js/, newFileName);
		// writeFile('../SettingsMenu.php', replaced, 'utf-8', function (err) {
		// });
	});
} else {
	console.log("Error: version needs to be in format \"[digit(s)].[digit(s)].[digit(s)]\"");
}

