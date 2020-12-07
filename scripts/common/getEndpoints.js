const constants = require('../../constants');
const getArgs = require('./getArgs');

module.exports = () => {
	const argv = getArgs();
	const submitEndpoint = constants.SUBMIT_ENDPOINT[argv.prod || argv.p || argv.production ? 'PRODUCTION' : 'STAGING'];
	const serviceEndpoint = constants.SERVICE_ENDPOINT[argv.prod || argv.p || argv.production ? 'PRODUCTION' : 'STAGING'];

	return {submitEndpoint, serviceEndpoint};
};
