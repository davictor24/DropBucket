import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { config } from '../../config'
import { FileItem } from '../../models/FileItem'

const XAWS = AWSXRay.captureAWS(AWS)

export default class FilesAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly filesTable = config.filesTable,
    private readonly lastModifiedIndex = config.lastModifiedIndex
  ) {}

  async getFiles(userId: string): Promise<FileItem[]> {
    const result = await this.docClient.query({
      TableName: this.filesTable,
      IndexName: this.lastModifiedIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise()
    return result.Items as FileItem[]
  }

  async getFileByIdQuery(userId: string, fileKey: string): Promise<AWS.DynamoDB.QueryOutput> {
    return await this.docClient.query({
      TableName: this.filesTable,
      KeyConditionExpression: 'userId = :user and fileKey = :file',
      ExpressionAttributeValues: {
        ":user": userId,
        ":file": fileKey
      }
    }).promise()
  }

  // TODO: Delete?
  async getFileById(userId: string, fileKey: string): Promise<FileItem[]> {
    const result = await this.getFileByIdQuery(userId, fileKey)
    return result.Items as unknown as FileItem[]
  }

  async uploadFile(fileItem: FileItem): Promise<void> {
    await this.docClient.put({
      TableName: this.filesTable,
      Item: fileItem
    }).promise()
  }

  async deleteFile(userId: string, fileKey: string): Promise<void> {
    await this.docClient.delete({
      TableName: this.filesTable,
      Key: {
        userId,
        fileKey
      }
    }).promise()
  }
}