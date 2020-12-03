require('dotenv').config();
const AWS = require('aws-sdk');

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY){
	throw 'AWS access tokens not set — they must be set as environmental variables';
}

const credentials = new AWS.Credentials(
	process.env.AWS_ACCESS_KEY_ID,
	process.env.AWS_SECRET_ACCESS_KEY
);

AWS.config.update({
	region: 'us-east-1',
	credentials
});

module.exports = AWS;
