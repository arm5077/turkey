const fs = require('fs');
const config = require('../../config.json');
const constants = require('../../constants');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const selectProject = require('./selectProject');
const postToS3 = require('./postToS3');
const launchMTurk = require('./launchMTurk');

(async () => {
	const argv = yargs(hideBin(process.argv)).argv;
	const submitEndpoint = constants.SUBMIT_ENDPOINT[argv.prod || argv.p || argv.production ? 'PRODUCTION' : 'STAGING'];
	const serviceEndpoint = constants.SERVICE_ENDPOINT[argv.prod || argv.p || argv.production ? 'PRODUCTION' : 'STAGING'];

	if(!config.bucket){
		throw 'You don\'t have an AWS bucket specified... run `yarn configure`.';
	}

	const project = argv._[0] || await selectProject();
	const s3Endpoint = await postToS3({bucket: config.bucket, project, submitEndpoint});
	console.log(s3Endpoint);
	const projectConfig = JSON.parse(fs.readFileSync(`./projects/${project}/config.json`, 'utf8'));
	await launchMTurk({s3Endpoint, serviceEndpoint, config: projectConfig});

})();
