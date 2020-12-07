const fs = require('fs');

module.exports = (HITId) => {
	const projectFolders = fs.readdirSync('./projects');
	let foundProject = '';
	projectFolders.forEach(project => {
		const stats = fs.statSync(`./projects/${project}`);
		if (stats.isDirectory()){
			const file = fs.readFileSync(`./projects/${project}/config.json`, 'utf8');
			if (file) {
				const config = JSON.parse(file);
				if (config.HITId === HITId) {
					foundProject = project;
					return;
				}
			}
		}
	});

	return foundProject;
};
