module.exports = (url) => {
	return `<?xml version="1.0" encoding="UTF-8"?>
      <ExternalQuestion xmlns="http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2006-07-14/ExternalQuestion.xsd">
        <ExternalURL>${url}</ExternalURL>
    </ExternalQuestion>`;
};
