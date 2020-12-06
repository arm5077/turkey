const getMTurkObject = require('./getMTurkObject');

module.exports = async ({HITId, serviceEndpoint}) => {
	const mturk = getMTurkObject(serviceEndpoint);
	await mturk.updateExpirationForHIT({
		ExpireAt: new Date,
		HITId
	}).promise();
	await mturk.deleteHIT({
		HITId
	}).promise();
};
