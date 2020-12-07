const getHITList = require('../common/getHITList');
const getEndpoints = require('../common/getEndpoints');
const formatHITList = require('../common/formatHITList');
const deleteHIT = require('../common/deleteHIT');
const findProjectFromHIT = require('../common/findProjectFromHIT');
const prompts = require('prompts');
const fs = require('fs');

module.exports = (async () => {
	const {serviceEndpoint} = await getEndpoints();
	const HITList = await getHITList(serviceEndpoint);

	if(!HITList || HITList.length === 0){
		console.log('No projects found!');
		return;
	}

	const projectList = formatHITList(HITList);

	const response = await prompts([{
		type: 'select',
		name: 'HITId',
		message: 'Which MTurk project do you want to delete?',
		choices: projectList
	},
	{
		type: 'confirm',
		name: 'local',
		message: 'Do you want to delete the local project too?',
		initial: true
	},
	{
		type: 'confirm',
		name: 'confirm',
		message: 'Double-checking — you sure you want to delete this (and lose all data)?',
		initial: false
	}]);

	if (!response.confirm){
		console.log('OK, canceling');
		return;
	}

	await deleteHIT({HITId: response.HITId, serviceEndpoint});

	if(response.local) {
		const project = findProjectFromHIT(response.HITId);
		if(project) {
			fs.rmdirSync(`./projects/${project}`, { recursive: true });
		}
	}

})();
