const getMTurkObject = require('./getMTurkObject');

module.exports = async ({HITId, serviceEndpoint}) => {
	const mturk = getMTurkObject(serviceEndpoint);

	// const data = await mturk.listAssignmentsForHIT({
	// 	HITId,
	// }).promise();
	//
	// for (const assignment of data.Assignments) {
	// 	await mturk.approveAssignment({
	// 		AssignmentId: assignment.AssignmentId
	// 	}).promise();
	// }

	await mturk.updateExpirationForHIT({
		ExpireAt: new Date,
		HITId
	}).promise().catch(e => {
		console.log(e);
	});
	await mturk.deleteHIT({
		HITId
	}).promise().catch(e => {
		console.log(e);
	});
};
