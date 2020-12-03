require('dotenv').config();
const AWS = require('aws-sdk');

module.exports = () => {
	if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY){
		throw 'AWS access tokens not set — they must be set as environmental variables';
	}
	
	return new AWS.Credentials(
		process.env.AWS_ACCESS_KEY_ID,
		process.env.AWS_SECRET_ACCESS_KEY
	);
};
