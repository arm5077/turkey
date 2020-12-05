const S3 = require('../../common/getS3Object');
const fs = require('fs');
const path = require('path');

module.exports = async ({project, bucket}) => {
	console.log(bucket, project);
	const filePaths = [];

	const getFilePaths = (dir) => {
		fs.readdirSync(dir).forEach(function (name) {
			const filePath = path.join(dir, name);
			const stat = fs.statSync(filePath);
			if (stat.isFile()) {
				filePaths.push(filePath);
			} else if (stat.isDirectory()) {
				getFilePaths(filePath);
			}
		});
	};
	getFilePaths(`./projects/${project}`);

	const itemsToDelete = await S3.listObjects({
		Bucket: bucket,
		Prefix: project
	}).promise();

	await S3.deleteObjects({
		Bucket: bucket,
		Delete: {
			Objects: itemsToDelete.Contents.map(item => ({
				Key: item.Key
			}))
		}
	}).promise();

	const res = await S3.deleteObject({
		Bucket: bucket,
		Key: project
	}).promise();

	for(const p of filePaths) {
		const key = p.replace('projects/', '');
		await S3.putObject({
			Bucket: bucket,
			Key: key,
			Body: fs.readFileSync(p),
		}).promise();
	}
};
