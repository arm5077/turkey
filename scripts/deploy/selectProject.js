const prompts = require('prompts');
const getProjects = require('../common/getProjects');

module.exports = async () => {
	const projectList = getProjects();
	const response = await prompts([{
		type: 'select',
		name: 'project',
		message: 'Which project do you want to deploy?',
		choices: projectList
	},
	]);
	console.log(response);

	return response.project;
};
