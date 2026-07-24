const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const path = require("path");
const r2 = require("../config/r2");

const BUCKET = process.env.R2_BUCKET_NAME;
const PUBLIC_URL = process.env.R2_PUBLIC_URL;

const uploadToR2 = async (file, folder = "resources") => {
  const extension = path.extname(file.originalname);
  const baseName = path.basename(file.originalname, extension);

  const crypto = require("crypto");
  

  const extensionn = path.extname(file.originalname);

  const fileName = `${folder}/${crypto.randomUUID()}${extensionn}`;

  await r2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    }),
  );

  return {
    key: fileName,
    url: `${PUBLIC_URL}/${fileName}`,
  };
};

const deleteFromR2 = async (key) => {
  await r2.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    }),
  );
};

module.exports = {
  uploadToR2,
  deleteFromR2,
};
