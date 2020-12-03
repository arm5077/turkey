const fs = require('fs');
const getPrompts = require('./getPrompts');
const createBucket = require('./createBucket');

(async () => {
	const { newBucket } = await getPrompts();
	await createBucket(newBucket);

	fs.writeFileSync('./config.json', JSON.stringify({
		bucket: newBucket
	}));

})();
