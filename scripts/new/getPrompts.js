const prompts = require('prompts');
const fs = require('fs');

module.exports = async () => {
	const response = await prompts([{
		type: 'text',
		name: 'project',
		message: 'What\'s the folder name for your new project?',
		validate: (value) => {
			if(value.includes(' ')) {
				return 'No spaces allowed, I\'m afraid';
			}
			return true;
		}
	}, {
		type: (prev, values) => {
			if (fs.existsSync(`./projects/${values.project}`)) {
				return 'confirm';
			}
		},
		name: 'deleteExisting',
		message: (prev, values) => `${values.project} already exists — overwrite?`,
	}, {
		type: 'text',
		name: 'title',
		message: 'What\'s the project title (which Mturk workers will see)?',
	}, {
		type: 'text',
		name: 'description',
		message: 'What\'s the project description?',
	}, {
		type: 'number',
		name: 'assignments',
		message: 'How many assignments do you want to spin up?',
	}, {
		type: 'number',
		name: 'rewardCents',
		message: 'How much do you want to pay per assignment (in cents?)',
	}, {
		type: 'text',
		name: 'keywords',
		message: 'Any keywords to describe the project (separated by commas)?',
	},
	]);

	return response;
};
