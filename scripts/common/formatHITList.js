module.exports = (HITList) => {
	return HITList.map(item => ({
		title: `${item.Title} (${item.CreationTime})`,
		value: item.HITId
	}));
};
