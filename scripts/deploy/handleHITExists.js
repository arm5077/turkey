const prompts = require('prompts');
const deleteHIT = require('../common/deleteHIT');

module.exports = async (HITId, serviceEndpoint) => {
	if(!HITId) {
		return true;
	}
	const response = await prompts([{
		type: 'confirm',
		name: 'delete',
		message: 'This project already has a deployed HIT — want to delete and make a new one?',
		initial: false
	}]);

	if(!response.delete) {
		console.log('OK, canceling...');
		return false;
	}

	await deleteHIT({HITId, serviceEndpoint});

	return true;
};
