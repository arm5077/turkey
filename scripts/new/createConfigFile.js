const fs = require('fs');

module.exports = (response) => {
	const reward = response.rewardCents >= 100 ?
		`${response.rewardCents / 100}` :
		`0.${response.rewardCents.toString().padStart(2, '0')}`;

	// Build config.json
	const {title, description, assignments, keywords} = response;
	fs.writeFileSync(`./projects/${response.project}/config.json`, JSON.stringify({
		title,
		description,
		assignments,
		reward,
		keywords
	}));
};
