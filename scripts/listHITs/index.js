const getHITList = require('../common/getHITList');

(async () => {
	const list = await getHITList();
	console.log(list.join('\n'));
})();
