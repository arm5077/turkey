const prompts = require('prompts');

module.exports = async ({assignments, reward}) => {
	const cost = assignments <= 10 ? assignments * reward * 1.2 : assignments * reward * 1.4;
	const formattedCost = `$${cost.toPrecision(2)}`;

	const response = await prompts([{
		type: 'confirm',
		name: 'payCost',
		message: `This will spin up ${assignments} assignments and cost ${formattedCost} — continue?`,
		initial: false
	}]);

	return response.payCost;
};
