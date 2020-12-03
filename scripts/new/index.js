const getPrompts = require('getPrompts');
const createProjectFolder = require('./createProjectFolder');
const createConfigFile = require('./createConfigFile');

(async () => {
	const response = await getPrompts();
	createProjectFolder(response);
	createConfigFile(response);
})();
