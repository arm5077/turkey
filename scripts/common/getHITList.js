const getMTurkObject = require('./getMTurkObject');

module.exports = async (serviceEndpoint) => {
	const mturk = getMTurkObject(serviceEndpoint);
	const hits = await mturk.listHITs({
		MaxResults: 100
	}).promise();

	return hits.HITs;
};
