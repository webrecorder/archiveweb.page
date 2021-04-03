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
    const res = this.parseBucketPath(credData.bucketAndPath);
    this.bucket = res.bucket;
    this.path = res.path + "/";
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

  async head(path) {
    try {
      await this.s3.headObject({
        Bucket: this.bucket,
        Key: path
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  async put(dlresponse, isPublic = false) {
    const blob = await dlresponse.blob();

    const params = {
      Bucket: this.bucket,
      Key: this.path + dlresponse.filename,
      Body: blob,
    };

    if (isPublic) {
      params.ACL = "public-read";
    }
  
    const data = await this.s3.putObject(params);
    console.log(data);
  }

  async isBucketValid() {
    try {
      await this.s3.headBucket({Bucket: this.bucket});
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async checkCollExists(collId) {
    const valid = await this.isBucketValid();
    if (!valid) {
      return {valid, exists: false};
    }

    let path = this.path + "/" + collId;

    if (!path.endsWith("/")) {
      path += "/";
    }

    const exists = await this.head(path + "swac.json");

    return {valid, exists};
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