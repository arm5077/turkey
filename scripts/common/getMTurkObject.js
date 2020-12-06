const AWS = require('./getAWSObject');
module.exports = (serviceEndpoint) => new AWS.MTurk({
	apiVersion: '2017-01-17',
	endpoint: serviceEndpoint
});
