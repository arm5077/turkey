const AWS = require('./getAWSObject');
module.exports = new AWS.S3({
	apiVersion: '2006-03-01'
});
