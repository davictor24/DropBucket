import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { S3 } from 'aws-sdk'
import { config } from '../../config'

const XAWS = AWSXRay.captureAWS(AWS)

export default class FileStorage {
  constructor(
    private readonly s3Client: S3 = new XAWS.S3({
      signatureVersion: 'v4'
    }),
    private readonly filesBucket = config.s3Bucket,
    private readonly signedUrlExpireSeconds = 60 * 10
  ) {}

  async getDownloadUrl(fileKey: string): Promise<string | null> {
    try {
      await this.s3Client.headObject({
        Bucket: this.filesBucket,
        Key: fileKey
      }).promise();
      const fileName = fileKey.split('\\').pop().split('/').pop();
      return this.s3Client.getSignedUrl('getObject', {
        Bucket: this.filesBucket,
        Key: fileKey,
        ContentDisposition: `attachment; filename=${fileName}`,
        Expires: this.signedUrlExpireSeconds
      });
    } catch (err) {
      return null
    }
  }

  getUploadUrl(fileKey: string): string {
    return this.s3Client.getSignedUrl('putObject', {
      Bucket: this.filesBucket,
      Key: fileKey,
      Expires: this.signedUrlExpireSeconds
    })
  }
}