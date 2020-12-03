const prompts = require('prompts');
const fs = require('fs-extra');

(async () => {
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

	// Delete folder if it already exists and the user told us to do it
	if(response.deleteExisting === false) {
		return;
	} else {
		fs.rmdirSync(`./projects/${response.project}`, {recursive: true});
	}

	// Copy template files over
	fs.mkdirSync(`./projects/${response.project}`);
	fs.copySync('./template', `./projects/${response.project}`);

	const reward = response.rewardCents >= 100 ?
		`$${response.rewardCents / 100}` :
		`$0.${response.rewardCents.toString().padStart(2, '0')}`;

	// Build config.json
	const {title, description, assignments, keywords} = response;
	fs.writeFileSync(`./projects/${response.project}/config.json`, JSON.stringify({
		title,
		description,
		assignments,
		reward,
		keywords
	}));

})();
