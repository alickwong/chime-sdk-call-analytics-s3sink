export type S3SQSEventRecordType = {
  eventVersion: string,
  eventSource: string,
  awsRegion: string,
  eventTime: string,
  eventName: string, // 'ObjectCreated:Put'
  userIdentity: {
    principalId: string // AWS:XXXXX:YPB-562217ba-5e20-41e2-b183-XXXX
  },
  requestParameters: { sourceIPAddress: string },
  responseElements: {
    'x-amz-request-id': string,
    'x-amz-id-2': string
  },
  s3: {
    s3SchemaVersion: string,
    configurationId: string, // AWS:XXXX:YPB-562217ba-5e20-41e2-b183-XXXX
    bucket: {
      name: string,
      ownerIdentity: [any],
      arn: string
    },
    object: {
      key: string,
      size: number,
      eTag: string,
      sequencer: string
    }
  }
}
