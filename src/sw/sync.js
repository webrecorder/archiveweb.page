import { S3, PutObjectCommand, PutBucketCorsCommand } from "@aws-sdk/client-s3";


self.window = self;

export class S3Sync
{
  constructor(credData) {
    this.s3 = new S3({
      endpoint: credData.endpoint,
      region: credData.region || " ",
      bucketEndpoint: false,
      credentials: {
        accessKeyId: credData.accessKeyId,
        secretAccessKey: credData.secretAccessKey
      }
    });
  }

  parseBucketPath(fullPath) {
    if (fullPath.startsWith("s3://")) {
      fullPath = fullPath.slice(5);
    }
    if (fullPath.endsWith("/")) {
      fullPath = fullPath.slice(0, fullPath.length - 1);
    }
    const bucket = fullPath.split("/", 1)[0];
    const path = fullPath.slice(bucket.length + 1);
    return {bucket, path};
  }

  async get(bucket, path) {
    const res = await this.s3.getObject({
      Bucket: bucket,
      Key: path
    });
  }

  async head(bucket, path) {
    try {
      await this.s3.headObject({
        Bucket: bucket,
        Key: path
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  async isBucketValid(bucketAndPath) {
    const { bucket } = this.parseBucketPath(bucketAndPath);

    try {
      await this.s3.headBucket({Bucket: bucket});
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async newCollCheck(fullPath) {
    let {bucket, path} = this.parseBucketPath(fullPath);

    if (!await this.isBucketValid(bucket)) {
      return {"error": "bucket_not_found"};
    }

    if (path) {
      path += "/";
    }

    if (await this.head(bucket, path + "swac.json")) {
      return {"error": "already_exists"};
    }

    return {};
  }
}



export async function doUpload(dlresponse) {
  s3 = new S3Client({
    endpoint: "https://nyc3.digitaloceanspaces.com",
    region: " ",
    bucketEndpoint: false,
    credentials: {
      accessKeyId: "DYEYLRDXHGDQEPGQPNBA",
      secretAccessKey: "+DMsnrV4nB0Jbr6OG9ZPFmRdc48y9iN8HSYj5JTkuNk"
    }
  });

  const blob = await dlresponse.blob();

  const params = {
    Bucket: "wr-test",
    Key: "coll/" + dlresponse.filename,
    Body: blob,
    ACL: "public-read",
  };

  const data = await s3.send(new PutObjectCommand(params));
  console.log(data);

  await setCORS();
}

export async function setCORS() {
  const params = {
    Bucket: "wr-test",
    CORSConfiguration: {
      CORSRules: [{
        AllowedOrigins: ["*"],
        AllowedMethods: ["HEAD", "GET"],
        AllowedHeaders: ["*"],
        ExposeHeaders: ["Content-Length", "Content-Range", "Content-Encoding"]
      }]
    }
  };

  const data = await s3.send(new PutBucketCorsCommand(params));
  console.log(data);
}