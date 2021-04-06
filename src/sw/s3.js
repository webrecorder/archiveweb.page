import { S3 } from "@aws-sdk/client-s3";

self.window = self;


// ===========================================================================
export class S3Sync
{
  constructor(credData, coll) {
    this.s3 = new S3({
      endpoint: credData.endpoint,
      region: credData.region || " ",
      bucketEndpoint: false,
      credentials: {
        accessKeyId: credData.accessKeyId,
        secretAccessKey: credData.secretAccessKey
      },
      signatureVersion: "v4"
    });

    this.fullPath = credData.fullPath;

    const res = this.parseBucketPath(credData.bucketAndPath);
    this.bucket = res.bucket;
    this.path = res.path + "/";
    if (coll) {
      this.path += coll + "/";
    }
  }

  parseBucketPath(bucketAndPath) {
    if (bucketAndPath.startsWith("s3://")) {
      bucketAndPath = bucketAndPath.slice(5);
    }
    if (bucketAndPath.endsWith("/")) {
      bucketAndPath = bucketAndPath.slice(0, bucketAndPath.length - 1);
    }
    const bucket = bucketAndPath.split("/", 1)[0];
    const path = bucketAndPath.slice(bucket.length + 1);
    return {bucket, path};
  }

  async get(path, range = "") {
    const params = {
      Bucket: this.bucket,
      Key: this.path + path
    };

    if (range) {
      params.Range = range;
    }

    return await this.s3.getObject(params);
  }

  async head(path, range = "") {
    try {
      const params = {
        Bucket: this.bucket,
        Key: this.path + path
      };
  
      if (range) {
        params.Range = range;
      }

      const res = await this.s3.headObject(params);
      return res.ContentLength;
    } catch (e) {
      console.warn("HEAD error", e);
      return -1;
    }
  }

  async ls(path = "", delim = "/") {
    try {
      const res = await this.s3.listObjectsV2({
        Bucket: this.bucket,
        Prefix: this.path + path,
        Delimiter: delim
      });
      return res;
    } catch (e) {
      console.warn(e);
      return null;
    }
  }

  async put(content, filename, isPublic = false) {
    const params = {
      Bucket: this.bucket,
      Key: this.path + filename,
      Body: content,
    };

    if (isPublic) {
      params.ACL = "public-read";
    }
  
    const data = await this.s3.putObject(params);
    return data;
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

  async setCORS() {
    const params = {
      Bucket: this.bucket,
      CORSConfiguration: {
        CORSRules: [{
          AllowedOrigins: ["*"],
          AllowedMethods: ["HEAD", "GET"],
          AllowedHeaders: ["*"],
          ExposeHeaders: ["Content-Length", "Content-Range", "Content-Encoding"]
        }]
      }
    };

    const data = await this.s3.putBucketCors(params);
    console.log(data);
  }
}