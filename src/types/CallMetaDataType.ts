export type CallMetaDataType = {
  callId: string,
  fromNumber: string,
  voiceConnectorId: string,
  oneTimeMetadata: string, //'{"inviteHeaders":"{}"}'
  toNumber: string, // +1xxxxxxx
  transactionId: string, // '4686a0f9-811c-40ee-xxxx-3b8bdc769c05'
  direction: string // 'ORIGINATION'

}
