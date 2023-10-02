import {Consumer, Events} from 'sqs-consumer';
import {Message} from '@aws-sdk/client-sqs';
import {S3SQSEventRecordType} from "./types/S3SQSEventRecordType";
import {writeFile} from "node:fs/promises";
import {S3Helper} from "./helpers/S3Helper";
import {CallMetaDataType} from "./types/CallMetaDataType";


const app = Consumer.create({
  queueUrl: 'https://sqs.us-east-1.amazonaws.com/331102492406/s3-chime-call-analytics-recording ',
  region: 'us-east-1',

  // Handle event from s3
  handleMessage: async (message: Message) => {
    console.log('new message');
    if (!message.Body) {
      console.log('no body');
      return;
    }

    let records: S3SQSEventRecordType[] = JSON.parse(message.Body).Records;
    if (!Array.isArray(records)) {
      console.log('not array', records);
      return;
    }

    let s3Helper = new S3Helper();
    for (let i = 0; i < records.length; i++) {
      let record = records[i];
      let bucketName = record.s3.bucket.name;
      let key = record.s3.object.key;
      console.log('file event received', bucketName, key);

      // Get the Meta JSON file on S3
      let result = await s3Helper.getS3Object(bucketName, key);
      if (!result?.Body) {
        continue;
      }

      // Read the json file
      let jsonFile = await result.Body.transformToString('utf8');
      let recordingData = JSON.parse(jsonFile);
      console.log('file result:', recordingData);

      // Parse call information from JSON
      let callInfo: CallMetaDataType = JSON.parse(recordingData.metadata);
      console.log('callInfo:', callInfo);

      // Get the media file s3 location
      const url = new URL(recordingData.s3MediaObjectConsoleUrl);
      const params = url.searchParams;
      const mediaFileS3Location = params.get('prefix');
      if (!mediaFileS3Location) {
        continue;
      }
      console.log('prefix:', mediaFileS3Location);

      // Download the media file to local disk from S3
      let mediaFile = await s3Helper.getS3Object(bucketName, mediaFileS3Location);
      if (!mediaFile?.Body) {
        continue;
      }
      let localFileName = 'test.wav'
      let data = await mediaFile.Body.transformToByteArray();
      await writeFile(localFileName, data);
      console.log('downloaded');

      /* =======================
       * Here is your customer logic to send the file to customer env
       * ======================= */
    }
  }
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();
console.log('started');