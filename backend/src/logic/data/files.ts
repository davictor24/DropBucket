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
        private readonly uploadedAtIndex = config.uploadedAtIndex
    ) {}

    async getFiles(userId: string): Promise<FileItem[]> {
        const result = await this.docClient.query({
            TableName: this.filesTable,
            IndexName: this.uploadedAtIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise()
        return result.Items as FileItem[]
    }

    async getFileById(userId: string, fileId: string): Promise<AWS.DynamoDB.QueryOutput> {
        return await this.docClient.query({
            TableName: this.filesTable,
            KeyConditionExpression: 'userId = :user and fileId = :file',
            ExpressionAttributeValues: {
                ":user": userId,
                ":file": fileId
            }
        }).promise()
    }

    async uploadFile(fileItem: FileItem): Promise<void> {
        await this.docClient.put({
            TableName: this.filesTable,
            Item: fileItem
        }).promise()
    }

    async deleteFile(userId: string, fileId: string): Promise<void> {
        await this.docClient.delete({
            TableName: this.filesTable,
            Key: {
                userId,
                fileId
            }
        }).promise()
    }
}