const fs = require('fs');

module.exports = () => {
	const projects = fs.readdirSync('./projects');
	return projects.map(project => ({
		title: project,
		value: project
	}));
};
