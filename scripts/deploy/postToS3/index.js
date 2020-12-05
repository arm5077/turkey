const replaceSubmitURL = require('./replaceSubmitURL');
const post = require('./post');

module.exports = async ({bucket, project, SUBMIT_URL}) => {
	replaceSubmitURL({project, SUBMIT_URL});
	await post({project, bucket});
	console.log('really done');
	return;
};
