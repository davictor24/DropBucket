import 'source-map-support/register'

import { S3Event } from 'aws-lambda'
import { uploadFile } from '../../logic/main/files'
import { createLogger } from '../../utils/logger'
import { FileItem } from '../../models/FileItem'

const logger = createLogger('uploadFile')

export const handler = async (event: S3Event): Promise<void> => {
  const uploadInfo = event.Records[0]
  const lastModified = Date.parse(uploadInfo.eventTime)
  const fileInfo = uploadInfo.s3.object
  const sizeBytes = fileInfo.size
  const fileKey = decodeURIComponent(fileInfo.key.replace(/\+/g, " "))
  const userId = fileKey.split('/')[0]

  const newFile: FileItem = {
    userId,
    fileKey,
    sizeBytes,
    lastModified
  }

  await uploadFile(newFile)
  logger.info(`Uploaded new file ${fileKey} for user ${userId}`)
}