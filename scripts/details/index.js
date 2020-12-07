const prompts = require('prompts');
const getHITList = require('../common/getHITList');
const getEndpoints = require('../common/getEndpoints');
const formatHITList = require('../common/formatHITList');

module.exports = (async () => {
	const {serviceEndpoint} = getEndpoints();
	const HITList = await getHITList(serviceEndpoint);

	if(!HITList || HITList.length === 0){
		console.log('No projects found!');
		return;
	}

	const projectList = formatHITList(HITList);

	const response = await prompts([{
		type: 'select',
		name: 'HITId',
		message: 'Which MTurk project do you want details for?',
		choices: projectList
	},
	]);

	const selection = HITList.find(item => item.HITId === response.HITId);

	const info = [
		`Title: ${selection.Title}`,
		`Description: ${selection.Description}`,
		`HITId: ${selection.HITId}`,
		`Keywords: ${selection.Keywords}`,
		`Reward: ${selection.Reward}`,
		`Assignments completed: ${selection.NumberOfAssignmentsCompleted}/${selection.MaxAssignments}`
	];
	console.log(info.join('\n'));

})();
