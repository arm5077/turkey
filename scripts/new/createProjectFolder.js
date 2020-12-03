const fs = require('fs-extra');

module.exports = (response) => {
	// Delete folder if it already exists and the user told us to do it
	if(response.deleteExisting === false) {
		return;
	} else {
		fs.rmdirSync(`./projects/${response.project}`, {recursive: true});
	}

	// Copy template files over
	fs.mkdirSync(`./projects/${response.project}`);
	fs.copySync('./template', `./projects/${response.project}`);
};
