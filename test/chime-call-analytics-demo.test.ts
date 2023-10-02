// import * as cdk from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
// import * as ChimeCallAnalyticsDemo from '../lib/chime-call-analytics-demo-stack';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/chime-call-analytics-demo-stack.ts
test('SQS Queue Created', () => {
  let a = 0;
  for (let i = 0; i < 10; i++) {
    a++;
  }
  expect(a).toBe(12);
});
