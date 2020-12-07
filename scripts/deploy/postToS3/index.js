const post = require('./post');

module.exports = async ({bucket, project, submitEndpoint}) => {
	const s3Endpoint = await post({project, bucket});
	return s3Endpoint;
};
