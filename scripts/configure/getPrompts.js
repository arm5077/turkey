const prompts = require('prompts');

module.exports = async () => {
	const response = await prompts([{
		type: 'text',
		name: 'newBucket',
		message: 'What\'s the name of the bucket you want to use to host mturk task websites? (If it doesn\'t exist, this will create a new bucket.)',
		validate: (value) => {
			if(value.includes(' ')) {
				return 'No spaces allowed, I\'m afraid';
			}
			return true;
		}
	},
	]);

	return response;
};
