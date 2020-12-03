const getS3Object = require('../common/getS3Object');
const S3 = getS3Object();

module.exports = async (bucket) => {
	const bucketsResponse = await S3.listBuckets().promise()
		.catch(err => {
			throw err;
		});

	if(!bucketsResponse.Buckets.find(b => b.Name === bucket)){
		await S3.createBucket({
			Bucket: bucket,
			ACL: 'public-read'
		}).promise()
			.catch(err => {
				throw err;
			});
	}
};
