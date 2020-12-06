const prompts = require('prompts');
const getHITList = require('../common/getHITList');
const getEndpoints = require('../common/getEndpoints');

module.exports = (async () => {
	const {submitEndpoint, serviceEndpoint} = getEndpoints();
	const HITList = await getHITList(serviceEndpoint);
	const projectList = HITList.map(item => ({
		title: `${item.Title} (${item.CreationTime})`,
		value: item.HITId
	}));

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
