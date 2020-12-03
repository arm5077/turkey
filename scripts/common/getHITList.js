const mturk = require('./getMTurkObject');

module.exports = async (identifier) => {
	const hits = await mturk.listHITs({
		MaxResults: 100
	}).promise();

	return hits;
};
