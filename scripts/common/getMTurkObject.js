const AWS = require('./getAWSObject');
module.exports = new AWS.MTurk({
	apiVersion: '2017-01-17'
});
