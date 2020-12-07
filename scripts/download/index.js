const prompts = require('prompts');
const convert = require('xml-js');
const Papa = require('papaparse');
const fs = require('fs');
const getHITList = require('../common/getHITList');
const getEndpoints = require('../common/getEndpoints');
const formatHITList = require('../common/formatHITList');
const getMTurkObject = require('../common/getMTurkObject');

module.exports = (async () => {
	const {serviceEndpoint} = getEndpoints();
	const HITList = await getHITList(serviceEndpoint);

	if(!HITList || HITList.length === 0){
		console.log('No projects found!');
		return;
	}

	const projectList = formatHITList(HITList);

	const response = await prompts([{
		type: 'select',
		name: 'HITId',
		message: 'Which MTurk project do you want to download?',
		choices: projectList
	}]);

	const mturk = getMTurkObject(serviceEndpoint);
	const data = await mturk.listAssignmentsForHIT({
		HITId: response.HITId,
	}).promise();

	const exportData = [];
	data.Assignments.forEach(assignment => {
		if (!assignment.Answer){
			return;
		}
		const answerSets = convert.xml2js(assignment.Answer).elements;
		answerSets.forEach(answerSet => {
			answerSet.elements.forEach(answer => {
				const key = answer.elements.find(a => a.name === 'QuestionIdentifier').elements[0].text;
				const value = answer.elements.find(a => a.name !== 'QuestionIdentifier').elements[0].text;
				exportData.push({
					[key]: value
				});
			});
		});
	});
	const csv = Papa.unparse(exportData);
	fs.writeFileSync('export.csv', csv);
	console.log('Data downloaded to export.csv!');
})();
