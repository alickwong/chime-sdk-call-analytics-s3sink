import {
  S3Client,
  GetObjectCommand,
  GetObjectCommandInput, GetObjectCommandOutput,
} from '@aws-sdk/client-s3'

const client = new S3Client();

export class S3Helper {
  public async getS3Object(bucket: string, key: string): Promise<GetObjectCommandOutput | undefined> {
    try {
      let commandInput: GetObjectCommandInput = {
        Bucket: bucket,
        Key: key,
      };
      const completeData = await client.send(new GetObjectCommand(commandInput))
      return completeData;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  // get s3 object meta data
  public async getS3ObjectMetaData(bucket: string, key: string): Promise<any> {
    try {
      let commandInput: GetObjectCommandInput = {
        Bucket: bucket,
        Key: key,
      };
      const completeData = await client.send(new GetObjectCommand(commandInput))
      return completeData.Metadata;
    } catch (e) {
      console.log(e);
      return;
    }
  }
}
