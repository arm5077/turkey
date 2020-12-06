const fs = require('fs');
const prompts = require('prompts');
const globalConfig = require('../../config.json');
const constants = require('../../constants');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const selectProject = require('./selectProject');
const postToS3 = require('./postToS3');
const launchMTurk = require('./launchMTurk');
const updateProjectConfig = require('../common/updateProjectConfig');
const getProjectConfig = require('../common/getProjectConfig');
const authorizeHITCost = require('./authorizeHITCost');
const handleHITExists = require('./handleHITExists');

(async () => {
	const argv = yargs(hideBin(process.argv)).argv;
	const submitEndpoint = constants.SUBMIT_ENDPOINT[argv.prod || argv.p || argv.production ? 'PRODUCTION' : 'STAGING'];
	const serviceEndpoint = constants.SERVICE_ENDPOINT[argv.prod || argv.p || argv.production ? 'PRODUCTION' : 'STAGING'];

	if(!globalConfig.bucket){
		throw 'You don\'t have an AWS bucket specified... run `yarn configure`.';
	}

	const project = argv._[0] || await selectProject();
	const projectConfig = getProjectConfig(project);

	if (!await handleHITExists(projectConfig.HITId, serviceEndpoint)){
		return;
	}

	if (!await authorizeHITCost({
		assignments: projectConfig.assignments,
		reward: projectConfig.reward
	})){
		console.log('OK, canceling...');
		return;
	}

	const s3Endpoint = await postToS3({bucket: globalConfig.bucket, project, submitEndpoint});

	const HITId = await launchMTurk({s3Endpoint, serviceEndpoint, config: projectConfig});
	updateProjectConfig({project, configUpdates: {
		HITId
	}});
})();
