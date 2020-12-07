const getEndpoints = require('../common/getEndpoints');
const getMTurkObject = require('../common/getMTurkObject');

module.exports = (async () => {
	const {serviceEndpoint} = getEndpoints();
	const mturk = getMTurkObject(serviceEndpoint);
	const data = await mturk.getAccountBalance().promise();
	console.log(data);
})();
