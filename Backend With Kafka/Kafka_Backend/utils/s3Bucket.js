const aws=require("aws-sdk");
const util= require("util");
const promisify=util.promisify;
const crypto= require("crypto");
const randomBytes = crypto.randomBytes;


const region = "us-east-2";
const bucketName = "lab1-s3-bucket";
const accessKeyId = "AKIAWDOULQNI7GDI2VUY";
const secretAccessKey = "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";

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

exports.generateUploadURL = async () => {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 100,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
};

