const getHITList = require('../common/getHITList');
const getEndpoints = require('../common/getEndpoints');

(async () => {
	const {serviceEndpoint} = getEndpoints();
	const list = await getHITList(serviceEndpoint);
	console.log(list);
})();
