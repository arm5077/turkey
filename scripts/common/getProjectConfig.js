const fs = require('fs');

module.exports = (project) => {
	const config = JSON.parse(fs.readFileSync(`./projects/${project}/config.json`, 'utf8'));
	return config;
};
