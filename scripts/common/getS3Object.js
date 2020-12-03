const AWS = require('aws-sdk');
const getAWSCreds = require('./getAWSCreds');

module.exports = () => {
	const credentials = getAWSCreds();
	return new AWS.S3({apiVersion: '2006-03-01', credentials});
};
