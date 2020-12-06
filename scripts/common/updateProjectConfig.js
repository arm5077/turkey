const fs = require('fs');
const getProjectConfig = require('./getProjectConfig');

module.exports = async ({project, configUpdates}) => {
	const config = getProjectConfig(project);
	for(const key in configUpdates){
		config[key] = configUpdates[key];
	}
	fs.writeFileSync(`./projects/${project}/config.json`, JSON.stringify(config));
};
