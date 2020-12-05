const AWS = require('./getAWSObject');
module.exports = (endpoint) => new AWS.MTurk({
	apiVersion: '2017-01-17',
	endpoint
});
