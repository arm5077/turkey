const getMTurkObject = require('../../common/getMTurkObject');

module.exports = async ({s3Endpoint, serviceEndpoint, config}) => {
	const mturk = getMTurkObject(serviceEndpoint);
	const params = {
		AssignmentDurationInSeconds: 120,
		Description: config.description,
		LifetimeInSeconds: 259200,
		Reward: config.reward,
		Title: config.title,
		Keywords: config.keywords,
		MaxAssignments: config.assignments,
		Question: `<?xml version="1.0" encoding="UTF-8"?><ExternalQuestion xmlns="http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2006-07-14/ExternalQuestion.xsd"><ExternalURL>${s3Endpoint}</ExternalURL><FrameHeight>0</FrameHeight></ExternalQuestion>`,
	};
	const response = await mturk.createHIT(params).promise();
	return response.HIT.HITId;
};
