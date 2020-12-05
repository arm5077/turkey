const fs = require('fs');

module.exports = ({project, SUBMIT_URL}) => {
	fs.writeFileSync(`./projects/${project}/submitURL.js`, `const submitURL='${SUBMIT_URL}';`);
};
