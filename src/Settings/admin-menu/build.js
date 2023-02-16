import { readFile, writeFile } from 'fs';

const newFileName = process.argv[2];
console.log('Build successful. Adding new filename to SettingsMenu.php (', newFileName, ')');
readFile('../SettingsMenu.php', 'utf-8', function (err, contents) {
	if (err) {
		return;
	}
	const replaced = contents.replace(/index.+js/, newFileName);
	writeFile('../SettingsMenu.php', replaced, 'utf-8', function (err) {
	});
});
