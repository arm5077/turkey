const replaceSubmitURL = require('./replaceSubmitURL');
const post = require('./post');

module.exports = async ({bucket, project, submitEndpoint}) => {
	replaceSubmitURL({project, submitEndpoint});
	const s3Endpoint = await post({project, bucket});
	console.log('really done');
	return s3Endpoint;
};
