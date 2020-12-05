const config = require('../../config.json');
const constants = require('../../constants');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const selectProject = require('./selectProject');
const postToS3 = require('./postToS3');

(async () => {
	const argv = yargs(hideBin(process.argv)).argv;
	const SUBMIT_URL = constants.SUBMIT_URL[argv.prod || argv.p || argv.production ? 'PRODUCTION' : 'STAGING'];
	
	if(!config.bucket){
		throw 'You don\'t have an AWS bucket specified... run `yarn configure`.';
	}

	const project = argv._[0] || await selectProject();
	await postToS3({bucket: config.bucket, project, SUBMIT_URL});


})();
