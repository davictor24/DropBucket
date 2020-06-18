import 'source-map-support/register'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult, } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { deleteFile, getFileByIdQuery } from '../../logic/main/files'
import { getUserId } from '../utils'
import { deleteFromBucket } from '../../logic/main/storage'

const logger = createLogger('deleteFile')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event)
  const fileKeyEncoded = event.pathParameters.fileKeyEncoded
  const fileKey = userId + "/" + decodeURIComponent(fileKeyEncoded)
  const result = await getFileByIdQuery(userId, fileKey)

  if (result.Count === 0) {
    logger.warn(`User ${userId} requesting delete for non-existing file ${fileKey}`)
    return {
      statusCode: 400,
      body: JSON.stringify(`File does not exist`)
    }
  }

  logger.info(`Deleting file ${fileKey} for user ${userId}`)
  await deleteFile(userId, fileKey)

  // Delete from S3 as well
  await deleteFromBucket(fileKey)

  return {
    statusCode: 200,
    body: ''
  }
}).use(
  cors({
    credentials: true
  })
)