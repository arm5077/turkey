const getHITList = require('./getHITList');

module.exports = async (identifier) => {
	const list = await getHITList();
	return list.filter(hit => hit.HITId === identifier || hit.Title === identifier);
};
