const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

module.exports = () => {
	const argv = yargs(hideBin(process.argv)).argv;
	return argv;
};
